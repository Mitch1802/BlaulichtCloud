import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
def test_create_normal_user(normal_user):
    assert normal_user.first_name is not None
    assert normal_user.last_name is not None
    assert normal_user.username is not None
    assert normal_user.email is not None
    assert normal_user.password is not None
    assert normal_user.pkid is not None
    assert not normal_user.is_staff
    assert not normal_user.is_superuser
    assert normal_user.is_active


@pytest.mark.django_db
def test_create_superuser(super_user):
    assert super_user.first_name is not None
    assert super_user.last_name is not None
    assert super_user.username is not None
    assert super_user.email is not None
    assert super_user.password is not None
    assert super_user.pkid is not None
    assert super_user.is_staff
    assert super_user.is_superuser
    assert super_user.is_active


@pytest.mark.django_db
def test_get_full_name(normal_user):
    full_name = normal_user.get_full_name
    expected_full_name = (
        f"{normal_user.first_name.title()} {normal_user.last_name.title()}"
    )
    assert full_name == expected_full_name


@pytest.mark.django_db
def test_get_short_name(normal_user):
    short_name = normal_user.get_short_name
    assert short_name == normal_user.first_name


@pytest.mark.django_db
def test_update_user(normal_user):
    new_first_name = "Max"
    new_last_name = "Muster"
    normal_user.first_name = new_first_name
    normal_user.last_name = new_last_name
    normal_user.save()

    updated_user = User.objects.get(pk=normal_user.pk)
    assert updated_user.first_name == new_first_name
    assert updated_user.last_name == new_last_name


@pytest.mark.django_db
def test_delete_user(normal_user):
    user_pk = normal_user.pk
    normal_user.delete()

    with pytest.raises(User.DoesNotExist):
        User.objects.get(pk=user_pk)


@pytest.mark.django_db
def test_user_str(normal_user):
    assert str(normal_user) == f"{normal_user.first_name}"


@pytest.mark.django_db
def test_normal_user_email_is_normalized(normal_user):
    email = normal_user.email
    assert email == email.lower()


@pytest.mark.django_db
def test_super_user_email_is_normalized(super_user):
    email = super_user.email
    assert email == email.lower()


@pytest.mark.django_db
def test_user_email_incorrect(user_factory):
    with pytest.raises(ValueError) as err:
        user_factory.create(email="muster.com")
    assert str(err.value) == "Die Email ist nicht gültig."


@pytest.mark.django_db
def test_create_user_with_no_firstname(user_factory):
    with pytest.raises(ValueError) as err:
        user_factory.create(first_name=None)
    assert str(err.value) == "Benutzer müssen einen Vorname haben."


@pytest.mark.django_db
def test_create_user_with_no_lastname(user_factory):
    with pytest.raises(ValueError) as err:
        user_factory.create(last_name=None)
    assert str(err.value) == "Benutzer müssen einen Nachname haben."


@pytest.mark.django_db
def test_create_user_with_no_username(user_factory):
    with pytest.raises(ValueError) as err:
        user_factory.create(username=None)
    assert str(err.value) == "Benutzer müssen einen Benutzernamen haben."


@pytest.mark.django_db
def test_create_superuser_with_no_username(user_factory):
    with pytest.raises(ValueError) as err:
        user_factory.create(username=None, is_superuser=True, is_staff=True)
    assert str(err.value) == "Superuser müssen einen Benutzernamen haben."


@pytest.mark.django_db
def test_create_superuser_with_no_password(user_factory):
    with pytest.raises(ValueError) as err:
        user_factory.create(password=None, is_superuser=True, is_staff=True)
    assert str(err.value) == "Superuser müssen ein Passwort haben."


@pytest.mark.django_db
def test_super_user_is_not_staff(user_factory):
    with pytest.raises(ValueError) as err:
        user_factory.create(is_superuser=True, is_staff=False)
    assert str(err.value) == "Superuser müssen is_staff=True haben."


@pytest.mark.django_db
def test_super_user_is_not_superuser(user_factory):
    with pytest.raises(ValueError) as err:
        user_factory.create(is_superuser=False, is_staff=True)
    assert str(err.value) == "Superuser müssen is_superuser=True haben."