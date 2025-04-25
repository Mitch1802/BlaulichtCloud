from rest_framework.permissions import BasePermission

class HasAnyRolePermission(BasePermission):
    """
    Erlaubt Zugriff, wenn der Benutzer mindestens eine der angegebenen Rollen hat.
    Verwendung: HasAnyRolePermission.with_roles("ADMIN", "FMD")
    """

    def __init__(self, *roles):
        self.allowed_roles = roles

    def has_permission(self, request, view):
        user = request.user
        return (
            user.is_authenticated
            and hasattr(user, "has_any_role")
            and user.has_any_role(*self.allowed_roles)
        )

    @classmethod
    def with_roles(cls, *roles):
        return type(
            f"HasAnyRole_{'_'.join(roles)}_Permission",
            (cls,),
            {"__init__": lambda self: super(cls, self).__init__(*roles)},
        )


class IsAdminPermission(HasAnyRolePermission.with_roles("ADMIN")):
    """
    Spezielle Permission für ADMIN User. Nur für Settings oder globalen Einsatz gedacht.
    """
    pass