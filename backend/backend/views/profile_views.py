from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from backend.models import Profile
from backend.serializers import ProfileSerializer
from backend.serializers import UpdateProfileSerializer
from backend.views.tools import check_authentication
from backend.views.tools import get_error_message_response


class CreateProfileView(APIView):
    @check_authentication
    def post(self, request):
        request.data['profile_id'] = request.data['user_id']
        view_serializer = ProfileSerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        view_serializer.save()
        return Response(data='OK')


class UpdateProfileView(APIView):
    @check_authentication
    def post(self, request):
        view_serializer = UpdateProfileSerializer(data=request.data)
        if not view_serializer.is_valid():
            print(view_serializer.errors)
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        try:
            profile = Profile.objects.get(
                pk=request.data['user_id']
            )
            for (key, value) in view_serializer.validated_data.items():
                setattr(profile, key, value)
            profile.save()
        except Profile.DoesNotExist:
            return get_error_message_response('user_id')
        return Response(data='OK')


class GetProfileView(APIView):
    @check_authentication
    def get(self, request):
        profile_id = self.request.query_params.get('profile_id')
        try:
            profile = Profile.objects.get(pk=profile_id)
            profile_serializer = ProfileSerializer(profile)
            return Response(data=profile_serializer.data)
        except Profile.DoesNotExist:
            return get_error_message_response('user_id')


class DeactivateProfileView(APIView):
    @check_authentication
    def post(self, request):
        try:
            user_id = request.data['user_id']
            profile = Profile.objects.get(pk=user_id)
        except Profile.DoesNotExist:
            return get_error_message_response('user_id')
        profile.is_active = False
        profile.save()
        return Response(data='OK')
