import React from 'react';
import { Link } from 'react-router-dom';

import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Notification from '@vkontakte/icons/dist/28/notification';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';

export default ({
  userId,
  selectedItem,
  notificationsCount = 0
}) => (
  <Tabbar>
    <TabbarItem selected={selectedItem === 'user'}>
      <Link to={`/user/${userId}/`}>
        <Icon28User />
      </Link>
    </TabbarItem>

    <TabbarItem selected={selectedItem === 'vacancies'}>
      <Link to='/vacancies'>
        <Icon28Search />
      </Link>
    </TabbarItem>

    <TabbarItem selected={selectedItem === 'schedule'}>
      <Link to='/schedule'>
        <Icon28Newsfeed />
      </Link>
    </TabbarItem>

    <TabbarItem selected={selectedItem === 'notifications'} label={notificationsCount ? notificationsCount : null}>
      <Link to='/notifications'>
        <Icon28Notification/>
      </Link>
    </TabbarItem>

    <TabbarItem selected={selectedItem === 'main_menu'}>
      <Link to='/main_menu'>
        <Icon28Menu />
      </Link>
    </TabbarItem>
  </Tabbar>
);