from rest_framework import serializers

from .models import (
    Fahrzeug,
    FahrzeugRaum,
    RaumItem,
    FahrzeugCheckItem,
)

# =====================================================
# LIST (AUTH) – Fahrzeug Übersicht
# =====================================================

class FahrzeugListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fahrzeug
        fields = [
            "id",            # UUID
            "name",
            "bezeichnung",
            "public_id",
        ]


# =====================================================
# PUBLIC (PIN) – READONLY, KEINE IDs, KEINE INTERNEN FELDER
# =====================================================

class RaumItemPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = RaumItem
        fields = [
            "name",
            "menge",
            "einheit",
            "notiz",
            "reihenfolge",
        ]


class FahrzeugRaumPublicSerializer(serializers.ModelSerializer):
    items = RaumItemPublicSerializer(many=True, read_only=True)

    class Meta:
        model = FahrzeugRaum
        fields = [
            "name",
            "reihenfolge",
            "items",
        ]


class FahrzeugPublicDetailSerializer(serializers.ModelSerializer):
    raeume = FahrzeugRaumPublicSerializer(many=True, read_only=True)

    class Meta:
        model = Fahrzeug
        fields = [
            "name",
            "bezeichnung",
            "beschreibung",
            "public_id",
            "raeume",
        ]


# =====================================================
# AUTH DETAIL – MIT IDs (für Checks & Verwaltung)
# =====================================================

class RaumItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = RaumItem
        fields = [
            "id",            # UUID
            "name",
            "menge",
            "einheit",
            "notiz",
            "reihenfolge",
        ]


class FahrzeugRaumSerializer(serializers.ModelSerializer):
    items = RaumItemSerializer(many=True, read_only=True)

    class Meta:
        model = FahrzeugRaum
        fields = [
            "id",            # UUID
            "name",
            "reihenfolge",
            "items",
        ]


class FahrzeugDetailSerializer(serializers.ModelSerializer):
    raeume = FahrzeugRaumSerializer(many=True, read_only=True)

    class Meta:
        model = Fahrzeug
        fields = [
            "id",            # UUID
            "name",
            "bezeichnung",
            "beschreibung",
            "public_id",
            "raeume",
        ]


# =====================================================
# CRUD – CREATE / UPDATE Fahrzeug (Auth)
# =====================================================

class FahrzeugCrudSerializer(serializers.ModelSerializer):
    """
    Für POST / PATCH / PUT
    - keine nested Daten
    - keine internen Felder
    """

    class Meta:
        model = Fahrzeug
        fields = [
            "id",            # UUID (read-only)
            "name",
            "bezeichnung",
            "beschreibung",
        ]
        read_only_fields = ["id"]


# =====================================================
# CHECK CREATE (AUTH ONLY)
# =====================================================

class FahrzeugCheckItemCreateSerializer(serializers.Serializer):
    item_id = serializers.UUIDField()
    status = serializers.ChoiceField(
        choices=FahrzeugCheckItem.Status.choices
    )
    menge_aktuel = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        required=False,
        allow_null=True,
    )
    notiz = serializers.CharField(
        required=False,
        allow_blank=True,
    )


class FahrzeugCheckCreateSerializer(serializers.Serializer):
    title = serializers.CharField(required=False, allow_blank=True)
    notiz = serializers.CharField(required=False, allow_blank=True)
    results = FahrzeugCheckItemCreateSerializer(many=True)

    def validate(self, data):
        if not data.get("results"):
            raise serializers.ValidationError(
                "results darf nicht leer sein."
            )
        return data
