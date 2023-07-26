#!/usr/bin/env python3
""" FIFO Caching Module. """
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFO Caching Class inherited from BaseCaching. """
    def __init__(self):
        """ Initialize FIFO Caching. """
        super().__init__()

    def put(self, key, item):
        """ Add key/value pair to cache_data. """
        if key and item:
            self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            # Get all keys in cache_data
            all_keys = self.cache_data.keys()
            # Get the first key in cache_data (FIFO)
            first_key = list(all_keys)[0]
            # Delete the first key from cache_data
            del self.cache_data[first_key]
            print("DISCARD: {}".format(first_key))

    def get(self, key):
        """ Return value stored in cache_data linked to key. """
        if key and key in self.cache_data.keys():
            return self.cache_data[key]
        return None
