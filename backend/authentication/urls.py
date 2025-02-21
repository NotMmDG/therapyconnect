from django.urls import path
from .views import SignupView, LoginView, LogoutView, GoogleLoginView, profile_view

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("google/", GoogleLoginView.as_view(), name="google-login"),
    path("profile/", profile_view, name="profile"),
]
