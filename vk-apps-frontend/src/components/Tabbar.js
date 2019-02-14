import React from 'react';

import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Notification from '@vkontakte/icons/dist/28/notification';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';

import TabbarLink from 'vk-apps-frontend/components/TabbarLink';

export default ({
  userId,
  selectedItem,
  unreadNotificationsCount = 0
}) => (
  <Tabbar>
    <TabbarLink to={`/user/${userId}/`}>
      <TabbarItem selected={selectedItem === 'user'}>
        <Icon28User />
      </TabbarItem>
    </TabbarLink>

    <TabbarLink to='/vacancies'>
      <TabbarItem selected={selectedItem === 'vacancies'}>
        <Icon28Search />
      </TabbarItem>
    </TabbarLink>

    <TabbarLink to='/schedule'>
      <TabbarItem selected={selectedItem === 'schedule'}>
        <Icon28Newsfeed />
      </TabbarItem>
    </TabbarLink>

    <TabbarLink to='/notifications'>
      <TabbarItem
        selected={selectedItem === 'notifications'}
        label={unreadNotificationsCount ? unreadNotificationsCount : null}
      >
        <Icon28Notification/>
      </TabbarItem>
    </TabbarLink>

    <TabbarLink to='/main_menu'>
      <TabbarItem selected={selectedItem === 'main_menu'}>
        <Icon28Menu />
      </TabbarItem>
    </TabbarLink>
  </Tabbar>
);