from django.conf.urls import *
from rest_framework import routers
from Calling import views 
from views import IndexView
from Calling.views import SelectCallAccount

router = routers.DefaultRouter()
router.register(r'CallAccount', views.CallAccountViewSet) 


urlpatterns = patterns ('', 
	url(r'^api/' , include(router.urls)),		
	url(r'^,*$', IndexView.as_view(), name='index'),
)

