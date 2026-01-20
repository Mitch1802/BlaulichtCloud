from rest_framework import serializers

from .models import (
    Fahrzeug,
    FahrzeugRaum,
    RaumItem,
    FahrzeugCheck,
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


 

class FahrzeugCheckItemReadSerializer(serializers.ModelSerializer):
    item_id = serializers.UUIDField(source="item.id", read_only=True)
    item_name = serializers.CharField(source="item.name", read_only=True)
    ziel_menge = serializers.DecimalField(source="item.menge", max_digits=10, decimal_places=2, read_only=True)
    einheit = serializers.CharField(source="item.einheit", read_only=True)
    raum_name = serializers.CharField(source="item.raum.name", read_only=True)

    class Meta:
        model = FahrzeugCheckItem
        fields = [
            "id",            
            "item_id",
            "item_name",
            "raum_name",
            "status",
            "ziel_menge",
            "menge_aktuel",
            "einheit",
            "notiz",
        ]


class FahrzeugCheckListSerializer(serializers.ModelSerializer):
    # Kurz für Liste
    results_count = serializers.IntegerField(source="results.count", read_only=True)

    class Meta:
        model = FahrzeugCheck
        fields = [
            "id",          
            "created_at",
            "title",
            "notiz",
            "results_count",
        ]


class FahrzeugCheckDetailSerializer(serializers.ModelSerializer):
    results = FahrzeugCheckItemReadSerializer(many=True, read_only=True)

    class Meta:
        model = FahrzeugCheck
        fields = [
            "id",
            "created_at",
            "title",
            "notiz",
            "results",
        ]
