from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):
    foto = serializers.ImageField(required=False, allow_null=True, write_only=True)
    foto_url = serializers.SerializerMethodField(read_only=True)

    def get_foto_url(self, obj):
        f = getattr(obj, "foto", None)
        try:
            return f.url if f and getattr(f, "name", "") else None
        except Exception:
            return None

    def create(self, validated_data):
        foto = validated_data.pop("foto", None)
        instance = News.objects.create(**validated_data)

        if foto:
            instance.foto = foto
            instance.save(update_fields=["foto"])
        return instance

    def update(self, instance, validated_data):
        foto = validated_data.pop("foto", None)
        instance = super().update(instance, validated_data)
        if foto:
            instance.foto = foto
            instance.save(update_fields=["foto"])
        return instance

    class Meta:
        model = News
        fields = "__all__"
        extra_kwargs = {"foto": {"required": False, "allow_null": True}}
