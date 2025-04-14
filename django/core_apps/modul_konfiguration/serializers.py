from rest_framework import serializers

from .models import ModulKonfiguration


class ModulKonfigurationSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        instance = ModulKonfiguration.objects.create(**validated_data)
        return instance

    def update(self, instance, validated_data):
        instance.modul = validated_data.get("modul", instance.modul)
        instance.konfiguration = validated_data.get("konfiguration", instance.konfiguration)
        instance.updated_at = validated_data.get("updated_at", instance.updated_at)

        instance.save()
        return instance

    class Meta:
        model = ModulKonfiguration
        fields = '__all__'
