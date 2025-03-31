from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    def email_validator(self, email):
        try:
            validate_email(email)
            return True
        except ValidationError:
            raise ValueError(_("Die Email ist nicht gültig!"))
        
    def create_user(
        self, username, first_name, last_name, password, email=None, **extra_fields
    ):
        if not username:
            raise ValueError(_("Benutzer müssen einen Benutzernamen haben!"))
        if not first_name:
            raise ValueError(_("Benutzer müssen einen Vornamen haben!"))
        if not last_name:
            raise ValueError(_("Benutzer müssen einen Nachnamen haben!"))
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        

        user = self.model(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            **extra_fields,
        )
        user.set_password(password)

        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_verwaltung", False)
        extra_fields.setdefault("is_superuser", False)

        user.save(using=self._db)
        return user

    def create_superuser(
        self, username, first_name, last_name, password, email=None, **extra_fields
    ):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_verwaltung", True)
        extra_fields.setdefault("is_active", True)

        if not username:
            raise ValueError(_("Superuser müssen einen Benutzernamen haben!"))

        if extra_fields.get("is_verwaltung") is not True:
            raise ValueError(_("Superuser müssen is_verwaltung=True haben!"))

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser müssen is_staff=True haben!"))

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser müssen is_superuser=True haben!"))

        if not password:
            raise ValueError(_("Superuser müssen ein Passwort haben!"))
        
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)


        user = self.create_user(
            username, first_name, last_name, password, email, **extra_fields
        )
        user.save(using=self._db)
        return user