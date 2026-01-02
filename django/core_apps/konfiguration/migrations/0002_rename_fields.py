from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        ("konfiguration", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="konfiguration",
            old_name="ort",
            new_name="fw_ort",
        ),
        migrations.RenameField(
            model_name="konfiguration",
            old_name="plz",
            new_name="fw_plz",
        ),
    ]
