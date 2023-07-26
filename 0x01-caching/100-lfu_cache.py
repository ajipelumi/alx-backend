#!/usr/bin/env python3
""" LFU Caching Module. """
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFU Caching Class inherited from BaseCaching. """
    lfu_cache = {}

    def __init__(self):
        """ Initialize LFU Caching. """
        super().__init__()

    def put(self, key, item):
        """ Add key/value pair to cache_data. """
        if key and item:
            self.cache_data[key] = item
            self.lfu_cache[key] = self.lfu_cache.get(key, 0) + 1
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            # Get the key that was just added
            latest_key = self.lfu_cache[key]
            # Delete the key that was just added
            del self.lfu_cache[key]
            # Get the key with the lowest frequency
            lfu_key = min(self.lfu_cache, key=lambda k: self.lfu_cache[k])
            # Add back the key that was just added
            self.lfu_cache[key] = latest_key
            # Delete the key with the lowest frequency from both dicts
            del self.lfu_cache[lfu_key]
            del self.cache_data[lfu_key]
            print("DISCARD: {}".format(lfu_key))

    def get(self, key):
        """ Return value stored in cache_data linked to key. """
        if key and key in self.cache_data.keys():
            self.lfu_cache[key] = self.lfu_cache.get(key, 0) + 1
            return self.cache_data[key]
        return None
