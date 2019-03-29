import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Notification from '@vkontakte/icons/dist/28/notification';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';

import { notificationsActions } from 'vk-apps-frontend/actions/api';

const mapDispatchToProps = dispatch => {
  return {
    getUnreadNotificationsList: bindActionCreators(notificationsActions.getUnreadNotificationsList, dispatch),
  }
};

class MyTabbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadNotificationsCount: 0,
    };
    this._isMounted = false;
    this.notificationsInterval = null;
  }

  componentDidMount() {
    this._isMounted = true;
    this.getUnreadNotificationsListWithInterval.call(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.notificationsInterval);
  }

  async fetchUnreadNotificationsCount() {
    const unreadNotificationsListResponse = await this.props.getUnreadNotificationsList();
    const unreadNotificationsCount = unreadNotificationsListResponse.status === 200
      && unreadNotificationsListResponse.data.count;
    this._isMounted && this.setState({
      unreadNotificationsCount
    });
  }

  getUnreadNotificationsListWithInterval(interval = 60000) {
    this.fetchUnreadNotificationsCount.call(this);
    this.notificationsInterval = setInterval(() => {
      this.fetchUnreadNotificationsCount.call(this);
    }, interval);
  }

  render() {
    const { location, currentUserId, history } = this.props;
    const { unreadNotificationsCount } = this.state;

    const hidden = !([
      `/user/${currentUserId}`,
      '/vacancies',
      '/schedule',
      '/notifications',
      '/main_menu',
    ].includes(location.pathname));

    return (
      !hidden && (
        <Tabbar>
          <TabbarItem
            selected={location.pathname === `/user/${currentUserId}`}
            onClick={() => history.replace(`/user/${currentUserId}`)}
          >
            <Icon28User/>
          </TabbarItem>

          <TabbarItem
            selected={location.pathname === '/vacancies'}
            onClick={() => history.replace('/vacancies')}
          >
            <Icon28Search/>
          </TabbarItem>

          <TabbarItem
            selected={location.pathname === '/schedule'}
            onClick={() => history.replace('/schedule')}
          >
            <Icon28Newsfeed/>
          </TabbarItem>

          <TabbarItem
            selected={location.pathname === '/notifications'}
            label={unreadNotificationsCount ? unreadNotificationsCount : null}
            onClick={() => history.replace('/notifications')}
          >
            <Icon28Notification/>
          </TabbarItem>

          <TabbarItem
            selected={location.pathname === '/main_menu'}
            onClick={() => history.replace('/main_menu')}
          >
            <Icon28Menu/>
          </TabbarItem>
        </Tabbar>
      )
    );
  }
}

export default connect(null, mapDispatchToProps)(MyTabbar);