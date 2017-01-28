
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.models import User

from Calling.views import SelectCallAccount, nextcall, nav, modal_test
# from Calling.models import CallAccount
from Calling import views, urls



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^nav/SelectCallAccount/$', SelectCallAccount.as_view()),
    url(r'^nav/nextcall/$', nextcall.as_view()),
    url(r'^nav/modal_test/$', modal_test.as_view()),
    url(r'^nav/$', nav.as_view()),
    url(r'^CallAccount/', include('Calling.urls')),
	
]