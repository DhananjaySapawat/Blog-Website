# Generated by Django 4.0.5 on 2022-06-26 01:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Post', '0004_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, default='/empty.png', null=True, upload_to='None'),
        ),
    ]
