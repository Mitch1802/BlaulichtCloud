from rest_framework import serializers

from .models import Mitglied


class MitgliedListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        mitglieder = [Mitglied(**item) for item in validated_data]
        return Mitglied.objects.bulk_create(mitglieder)


class MitgliedSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        instance = Mitglied.objects.create(**validated_data)
        return instance

    def update(self, instance, validated_data):
        instance.stbnr = validated_data.get("stbnr", instance.stbnr)
        instance.vorname = validated_data.get("vorname", instance.vorname)
        instance.nachname = validated_data.get("nachname", instance.nachname)
        instance.svnr = validated_data.get("svnr", instance.svnr)
        instance.geburtsdatum = validated_data.get("geburtsdatum", instance.geburtsdatum)
        instance.hauptberuflich = validated_data.get("hauptberuflich", instance.hauptberuflich)
        instance.updated_at = validated_data.get("updated_at", instance.updated_at)

        instance.save()
        return instance

    class Meta:
        model = Mitglied
        fields = '__all__'
        list_serializer_class = MitgliedListSerializer
