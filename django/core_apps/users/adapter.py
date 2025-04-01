from allauth.account.adapter import DefaultAccountAdapter


class UserAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.is_staff = data.get('is_staff')
        user.save()
        return user
