from rest_framework import serializers
from .models import Category, Post, Comment

class CategorySerializer(serializers.ModelSerializer) :
    class Meta :
        model = Category
        fields = ('id', 'name', )

class PostSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Post
        fields = ('id', 'category', 'writer', 'title', 'context', 'views', )

class CommentSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Comment
        fields = ('id', 'post', 'writer', 'context', )
