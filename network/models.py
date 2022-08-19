from statistics import mode
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username
        }

class Following(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name="following")
    user_to_follow = models.ForeignKey('User', on_delete=models.CASCADE, related_name="follower")

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "user_to_follow": self.user_to_follow.username
        }

class Post(models.Model):
    creator = models.ForeignKey('User', on_delete=models.CASCADE, related_name="posts")
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=True) 
    likes = models.ManyToManyField('User') 

    def serialize(self):
        return {
            "id": self.id,
            "creator": self.creator.username,
            "content": self.content,
            "date": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
            "likes": [like.username for like in self.likes.all()]
        }
   




    
