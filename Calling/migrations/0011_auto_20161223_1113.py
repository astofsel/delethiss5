# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-12-23 14:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Calling', '0010_auto_20161223_1112'),
    ]

    operations = [
        migrations.AlterField(
            model_name='callaccount',
            name='Next_FU',
            field=models.CharField(default='', max_length=1000),
        ),
    ]
