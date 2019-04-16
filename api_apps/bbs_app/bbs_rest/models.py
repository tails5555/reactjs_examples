from django.db import models

class Category(models.Model) :
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, null=False, default='')

class Post(models.Model) :
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    writer = models.CharField(max_length=20, null=False, default='')
    title = models.CharField(max_length=100, null=False, default='')
    context = models.TextField(null=False, default='')
    views = models.IntegerField(null=False, default=0)

class Comment(models.Model) :
    id = models.AutoField(primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    writer = models.CharField(max_length=20, null=False, default='')
    context = models.TextField(null=False, default='')