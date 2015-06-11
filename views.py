from flask import render_template

from app import app, db
from models import Banner

# Simple page to show images
@app.route('/')
def index():
    banners = db.session.query(Banner).all()
    return render_template('banners.html', banners=banners)

@app.route('/simple')
def simple():
    return render_template('simple.html', title='simple builder')
