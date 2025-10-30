from rest_framework import serializers

from .models import AtemschutzGeraet


class AtemschutzGeraetSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtemschutzGeraet
        fields = '__all__'
