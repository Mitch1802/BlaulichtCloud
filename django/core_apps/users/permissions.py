from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Erlaubt SAFE_METHODS für alle, Schreib‑Operationen aber nur Benutzern mit der ADMIN‑Rolle.
    """
    def has_permission(self, request, view):
        # Alle „safe“ Methoden (GET, HEAD, OPTIONS) sind frei
        if request.method in permissions.SAFE_METHODS:
            return True

        # Schreibzugriff nur für eingeloggte Admins
        user = request.user
        return bool(
            user.is_authenticated and
            user.roles.filter(key="ADMIN").exists()
        )
