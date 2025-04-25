from rest_framework.permissions import BasePermission
import logging

logger = logging.getLogger(__name__)

class HasAnyRolePermission(BasePermission):
    """
    Erlaubt Zugriff, wenn der Benutzer mindestens eine der angegebenen Rollen hat.
    Verwendung: HasAnyRolePermission.with_roles("ADMIN", "FMD")
    """

    def __init__(self, *roles):
        self.allowed_roles = roles

    def has_permission(self, request, view):
        user = request.user
        allowed = getattr(self, "allowed_roles", ())
        result = (
            user.is_authenticated
            and hasattr(user, "has_any_role")
            and user.has_any_role(*allowed)
        )
        logger.debug(
            f"HasAnyRolePermission: allowed_roles={allowed}, "
            f"user.has_any_role={getattr(user, 'has_any_role', None)}, "
            f"result={result}"
        )
        return result

    @classmethod
    def with_roles(cls, *roles):
        return type(
            f"HasAnyRole_{'_'.join(roles)}_Permission",
            (cls,),
            {
                "allowed_roles": roles,
            },
        )


class IsAdminPermission(HasAnyRolePermission.with_roles("ADMIN")):
    """
    Spezielle Permission für ADMIN User. Nur für Settings oder globalen Einsatz gedacht.
    """
    pass
