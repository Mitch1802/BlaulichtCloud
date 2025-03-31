import pytest
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from core_apps.users.serializers import UserSerializer, CustomRegisterSerializer

User = get_user_model()


@pytest.mark.django_db
def test_user_serializer(normal_user):
    serializer = UserSerializer(normal_user)
    assert "id" in serializer.data
    assert "username" in serializer.data
    assert "first_name" in serializer.data
    assert "last_name" in serializer.data
    assert "email" in serializer.data


@pytest.mark.django_db
def test_to_representation_normal_user(normal_user):
    serializer = UserSerializer(normal_user)
    serialized_data = serializer.data
    assert "admin" not in serialized_data


@pytest.mark.django_db
def test_to_representation_super_user(super_user):
    serializer = UserSerializer(super_user)
    serialized_data = serializer.data
    assert "admin" in serialized_data
    assert serialized_data["admin"] is True


@pytest.mark.django_db
def test_custom_register_serializer(mock_request):
    valid_data = {
        "username": "test",
        "first_name": "John",
        "last_name": "Doe",
        "email": "test@example.com",
        "password1": "test_password",
        "password2": "test_password",
    }
    serializer = CustomRegisterSerializer(data=valid_data)
    assert serializer.is_valid()

    user = serializer.save(mock_request)
    assert user.username == valid_data["username"]
    assert user.first_name == valid_data["first_name"]
    assert user.last_name == valid_data["last_name"]
    assert user.email == valid_data["email"]

    invalid_data = {
        "username": "test",
        "first_name": "John",
        "last_name": "Doe",
        "email": "",
        "password1": "test_password",
        "password2": "wrong_password",
    }

    serializer = CustomRegisterSerializer(data=invalid_data)
    with pytest.raises(ValidationError):
        serializer.is_valid(raise_exception=True)