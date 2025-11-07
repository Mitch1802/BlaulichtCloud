from rest_framework import serializers

from .models import Messgeraet, MessgeraetProtokoll


class MessgeraetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messgeraet
        fields = '__all__'

class MessgeraetProtokollSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessgeraetProtokoll
        fields = '__all__'
