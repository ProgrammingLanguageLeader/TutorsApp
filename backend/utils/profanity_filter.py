import dictionary_profanity_filter

from utils.singleton import Singleton


class ProfanityFilter(
    dictionary_profanity_filter.ProfanityFilter,
    metaclass=Singleton
):
    pass
