import functools
import logging
import math
import requests
import time
import traceback

from sitechecker.hooks import getHooks

def compose_helper(f, g, x):
    y = f(x)
    if y == 1:
        return 1
    if y == 0:
        return g(x)
    return -1

class SiteChecker:

    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.hooks = getHooks()
        self.headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183',
        }

    def request(self, url):
        response = requests.get(url, headers=self.headers, timeout=10)
        return response

    def response(self, response, hooks):
        hooks = [ functools.partial(self.hooks[hook['name']], hook) for hook in hooks ]
        self.logger.debug('matched response hooks: %s', hooks)
        compose = lambda f, g: lambda x: compose_helper(f, g, x)
        return functools.reduce(compose, hooks)(response) > -1

    def check(self, url, hooks):
        isSuccess = True
        responseURL = None
        pageSpeed = -1
        pageSize = 0
        try:
            start = time.time()
            response = self.request(url)
            retval = self.response(response, hooks)
            end = time.time()
            if retval:
                responseURL = response.url
                pageSpeed = math.ceil((end - start) * 1000) / 1000
                pageSize = len(response.content)
            else:
                isSuccess = False
        except requests.exceptions.ConnectionError:
            self.logger.error("접속 오류 - %s", url)
            isSuccess = False
        except requests.exceptions.ReadTimeout:
            self.logger.error("읽기 시간 초과 - %s", url)
            isSuccess = False
        except Exception as e:
            self.logger.error(traceback.format_exc())
            isSuccess = False
        return isSuccess, responseURL, pageSpeed, pageSize
