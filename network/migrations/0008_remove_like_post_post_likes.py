# Generated by Django 4.0.6 on 2022-08-18 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0007_remove_post_likes_remove_user_followers_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='like',
            name='post',
        ),
        migrations.AddField(
            model_name='post',
            name='likes',
            field=models.ManyToManyField(to='network.like'),
        ),
    ]
