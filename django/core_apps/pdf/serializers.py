from rest_framework import serializers

from .models import PdfTemplate


class PdfTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PdfTemplate
        fields = "__all__"
        read_only_fields = ["published_at", "updated_at", "created_at"]

    def validate(self, attrs):
        instance = getattr(self, "instance", None)

        # Update: nur DRAFT editierbar
        if instance and instance.status in (PdfTemplate.Status.PUBLISHED, PdfTemplate.Status.ARCHIVED):
            raise serializers.ValidationError("Only DRAFT templates can be modified. Create a new version instead.")

        # Update: Status darf nicht geändert werden (Publish nur über Endpoint)
        if instance and "status" in attrs and attrs["status"] != instance.status:
            raise serializers.ValidationError("Status can only be changed via publish/new-version endpoints.")

        return attrs


