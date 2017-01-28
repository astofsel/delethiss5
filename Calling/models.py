from __future__ import unicode_literals
from django.utils import timezone
import datetime 
from django.db import models
from django import forms 
from datetime import datetime
import uuid


# Create your models here.

class User(models.Model): 
	name = models.CharField(max_length=50)

class CallAccount(models.Model): 
	CompanyName = models.CharField(max_length=100)
	ContactName = models.CharField(max_length=100)
	Next_FU = models.DateTimeField(default=datetime.now, blank=True)
	Notes_CallAccount = models.CharField(max_length=10000, default='')
	uniqueID = models.UUIDField(primary_key=True, default=uuid.uuid4)

	class Meta:
		unique_together = ('CompanyName', 'uniqueID')

class PhoneCall1(models.Model): 
	DateTime = models.DateTimeField(default=datetime.now)
	
class CallAccountNote(models.Model): 
	Notes = models.CharField(max_length=100)