#!/usr/bin/env python3
""" MRU Caching Module. """
from base_caching import BaseCaching
from datetime import datetime


class MRUCache(BaseCaching):
    """ MRU Caching Class inherited from BaseCaching. """
    mru_cache = {}

    def __init__(self):
        """ Initialize MRU Caching. """
        super().__init__()

    def put(self, key, item):
        """ Add key/value pair to cache_data. """
        if key and item:
            self.cache_data[key] = item
            # Update the mru_cache with the most recent key
            self.mru_cache[key] = datetime.now()
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            #  Sort the mru_cache by datetime
            mru_items = sorted(self.mru_cache.items(),
                               key=lambda x: x[1], reverse=True)
            # Get the 2nd most recent key because the most recent key is the
            # one that was just added
            mru_key = mru_items[1][0]
            # Delete the 2nd most recent key from both dicts
            del self.mru_cache[mru_key]
            del self.cache_data[mru_key]
            print("DISCARD: {}".format(mru_key))

    def get(self, key):
        """ Return value stored in cache_data linked to key. """
        if key and key in self.cache_data.keys():
            self.mru_cache[key] = datetime.now()
            return self.cache_data[key]
        return None
