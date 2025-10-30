from rest_framework import serializers

from .models import Messgeraet


class MessgeraetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messgeraet
        fields = '__all__'
