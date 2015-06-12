import os

from flask.ext.frozen import Freezer
from app import app
from views import *

freezer = Freezer(app)

if __name__ == '__main__':
    app.config['DEBUG'] = False
    freezer.freeze()
