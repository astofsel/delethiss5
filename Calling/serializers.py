from rest_framework import serializers 
from Calling.models import CallAccount
from django.contrib.auth.models import User 

class CallAccountSerializer(serializers.HyperlinkedModelSerializer):
	uniqueID = serializers.UUIDField()
	Next_FU = serializers.DateTimeField()
	class Meta:
		model = CallAccount
		fields = ('CompanyName', 'ContactName', 'Next_FU', 'Notes_CallAccount', 'uniqueID') 
		