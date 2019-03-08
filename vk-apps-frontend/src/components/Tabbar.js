import React from 'react';
import { withRouter } from 'react-router-dom';

import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Notification from '@vkontakte/icons/dist/28/notification';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';

import TabbarLink from 'vk-apps-frontend/components/TabbarLink';

const MyTabbar = ({ location, hidden, currentUserId, unreadNotificationsCount = 0 }) => (
  !hidden && (
    <Tabbar>
      <TabbarLink to={`/user/${currentUserId}`}>
        <TabbarItem selected={location.pathname.startsWith('/user')}>
          <Icon28User />
        </TabbarItem>
      </TabbarLink>

      <TabbarLink to='/vacancies'>
        <TabbarItem
          selected={
            location.pathname.startsWith('/vacancy')
            || location.pathname.startsWith('/vacancies')
          }
        >
          <Icon28Search />
        </TabbarItem>
      </TabbarLink>

      <TabbarLink to='/schedule'>
        <TabbarItem selected={location.pathname.startsWith('/schedule')}>
          <Icon28Newsfeed />
        </TabbarItem>
      </TabbarLink>

      <TabbarLink to='/notifications'>
        <TabbarItem
          selected={location.pathname.startsWith('/notifications')}
          label={unreadNotificationsCount ? unreadNotificationsCount : null}
        >
          <Icon28Notification/>
        </TabbarItem>
      </TabbarLink>

      <TabbarLink to='/main_menu'>
        <TabbarItem selected={location.pathname.startsWith('/main_menu')}>
          <Icon28Menu />
        </TabbarItem>
      </TabbarLink>
    </Tabbar>
  )
);

export default withRouter(MyTabbar);