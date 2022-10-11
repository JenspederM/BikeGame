from datetime import datetime, timedelta
from pprint import pprint


def timedelta_string(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0):
    delta = timedelta(
        days=days,
        seconds=seconds,
        microseconds=microseconds,
        milliseconds=milliseconds,
        minutes=minutes,
        hours=hours,
        weeks=weeks,
    )

    return (datetime.now() - delta).strftime("%Y-%m-%dT%H:%M:%S")


if __name__ == "__main__":
    times = [{"start": timedelta_string(j), "end": timedelta_string(i)} for i, j in zip(range(0, 60), range(1, 61))]
    pprint(times)
