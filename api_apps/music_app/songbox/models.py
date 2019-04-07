from django.db import models

class Genre(models.Model) :
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, null=False, default='')

class Music(models.Model) :
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, null=False, default='')
    singer = models.CharField(max_length=100, null=False, default='')
    year = models.IntegerField(null=False, default=1900)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    hearts = models.IntegerField(null=False, default=0)