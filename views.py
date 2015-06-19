from flask import render_template, redirect, url_for

from app import app, db
from models import Banner

# Simple page to show images
# @app.route('/')
# def index():
#     banners = db.session.query(Banner).all()
#     return render_template('banners.html', banners=banners)

@app.route('/')
def index():
    return redirect(url_for('multi'))

@app.route('/builder.html')  # using file extension to keep frozen-flask happy
def simple():
    return render_template('simple.html', title='simple')

@app.route('/multi.html')
def multi():
    return render_template('multi.html', title='simple')
