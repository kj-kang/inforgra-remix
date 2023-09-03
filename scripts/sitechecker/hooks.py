import logging
import lxml.html.clean
import urllib
import re

from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

cleaner = lxml.html.clean.Cleaner()
cleaner.style = True
cleaner.inline_style = True
cleaner.script = True

class ResponseHookError(Exception):
    def __init__(self, message):
        self.message = message

def getHooks():
    hooks = {}
    hooks['status_code'] = status_code
    hooks['domain'] = domain
    hooks['content'] = content
    return hooks

def status_code(config, response):
    logger.debug('hook[status_code] - %s', config)
    if 'is' in config:
        if response.status_code != config['is']:
            logger.error('hook[status_code_is_200] - %s', response.status_code)
            return -1
    return 0

def domain(config, response):
    logger.debug('hook[domain] - %s', config)
    (tld, domain, *subdomain) = urllib.parse.urlparse(response.url).netloc.split(".")[::-1]
    if 'contains' in config:
        if config['contains'] not in domain:
            logger.error('hook[domain] %s not in %s', config['contains'], domain)
            return -1
    if 'invalid' in config:
        if domain in config['invalid']:
            logger.error('hook[domain] %s is invalid %s', domain, config['invalid'])
            return -1
    return 0

isHangul = lambda ch: 44032 <= ord(ch) <= 55023

def content(config, response):
    logger.debug('hook[content] - %s', config)
    content = response.content
    if 'encoding' in config:
        content = content.decode(config['encoding'], errors='ignore')
    else:
        content = content.decode('utf-8', errors='ignore')
    content = re.sub('[\n\r]+', '', content)
    content = re.sub('[ ]+', ' ', content)
    contentLength = len(content)
    cleaned = cleaner.clean_html(content)
    cleanedLength = len(cleaned)
    soup = BeautifulSoup(cleaned, features='lxml')
    text = soup.get_text()
    textLengh = len(text)
    if 'text_ratio' in config:
        ratio = cleanedLength / contentLength
        if config['text_ratio'] > ratio:
            logger.error('hook[content] text_ratio %.4f > %.4f', config['text_ratio'], ratio)
            return -1
    if 'hangul_ratio' in config:
        ratio = len(list(filter(isHangul, text))) / textLengh
        if config['hangul_ratio'] > ratio:
            logger.error('hook[content] hangul_ratio %.4f > %.4f', config['hangul_ratio'], ratio)
            return -1
    return 0
