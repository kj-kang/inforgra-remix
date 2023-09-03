import logging
import json
import sqlite3
import datetime
import pytz
import time

class JsonDB:

    def __init__(self, path, table, idField='id', jsonFields=[]):
        self.__logger = logging.getLogger(self.__class__.__name__)
        self.__db = sqlite3.connect(path)
        self.__table = table
        self.__idField = idField
        self.__jsonFields = jsonFields

    @property
    def db(self):
        return self.__db

    @property
    def table(self):
        return self.__table

    @property
    def idField(self):
        return self.__idField

    @property
    def jsonFields(self):
        return self.__jsonFields

    def __loadJsonFields(self, row):
        for field in self.jsonFields:
            row[field] = json.loads(row[field])
        return row

    def list(self):
        sql = 'SELECT * FROM {}'.format(self.__table)
        self.logger.debug(sql)
        cursor = self.db.cursor()
        cursor.execute(sql)
        keys = list(map(lambda xs: xs[0], cursor.description))
        rows = [ dict(zip(keys, row)) for row in cursor.fetchall() ]
        rows = [ self.__loadJsonFields(row) for row in rows ]
        return rows

    def get(self, id):
        sql = 'SELECT * FROM {} WHERE {} = ?'.format(self.__table, self.__idField)
        self.logger.debug(sql)
        cursor = self.db.cursor()
        cursor.execute(sql, (id, ))
        keys = list(map(lambda xs: xs[0], cursor.description))
        row = dict(zip(keys, cursor.fetchone()))
        row = self.__loadJsonFields(row)
        return row

    def insert(self, **kwargs):
        (keys, values) = zip(*[ (key, json.dumps(value) if key in self.__jsonFields else value) for (key, value) in kwargs.items() ])
        sql = 'INSERT INTO {} ( {} ) VALUES ( {} )'.format(self.__table, ', '.join(keys), ', '.join(['?' for _ in keys]))
        self.logger.debug(sql)
        self.logger.debug(values)
        cursor = self.db.cursor()
        cursor.execute(sql, values)
        self.db.commit()

    def update(self, **kwargs):
        (keys, values) = zip(*[ (key, json.dumps(value) if key in self.__jsonFields else value) for (key, value) in kwargs.items() if key != self.idField])
        sql = 'UPDATE {} SET {} WHERE {} = ?'.format(self.__table, ','.join(['{} = ?'.format(key) for key in keys]), self.__idField)
        self.logger.debug(sql)
        self.logger.debug(values)
        cursor = self.db.cursor()
        cursor.execute(sql, values + (kwargs[self.__idField], ))
        self.db.commit()

def getState(pageSpeed):
    if pageSpeed > 3.0:
        return 'yellow'
    return 'green'

class SiteDB(JsonDB):

    def __init__(self, path):
        super().__init__(path, 'Site', 'id', ['setting', 'more'])
        self.logger = logging.getLogger(self.__class__.__name__)

    def now(self):
        return time.mktime(datetime.datetime.now(pytz.timezone('Asia/Seoul')).utctimetuple()) * 1000

    def create(self):
        sql = '''
CREATE TABLE {} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  hname TEXT NOT NULL,
  logo TEXT,
  state TEXT NOT NULL,
  link TEXT,
  pageSpeed FLOAT,
  pageSize INTEGER,
  lastCheckedAt DATETIME,
  lastSuccessedAt DATETIME,
  lastFailedAt DATETIME,
  setting TEXT,
  more TEXT,
  createdAt DATETIME,
  updatedAt DATETIME
)
'''.format(self.table)
        cursor = self.db.cursor()
        cursor.execute(sql)
        self.db.commit()

    def drop(self):
        sql = 'DROP TABLE IF EXISTS {}'.format(self.table)
        cursor = self.db.cursor()
        cursor.execute(sql)
        self.db.commit()

    def update(self, site, isSuccess, pageSpeed, pageSize, link):
        now = self.now()
        if site['state'] in ['green', 'yellow']:
            if isSuccess:
                site['state'] = getState(pageSpeed)
                site['link'] = link
                site['pageSpeed'] = pageSpeed
                site['pageSize'] = pageSize
                site['lastCheckedAt'] = now
                site['lastSuccessedAt'] = now
                site['updatedAt'] = now
                super().update(**site)
            else:
                self.addLog(site['id'], 'ERROR', now, json.dumps({'where': site['link']}))
                site['state'] = 'red'
                site['pageSpeed'] = None
                site['pageSize'] = None
                site['lastCheckedAt'] = now
                site['lastFailedAt'] = now
                site['updatedAt'] = now
                super().update(**site)
        else:
            if isSuccess:
                if site['link'] != link:
                    self.addLog(site['id'], 'CHANGE', now, json.dumps({'from': site['link'], 'to': link}))
                else:
                    self.addLog(site['id'], 'RECOVERY', now, json.dumps({'where': link}))
                site['state'] = getState(pageSpeed)
                site['link'] = link
                site['pageSpeed'] = pageSpeed
                site['pageSize'] = pageSize
                site['lastCheckedAt'] = now
                site['lastSuccessedAt'] = now
                site['updatedAt'] = now
                super().update(**site)
            else:
                site['lastCheckedAt'] = now
                site['updatedAt'] = now
                super().update(**site)

    def addLog(self, id, state, now, attrs=None):
        sql = 'INSERT INTO Log ( siteId,  name,  createdAt,  attrs ) VALUES ( ?, ?, ?, ? )'
        cursor = self.db.cursor()
        cursor.execute(sql, (id, state, now, attrs, ))
        self.db.commit()
