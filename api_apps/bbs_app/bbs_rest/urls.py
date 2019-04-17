from django.urls import path, include
from .views import CategoryViewSet, PostViewSet, CommentViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('category', CategoryViewSet)
router.register('post', PostViewSet)
router.register('comment', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]