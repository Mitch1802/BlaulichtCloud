from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):
    foto = serializers.ImageField(required=False, allow_null=True)
    foto_url = serializers.SerializerMethodField(read_only=True)
    remove_foto = serializers.BooleanField(write_only=True, required=False, default=False)

    def get_foto_url(self, obj):
        f = getattr(obj, "foto", None)
        try:
            return f.url if f and getattr(f, "name", "") else None
        except Exception:
            return None

    def validate_foto(self, file):
        if not file:
            return file
        name = getattr(file, "name", "") or "upload"
        name = name.strip()
        if "." not in name or name.lower().endswith((".blob", ".octet-stream")):
            ct = (getattr(file, "content_type", "") or "image/png").lower()
            ext = ct.split("/")[-1]
            if ext not in {"jpg","jpeg","png","webp"}:
                ext = "png"
            file.name = f"upload.{ext}"
        else:
            import re, os
            base = os.path.basename(name)
            base = re.sub(r"[^\w.\-]+", "_", base)
            file.name = base
        return file

    def create(self, validated_data):
        foto = validated_data.pop("foto", None)
        instance = News.objects.create(**validated_data)

        if foto:
            instance.foto = foto
            instance.save(update_fields=["foto"])
        return instance

    def update(self, instance, validated_data):
        remove = validated_data.pop("remove_foto", False)
        foto   = validated_data.pop("foto", None)
        instance = super().update(instance, validated_data)
        if remove:
            if instance.foto and instance.foto.name:
                storage, name = instance.foto.storage, instance.foto.name
                instance.foto.delete(save=False)
                storage.delete(name)
            instance.foto = None
            instance.save(update_fields=["foto"])
        elif foto:
            instance.foto = foto
            instance.save(update_fields=["foto"])
        return instance

    class Meta:
        model = News
        fields = "__all__"
