import { response } from '@vkontakte/vkui-connect-mock';

export const configureVkMockConnect = () => {
  response.VKWebAppGetUserInfo.data = {
    type: 'VKWebAppGetUserInfoResult',
    data: {
      id: 144736529,
      photo_100: 'https://pp.userapi.com/c840025/v840025976/76754/2XXyjhYZiXc.jpg',
      photo_200: 'https://pp.userapi.com/c840025/v840025976/7675c/4lZJQvELh8k.jpg',
      first_name: 'Дмитрий',
      last_name: 'Шорохов',
      sex: 0,
      city: {
        id: 1,
        title: 'Москва',
      },
      country: {
        id: 1,
        title: 'Россия'
      },
      timezone: 0
    }
  };

  response.VKWebAppCallAPIMethod.data = {
    type: 'VKWebAppCallAPIMethodResult',
    data: {
      request_id: "324nnefj",
      response: [
        {
          id: 144736529,
          first_name: "Dmitry",
          last_name: "Shorokhov",
          city: {
            id: 1,
            title: "Moscow"
          },
          photo_100: 'https://pp.userapi.com/c840025/v840025976/76754/2XXyjhYZiXc.jpg',
          photo_200: 'https://pp.userapi.com/c840025/v840025976/7675c/4lZJQvELh8k.jpg',
        }
      ]
    }
  };

  response.VKWebAppOpenPayForm.data = {
    type: 'VKWebAppOpenPayFormResult',
    data: {
      status: true,
      transaction_id: 322,
      amount: 322,
      extra: ""
    }
  };

  response.VKWebAppOpenPayForm.errorData = {
    type: 'VKWebAppOpenPayFormFailed',
    data: {
      error_type: "",
      error_data: {},
    }
  }
};
