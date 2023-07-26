#!/usr/bin/env python3
""" LRU Caching Module. """
from base_caching import BaseCaching
from datetime import datetime


class LRUCache(BaseCaching):
    """ LRU Caching Class inherited from BaseCaching. """
    lru_cache = {}

    def __init__(self):
        """ Initialize LRU Caching. """
        super().__init__()

    def put(self, key, item):
        """ Add key/value pair to cache_data. """
        if key and item:
            self.cache_data[key] = item
            self.lru_cache[key] = datetime.now()
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            lru_key = min(self.lru_cache, key=lambda k: self.lru_cache[k])
            del self.lru_cache[lru_key]
            del self.cache_data[lru_key]
            print("DISCARD: {}".format(lru_key))

    def get(self, key):
        """ Return value stored in cache_data linked to key. """
        if key and key in self.cache_data.keys():
            self.lru_cache[key] = datetime.now()
            return self.cache_data[key]
        return None
