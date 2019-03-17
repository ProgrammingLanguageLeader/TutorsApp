import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Notification from '@vkontakte/icons/dist/28/notification';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';

import TabbarLink from 'vk-apps-frontend/components/TabbarLink';

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
    const { location, hidden, currentUserId } = this.props;
    const { unreadNotificationsCount } = this.state;

    return (
      !hidden && (
        <Tabbar>
          <TabbarLink to={`/user/${currentUserId}`}>
            <TabbarItem selected={location.pathname.startsWith('/user')}>
              <Icon28User/>
            </TabbarItem>
          </TabbarLink>

          <TabbarLink to='/vacancies'>
            <TabbarItem
              selected={
                location.pathname.startsWith('/vacancy')
                || location.pathname.startsWith('/vacancies')
              }
            >
              <Icon28Search/>
            </TabbarItem>
          </TabbarLink>

          <TabbarLink to='/schedule'>
            <TabbarItem selected={location.pathname.startsWith('/schedule')}>
              <Icon28Newsfeed/>
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
              <Icon28Menu/>
            </TabbarItem>
          </TabbarLink>
        </Tabbar>
      )
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(MyTabbar));