# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-12-23 12:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Calling', '0008_auto_20160629_1346'),
    ]

    operations = [
        migrations.AlterField(
            model_name='callaccount',
            name='Next_FU',
            field=models.DateTimeField(default=''),
        ),
    ]