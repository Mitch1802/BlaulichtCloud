from rest_framework import serializers

from .models import AtemschutzMaske


class AtemschutzMaskeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtemschutzMaske
        fields = '__all__'
