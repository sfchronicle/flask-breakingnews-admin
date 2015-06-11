from datetime import datetime
from app import db

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
