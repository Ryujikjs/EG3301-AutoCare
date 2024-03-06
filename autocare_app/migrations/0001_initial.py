# Generated by Django 4.2.4 on 2023-08-28 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Mode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mode', models.CharField(choices=[('STANDBY', 'Standby'), ('MOVING', 'Moving'), ('DROPOFF', 'Dropoff'), ('PICKUP', 'Pickup'), ('ERROR', 'Error'), ('CHARGING', 'Charging')], default='STANDBY', max_length=20)),
            ],
        ),
    ]