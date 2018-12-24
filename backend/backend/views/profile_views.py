from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from backend.permissions import CreateProfileFromVkAppsPermission
from backend.serializers import ProfileSerializer
from backend.serializers import UpdateProfileSerializer

from tools.errors import get_error_message_response


class CreateProfileFromVkAppsView(APIView):
    permission_classes = (CreateProfileFromVkAppsPermission, )
    authentication_classes = None

    def post(self, request):
        request.data['vk_id'] = request.data.get('vk_user_id')
        view_serializer = ProfileSerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        User.objects.create()
        view_serializer.save()
        return Response(data='OK')


class UpdateProfileView(APIView):
    def post(self, request):
        pass
        # view_serializer = UpdateProfileSerializer(data=request.data)
        # if not view_serializer.is_valid():
        #     return Response(
        #         data=view_serializer.errors,
        #         status=HTTP_400_BAD_REQUEST
        #     )
        # try:
        #     profile = Profile.objects.get(
        #         pk=request.data.get('vk_user_id')
        #     )
        #     for (key, value) in view_serializer.validated_data.items():
        #         setattr(profile, key, value)
        #     profile.save()
        # except Profile.DoesNotExist:
        #     return get_error_message_response('vk_user_id')
        # return Response(data='OK')


class GetProfileView(APIView):
    def get(self, request):
        pass
        # profile_id = self.request.query_params.get('profile_id')
        # try:
        #     profile = Profile.objects.get(pk=profile_id)
        #     profile_serializer = ProfileSerializer(profile)
        #     return Response(data=profile_serializer.data)
        # except Profile.DoesNotExist:
        #     return get_error_message_response('vk_user_id')


class DeactivateProfileView(APIView):
    def post(self, request):
        pass
        # try:
        #     vk_user_id = request.data.get('vk_user_id')
        #     profile = Profile.objects.get(pk=vk_user_id)
        # except Profile.DoesNotExist:
        #     return get_error_message_response('vk_user_id')
        # profile.is_active = False
        # profile.save()
        # return Response(data='OK')
