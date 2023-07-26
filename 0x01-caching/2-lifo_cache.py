#!/usr/bin/env python3
""" LIFO Caching Module. """
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """ LIFO Caching Class inherited from BaseCaching. """
    last_updated_keys = []

    def __init__(self):
        """ Initialize LIFO Caching. """
        super().__init__()

    def put(self, key, item):
        """ Add key/value pair to cache_data. """
        if key and item:
            self.cache_data[key] = item
            self.last_updated_keys.append(key)
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            last_updated_key = self.last_updated_keys[-2]
            del self.cache_data[last_updated_key]
            print("DISCARD: {}".format(last_updated_key))

    def get(self, key):
        """ Return value stored in cache_data linked to key. """
        if key and key in self.cache_data.keys():
            return self.cache_data[key]
        return None
