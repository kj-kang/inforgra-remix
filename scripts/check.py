#!/usr/bin/env python
#-*- coding: utf-8 -*-
#-*- mode: python -*-

import argparse
import json
import logging
import logging.handlers
import os
import random
import sys
import tabulate

from sitechecker.sitedb import SiteDB
from sitechecker.sitechecker import SiteChecker

def getLogLevel(level):
    if level == 'ERROR':
        return logging.ERROR
    elif level == 'WARNING':
        return logging.WARNING
    elif level == 'INFO':
        return logging.INFO
    elif level == 'DEBUG':
        return logging.DEBUG

class Command:

    def __init__(self, db, checker):
        self.db = db
        self.checker = checker

    def load(self, file):
        self.db.drop()
        self.db.create()
        with open(file, 'r', encoding='utf-8') as fp:
            sites = json.load(fp)
            for site in sites:
                self.db.insert(**site)

    def dump(self, file, pretty=False):
        sites = self.db.list()
        with open(file, 'w', encoding='utf-8') as fp:
            if pretty:
                json.dump(sites, fp, ensure_ascii=False, indent=2)
            else:
                json.dump(sites, fp, ensure_ascii=False, indent=2)

    def init(self, id):
        db.addLog(id, 'START', db.now())

    def init_all(self):
        sites = self.db.list()
        for site in sites:
            self.init(site['id'])

    def ping(self, id):
        site = self.db.get(id)
        isSuccess, responseURL, pageSpeed, pageSize = self.checker.check(site['link'], site['setting']['hooks'])
        self.db.update(site, isSuccess, pageSpeed, pageSize, site['link'])

    def ping_all(self):
        sites = self.db.list()
        for site in sites:
            if site['state'] in ['green', 'yellow']:
                self.ping(site['id'])

    def search(self, id, start=0):
        site = self.db.get(id)
        for i in range(start, 1000):
            if i == 0:
                link = site['setting']['link'].format('')
            else:
                link = site['setting']['link'].format(i)
            isSuccess, responseURL, pageSpeed, pageSize = self.checker.check(link, site['setting']['hooks'])
            if isSuccess:
                self.db.update(site, isSuccess, pageSpeed, pageSize, responseURL)
                break

    def search_all(self):
        sites = self.db.list()
        for site in sites:
            if site['state'] in ['red']:
                self.search(site['id'])

if __name__ == '__main__':

    tabulate.WIDE_CHARS_MODE = False

    parser = argparse.ArgumentParser()
    parser.add_argument('--db', type=str, required=True)
    parser.add_argument('--loglevel', choices=['ERROR', 'WARNING', 'INFO', 'DEBUG'], default="INFO")
    subparsers = parser.add_subparsers(dest="cmd")

    load_parser = subparsers.add_parser('load')
    load_parser.add_argument('file', type=str)

    dump_parser = subparsers.add_parser('dump')
    dump_parser.add_argument('file', type=str)
    dump_parser.add_argument('--pretty', action='store_true')

    init_parser = subparsers.add_parser('init')
    init_parser.add_argument('id', type=str)

    ping_parser = subparsers.add_parser('ping')
    ping_parser.add_argument('id', type=str)

    search_parser = subparsers.add_parser('search')
    search_parser.add_argument('id', type=str)
    search_parser.add_argument('--start', type=int, default=0)

    args = parser.parse_args()

    logLevel = getLogLevel(args.loglevel)

    root = logging.getLogger()
    root.setLevel(logLevel)

    formatter = logging.Formatter('%(asctime)s - %(module)s - %(levelname)s - %(message)s')

    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(logLevel)
    handler.setFormatter(formatter)
    root.addHandler(handler)

    handler = logging.handlers.SysLogHandler(address='/dev/log')
    handler.setLevel(logLevel)
    handler.setFormatter(formatter)
    root.addHandler(handler)

    checker = SiteChecker()
    db = SiteDB(args.db)
    command = Command(db, checker)

    cmds = {
        'load': lambda: command.load(args.file),
        'dump': lambda: command.dump(args.file, args.pretty),
        'init': lambda: command.init_all() if args.id == 'all' else command.init(args.id),
        'ping': lambda: command.ping_all() if args.id == 'all' else command.ping(args.id),
        'search': lambda: command.search_all() if args.id == 'all' else command.search(args.id, args.start),
    }

    if args.cmd in cmds:
        cmds[args.cmd]()
    else:
        parser.print_usage()
