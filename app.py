from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

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

# Simple page to show images
# @app.route('/')
# def index():
#     banners = db.session.query(Banner).all()
#     return render_template('banners.html', banners=banners)

# @app.route('/simple.html')
# def simple():
#     return render_template('simple.html')
