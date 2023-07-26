#!/usr/bin/env python3
""" Basic Cache Module. """
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ Basic Cache Class. """
    def __init__(self):
        """ Initialize cache class. """
        super().__init__()

    def put(self, key, item):
        """ Add key/value pair to cache data. """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """ Return value stored in cache_data linked to key. """
        if key and key in self.cache_data.keys():
            return self.cache_data[key]
        return None
