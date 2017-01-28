from django.contrib import admin

from .models import User, CallAccount, PhoneCall1, CallAccountNote

class UserAdmin(admin.ModelAdmin):
	list_display = ['name']
	class Meta: 
		model = User

class CallAccountAdmin(admin.ModelAdmin): 
	list_display = ['CompanyName', 'ContactName', 'Next_FU', 'Notes_CallAccount', 'uniqueID']
	class Meta: 
		model = CallAccount

class PhoneCallAdmin(admin.ModelAdmin): 
	# list_display = ['DateTime']
	list_display = ['DateTime']
	class Meta: 
		model = PhoneCall1

class CallAccountNotesAdmin(admin.ModelAdmin): 
	list_display = ['Notes']
	class Meta:
		model = CallAccountNote


admin.site.register(User, UserAdmin)
admin.site.register(CallAccount, CallAccountAdmin)
admin.site.register(PhoneCall1, PhoneCallAdmin)
admin.site.register(CallAccountNote, CallAccountNotesAdmin)