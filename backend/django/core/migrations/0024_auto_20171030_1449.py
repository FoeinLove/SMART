# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-30 14:49
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0023_trainingset_celery_task_id'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='datalabel',
            unique_together=set([('data', 'profile')]),
        ),
    ]
