from rest_framework import serializers

from .models import ModulKonfiguration


class ModulKonfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModulKonfiguration
        fields = '__all__'
