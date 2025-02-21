from rest_framework.response import Response
from rest_framework.views import APIView
from social_django.utils import psa

class GoogleLogin(APIView):
    @psa('social:complete')
    def post(self, request, *args, **kwargs):
        token = request.data.get("token")
        user = request.backend.do_auth(token)
        if user:
            return Response({"message": "Google login successful", "user": user.email})
        return Response({"error": "Invalid token"}, status=400)

class AppleLogin(APIView):
    @psa('social:complete')
    def post(self, request, *args, **kwargs):
        token = request.data.get("token")
        user = request.backend.do_auth(token)
        if user:
            return Response({"message": "Apple login successful", "user": user.email})
        return Response({"error": "Invalid token"}, status=400)
