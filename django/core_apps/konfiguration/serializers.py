from rest_framework import serializers

from .models import Konfiguration


class KonfigurationSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        instance = Konfiguration.objects.create(**validated_data)
        return instance

    def update(self, instance, validated_data):
        instance.plz = validated_data.get("plz", instance.plz)
        instance.ort = validated_data.get("ort", instance.ort)
        instance.updated_at = validated_data.get("updated_at", instance.updated_at)

        instance.save()
        return instance

    class Meta:
        model = Konfiguration
        fields = '__all__'
