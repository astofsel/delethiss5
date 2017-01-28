from django import forms 

from .models import User

class UserForm(forms.ModelForm):
	class Meta: 
		model = User
		fiels = ['name']

class CallAccountForm(forms.ModelForm): 
	class Meta: 
		model = CallAccount
		fields = ['CompanyName', 'ContactName', 'Next_FU', 'Notes_CallAccount', 'uniqueID']