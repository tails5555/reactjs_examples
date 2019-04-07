from django.urls import path, include
from .views import MusicViewSet, GenreViewSet, MusicPageViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('music', MusicViewSet)
router.register('genre', GenreViewSet)

# 이는 음악 목록에 대하여 페이징네이션을 제공합니다.
router.register('music_page', MusicPageViewSet)
urlpatterns = [
    path('', include(router.urls)),
]