import sys
from io import BytesIO

from PIL import Image

from django.core.files.uploadedfile import InMemoryUploadedFile


def compress_avatar(avatar, width=200, height=200):
    avatar.file.open()
    avatar_image = Image.open(avatar.file)
    avatar_image.thumbnail((width, height))
    avatar_format = avatar_image.format
    avatar_mode = avatar_image.mode
    centered_avatar_image = Image.new(avatar_mode, (width, height))
    centered_avatar_image.paste(
        avatar_image,
        (
            (width - avatar_image.size[0]) // 2,
            (height - avatar_image.size[1]) // 2
        )
    )

    output = BytesIO()
    centered_avatar_image.save(output, format=avatar_format, quality=100)
    output.seek(0)
    return InMemoryUploadedFile(
        output,
        'ImageField',
        '%s.%s' % (avatar.name.split('.')[0], avatar_format.lower()),
        Image.MIME[avatar_format],
        sys.getsizeof(output),
        None
    )
