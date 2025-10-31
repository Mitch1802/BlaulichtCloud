from rest_framework import serializers

from .models import AtemschutzMaske, AtemschutzMaskeProtokoll


class AtemschutzMaskeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtemschutzMaske
        fields = '__all__'

class AtemschutzMaskeProtokollSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtemschutzMaskeProtokoll
        fields = '__all__'
