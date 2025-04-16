from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _

from core_apps.users.models import User


class CustomUserManager(BaseUserManager):
    """
    Custom manager to handle user creation with role assignment.
    """
    def email_validator(self, email):
        try:
            validate_email(email)
            return True
        except ValidationError:
            raise ValueError(_("Die Email ist nicht gültig!"))
        
    def create_user(
        self,
        username,
        first_name,
        last_name,
        password,
        email=None,
        role=None,
        **extra_fields
    ):
        # Pflichtfelder prüfen
        if not username:
            raise ValueError(_("Benutzer müssen einen Benutzernamen haben!"))
        if not first_name:
            raise ValueError(_("Benutzer müssen einen Vornamen haben!"))
        if not last_name:
            raise ValueError(_("Benutzer müssen einen Nachnamen haben!"))

        # Email validieren (optional)
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)

        # Standardwerte für Flags und Rolle setzen
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("role", role or User.Role.MEMBER)

        # User-Instanz erstellen
        user = self.model(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=extra_fields.get("role"),
            **{k: v for k, v in extra_fields.items() if k not in ['role']}
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        username,
        first_name,
        last_name,
        password,
        email=None,
        **extra_fields
    ):
        # Superuser-Flags
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        # Rolle beim Superuser festlegen
        extra_fields.setdefault("role", User.Role.ADMIN)

        # Validierungen
        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser müssen is_staff=True haben!"))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser müssen is_superuser=True haben!"))
        if not password:
            raise ValueError(_("Superuser müssen ein Passwort haben!"))

        # Email validieren (optional)
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)

        # Superuser erstellen
        return self.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            email=email,
            **extra_fields
        )
