from .serializers import CategorySerializer, PostSerializer, CommentSerializer
from .models import Category, Post, Comment

import json

from django.core import serializers
from django.http import HttpResponse

from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import list_route

from django_filters.rest_framework import DjangoFilterBackend

def access_into_list(id) :
    if int(id) > 0 :
        post = Post.objects.get(id=int(id))
        if post is not None :
            post.views += 1
            post.save()
            obj_json = serializers.serialize('json', [post, ])
            struct = json.loads(obj_json)
            data = json.dumps(struct[0])
            return HttpResponse(data, content_type='application/json')
        else :
            return HttpResponse(status=400)
    else :
        return HttpResponse(status=400)

class ListPagination(PageNumberPagination) :
    page_size = 10
    page_size_query_description = 'sz'

class CategoryViewSet(viewsets.ModelViewSet) :
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PostViewSet(viewsets.ModelViewSet) :
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = ListPagination
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter, )
    filter_fields = ('category', )
    search_fields = ('title', 'context', 'writer', )
    ordering_fields = ('title', 'writer', 'views', )

    @list_route(methods = ['put', ])
    def access_read(self, request, pk=None) :
        id = request.GET.get('id')
        return access_into_list(id)

class CommentViewSet(viewsets.ModelViewSet) :
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer