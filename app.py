import os
from datetime import datetime

from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy

from flask.ext import admin
from flask.ext.admin.contrib.sqla import ModelView

# Create application
app = Flask(__name__)

# Create dummy secrey key so we can use sessions
app.config['SECRET_KEY'] = '123456790'

# Create in-memory database
app.config['DATABASE_FILE'] = 'app.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///{}'.format(
    app.config['DATABASE_FILE'])
app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)

# Create models
class Banner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    headline = db.Column(db.Unicode(64))
    body = db.Column(db.UnicodeText())
    story_url = db.Column(db.String(255))
    image_url = db.Column(db.String(255))

    created_on = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_on = db.Column(db.DateTime(), default=datetime.utcnow,
                                          onupdate=datetime.utcnow)

    def __init__(self, headline="", body=""):
        self.headline = headline
        self.body = body

    def __repr__(self):
        return '<Banner - {}>'.format(self.headline)


# Customized admin interface
# class CustomView(ModelView):
#     list_template = 'admin/list.html'
#     create_template = 'admin/create.html'
#     edit_template = 'admin/edit.html'
#
#
class BannerAdmin(ModelView):
    column_searchable_list = ('headline',)
    column_filters = ('headline', 'created_on')


# Simple page to show images
@app.route('/')
def index():
    banners = db.session.query(Banner).all()
    return render_template('banners.html', banners=banners)

# Admin
admin = admin.Admin(app)

# Add Views
admin.add_view(BannerAdmin(Banner, db.session))

if __name__ == '__main__':
    BASE_DIR = os.path.realpath(os.path.dirname(__file__))
    DB_PATH = os.path.join(BASE_DIR, app.config['DATABASE_FILE'])

    if not os.path.exists(DB_PATH):
        db.create_all()

    # Start app
    app.run(debug=True)
