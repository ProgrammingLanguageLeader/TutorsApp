import profanityfilter

from utils.singleton import Singleton


class ProfanityFilter(profanityfilter.ProfanityFilter, metaclass=Singleton):
    def __init__(self):
        extra_words_file_path = 'utils/resources/russian_profanity.txt'
        with open(extra_words_file_path, 'r') as extra_words_file:
            extra_censor_list = [
                line.replace('\n', '')
                for line in extra_words_file.readlines()
            ]
        super().__init__(extra_censor_list=extra_censor_list)
