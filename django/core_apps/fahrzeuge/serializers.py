from rest_framework import serializers
from .models import Fahrzeug, FahrzeugRaum, RaumItem, FahrzeugCheckItem


# =========================
# LIST
# =========================
class FahrzeugListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fahrzeug
        fields = ["id", "name", "bezeichnung", "public_id"]


# =========================
# DETAIL (AUTH)
# =========================
class RaumItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = RaumItem
        fields = ["id", "name", "menge", "einheit", "notiz", "reihenfolge"]


class FahrzeugRaumSerializer(serializers.ModelSerializer):
    items = RaumItemSerializer(many=True, read_only=True)

    class Meta:
        model = FahrzeugRaum
        fields = ["id", "name", "reihenfolge", "items"]


class FahrzeugDetailSerializer(serializers.ModelSerializer):
    raeume = FahrzeugRaumSerializer(many=True, read_only=True)

    class Meta:
        model = Fahrzeug
        fields = ["id", "name", "bezeichnung", "beschreibung", "public_id", "raeume"]


# =========================
# CRUD
# =========================
class FahrzeugCrudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fahrzeug
        fields = ["id", "name", "bezeichnung", "beschreibung"]
