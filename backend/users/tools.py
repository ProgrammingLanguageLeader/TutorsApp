import sys
from io import BytesIO

from PIL import Image

from django.core.files.uploadedfile import InMemoryUploadedFile


def compress_avatar(avatar):
    avatar.file.open()
    avatar_image = Image.open(avatar.file)
    avatar_image.thumbnail((200, 200))
    avatar_format = avatar_image.format
    output = BytesIO()
    avatar_image.save(output, format=avatar_format, quality=100)
    output.seek(0)
    return InMemoryUploadedFile(
        output,
        'ImageField',
        '%s.%s' % (avatar.name.split('.')[0], avatar_format.lower()),
        Image.MIME[avatar_format],
        sys.getsizeof(output),
        None
    )
