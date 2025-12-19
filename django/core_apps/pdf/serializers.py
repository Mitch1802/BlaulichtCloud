from rest_framework import serializers

from .models import PdfTemplate


class PdfTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PdfTemplate
        fields = '__all__'
        read_only_fields = ["published_at", "updated_at", "created_at"]
    
    def validate(self, attrs):
        instance = getattr(self, "instance", None)
        if instance and instance.status == PdfTemplate.Status.PUBLISHED:
            raise serializers.ValidationError(
                "Published templates are immutable. Create a new version instead."
            )
        return attrs
