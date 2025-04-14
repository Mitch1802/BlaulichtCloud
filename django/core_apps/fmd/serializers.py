from rest_framework import serializers

from .models import FMD


class FMDSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        instance = FMD.objects.create(**validated_data)
        return instance

    def update(self, instance, validated_data):
        instance.mitglied_id = validated_data.get("mitglied_id", instance.mitglied_id)
        instance.hausarzt = validated_data.get("hausarzt", instance.hausarzt)
        instance.letzte_untersuchung = validated_data.get("letzte_untersuchung", instance.letzte_untersuchung)
        instance.leistungstest = validated_data.get("leistungstest", instance.leistungstest)
        instance.naechste_untersuchung = validated_data.get("naechste_untersuchung", instance.naechste_untersuchung)
        instance.tauglichkeit = validated_data.get("tauglichkeit", instance.tauglichkeit)
        instance.notizen = validated_data.get("notizen", instance.notizen)
        instance.fdisk_aenderung = validated_data.get("fdisk_aenderung", instance.fdisk_aenderung)
        instance.updated_at = validated_data.get("updated_at", instance.updated_at)

        instance.save()
        return instance

    class Meta:
        model = FMD
        fields = '__all__'
