import flask_admin as admin
from flask_admin.contrib.sqla import ModelView

from app import app, db
from models import Banner


class BannerAdmin(ModelView):
    column_searchable_list = ('headline',)
    column_filters = ('headline', 'created_on')


# Admin
admin = admin.Admin(app)

# Add Views
admin.add_view(BannerAdmin(Banner, db.session, endpoint="banners"))
