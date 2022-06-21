from django.db import models
from django.contrib.auth.models import User
import datetime
# Create your models here.
class Post(models.Model):
    id = models.AutoField(auto_created=True,primary_key=True,unique=True)
    article_title = models.CharField(max_length = 100)
    description = models.TextField(max_length = 10000)
    author = models.ForeignKey(User, on_delete=models.CASCADE,default = None,null=True)
    username = models.CharField(max_length = 100,default="")
    article_image = models.CharField(max_length = 200,default="")
    company = models.CharField(max_length = 100,default="")
    likes = models.ManyToManyField(User,related_name ="likes")
    date = models.DateField(("Date"), default=datetime.date.today )
    def number_of_likes(self):
        return self.likes.count()
