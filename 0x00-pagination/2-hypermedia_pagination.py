#!/usr/bin/env python3
""" Hypermedia pagination module. """
import csv
import math
from typing import List, Dict

index_range = __import__('0-simple_helper_function').index_range


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ Get page from dataset. """
        # Verify that both arguments are integers greater than 0.
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        # Get start and end indexes of the dataset.
        start, end = index_range(page, page_size)

        # Call dataset() to get the entire dataset.
        data = self.dataset()

        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """ Get page with hypermedia pagination. """
        # Get page from dataset.
        data = self.get_page(page, page_size)

        # Get total number of pages.
        total_pages = math.ceil(len(self.dataset()) / page_size)

        # Get next and previous pages.
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        # Create dictionary with hypermedia pagination.
        hypermedia = {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': next_page,
            'prev_page': prev_page,
            'total_pages': total_pages
        }

        return hypermedia
