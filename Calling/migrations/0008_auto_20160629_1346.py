# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-29 12:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Calling', '0007_auto_20160618_0041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='callaccount',
            name='Next_FU',
            field=models.DateTimeField(),
        ),
    ]
