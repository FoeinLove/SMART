import os.path
import csv

from django.core.management.base import BaseCommand, CommandError

from django.contrib.auth.models import User as AuthUser
from core.models import User as User, Project, Label, Data

class Command(BaseCommand):
    help = 'Seeds the database with a test user and sample data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--nouser',
            action='store_true',
            default=False,
            help="Will not create a new test user"
        )
        parser.add_argument(
            '--nodata',
            action='store_true',
            default=False,
            help="Will not seed database with sample data"
        )

    def handle(self, *args, **options):
        if not options['nouser']:
            try:
                user = User.objects.get(auth_user__username='test')
                print("SEED: test User Already Exists - user.pk: {}".format(user.pk))
            except User.DoesNotExist:
                auth_user = AuthUser.objects.create_user(username='test', password='password', email='dummy@smart.org')
                user = User.objects.create(auth_user=auth_user)
                print("SEED: New test User Created - user.pk: {}".format(user.pk))

        if not options['nodata']:
            project, created = Project.objects.get_or_create(name='seed-data')
            if not created:
                print('SEED: seed-data Project Already Exists - project.pk: {}'.format(project.pk))
            else:
                with open('./core/data/SemEval-2016-Task6/train-feminism.csv') as inf:
                    reader = csv.DictReader(inf)
                    sample_data = [Data(text=row['Tweet'], project=project) for row in reader]
                    dataset = Data.objects.bulk_create(sample_data)
                for label in ['AGAINST', 'FAVOR', 'NONE']:
                    Label.objects.create(name=label, project=project)
                print('SEED: seed-data Project Seeded with Data - project.pk: {}'.format(project.pk))