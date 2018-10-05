import { response } from '@vkontakte/vkui-connect-mock';

const configureMockConnect = () => {
  response.VKWebAppGetUserInfo.data = {
    type: 'VKWebAppGetUserInfoResult',
    data: {
      id: 144736529,
      photo_100: 'https://pp.userapi.com/c840025/v840025976/76754/2XXyjhYZiXc.jpg',
      photo_200: 'https://pp.userapi.com/c840025/v840025976/76754/2XXyjhYZiXc.jpg',
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
    },
  };

  response.VKWebAppCallAPIMethod.data = {
    type: 'VKWebAppCallAPIMethodResult',
    data: {
      "id": 144736529,
      "first_name": "Dmitry",
      "last_name": "Shorokhov",
      "city": {
      "id": 1,
      "title": "Moscow"
      },
      "photo_100": "https://pp.userap...4H_IGgptA.jpg?ava=1",
      "photo_200": "https://pp.userap...ZJQvELh8k.jpg?ava=1",
    },
  };
};

export default configureMockConnect;