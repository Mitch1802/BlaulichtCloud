from rest_framework import serializers

from .models import AtemschutzGeraet, AtemschutzGeraetProtokoll


class AtemschutzGeraetSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtemschutzGeraet
        fields = '__all__'

class AtemschutzGeraetProtokollSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtemschutzGeraetProtokoll
        fields = '__all__'