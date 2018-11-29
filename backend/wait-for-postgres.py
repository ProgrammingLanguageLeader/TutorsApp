import logging
import time

from django.conf import settings
import psycopg2


if __name__ == '__main__':
    logging.basicConfig(
        format='[%(asctime)s] %(levelname)-s %(message)s',
        level=logging.DEBUG
    )
    logging.info('Waiting for postgres database starting...')
    postgres_started = False
    while not postgres_started:
        try:
            connect = psycopg2.connect(
                "host='{}' dbname='{}' user='{}' password='{}'".format(
                    'postgresql',
                    settings.POSTGRES_DB,
                    settings.POSTGRES_USER,
                    settings.POSTGRES_PASSWORD
                )
            )
        except psycopg2.Error as exc:
            logging.info('Postgres is unavailable, sleep 1 second...')
            logging.debug(str(exc))
            time.sleep(1)
            continue
        postgres_started = True
    logging.info('Postgres has been started')
