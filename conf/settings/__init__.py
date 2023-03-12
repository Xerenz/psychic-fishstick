import os

from .base import *


environ = os.getenv('ENVIRON')

if environ == 'PRODUCTION':
    from .prod import *
else:
    from .dev import *
