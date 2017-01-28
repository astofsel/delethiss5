from django.shortcuts import render
from django.views.generic import ListView
from models import CallAccount
from django.views.generic.base import TemplateView
from django.shortcuts import render_to_response 
from serializers import CallAccountSerializer
from permissions import IsOwnerOrReadOnly
from rest_framework import viewsets


class IndexView(TemplateView): 
    template_name = 'base.html'

class SelectCallAccount(ListView): 
	template_name = 'SelectCallAccount.html'
	model = CallAccount

class nextcall(TemplateView): 
    template_name = 'nextcall.html'
    model = CallAccount

class nav(TemplateView): 
    template_name = 'nav.html'
    model = CallAccount

class modal_test(TemplateView): 
    template_name = 'modal_test.html'
    model = CallAccount

class CallAccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'uniqueID'
    queryset = CallAccount.objects.all()
    serializer_class = CallAccountSerializer
    # permission_classes = (IsOwnerOrReadOnly,)

    def pre_save(self, obj):
        obj.owner = self.request.user
