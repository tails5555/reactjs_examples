from rest_framework import serializers
from .models import Music, Genre

class GenreSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Genre
        fields = ('id', 'name',)

class MusicSerializer(serializers.ModelSerializer) :
    genre = GenreSerializer(many=False, read_only=False)

    def create(self, validated_data) :
        genre = validated_data.pop('genre')
        tmp_genre = Genre.objects.filter(name=genre['name'])
        
        music = Music(**validated_data)
        # 장르 이름으로 장르 객체를 조회하고 실제 데이터베이스에 설정합니다.
        if len(tmp_genre) > 0 :
            music.genre = tmp_genre[0]

        music.save()
        return music

    def update(self, instance, validated_data) :
        genre = validated_data.pop('genre')
        
        # 좋아요 수치 빼고 바뀐 데이터를 전부 수정합니다.
        instance.title = validated_data.pop('title')
        instance.singer = validated_data.pop('singer')
        instance.year = validated_data.pop('year')

        # 장르 이름으로 장르 객체를 조회하고 실제 데이터베이스에 설정합니다.
        tmp_genre = Genre.objects.filter(name=genre['name'])
        if len(tmp_genre) > 0 :
            instance.genre = tmp_genre[0]
        
        instance.save()
        return instance

    class Meta :
        model = Music
        fields = ('id', 'title', 'singer', 'year', 'genre', 'hearts', )