from rest_framework import serializers

from .models import FMD


class NullableDateField(serializers.DateField):
    def to_internal_value(self, value):
        if value in (None, ""):
            return None
        return super().to_internal_value(value)

class NullableIntegerField(serializers.IntegerField):
    def to_internal_value(self, value):
        if value in (None, ""):
            return None
        return super().to_internal_value(value)

class FMDSerializer(serializers.ModelSerializer):
    letzte_untersuchung = NullableDateField(
        format='%d.%m.%Y',
        input_formats=['%d.%m.%Y','iso-8601'],
        required=False,
        allow_null=True
    )
    fdisk_aenderung = NullableDateField(
        format='%d.%m.%Y',
        input_formats=['%d.%m.%Y','iso-8601'],
        required=False,
        allow_null=True
    )
    naechste_untersuchung = NullableIntegerField(
        required=False,
        allow_null=True
    )

    class Meta:
        model = FMD
        fields = '__all__'
