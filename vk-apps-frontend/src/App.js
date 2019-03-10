import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history';

import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';

import Routes from 'vk-apps-frontend/Routes';

import { appsActions } from 'vk-apps-frontend/actions/vk';
import { currentUserActions } from 'vk-apps-frontend/actions';
import { vkAppsUsersActions, notificationsActions } from 'vk-apps-frontend/actions/api';

import Tabbar from 'vk-apps-frontend/components/Tabbar';

const mapStateToProps = state => {
  const { vkUserInfo } = state.VK.appsUser;
  const { user, vkId } = state.currentUser;
  const { unreadNotificationsCount } = state.API.notificationsReducer;
  return {
    vkUserInfo,
    user,
    vkId,
    unreadNotificationsCount,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: bindActionCreators(appsActions.init, dispatch),
    fetchCurrentUserInfo: bindActionCreators(appsActions.fetchCurrentUserInfo, dispatch),
    getVkAppsUser: bindActionCreators(vkAppsUsersActions.getVkAppsUser, dispatch),
    saveCurrentUserData: bindActionCreators(currentUserActions.currentUserSaveData, dispatch),
    getUnreadNotificationsList: bindActionCreators(notificationsActions.getUnreadNotificationsList, dispatch),
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
    };
    this.getUnreadNotificationsListWithInterval = this.getUnreadNotificationsListWithInterval.bind(this);
    this.history = createHashHistory({
      hashType: 'slash'
    });
  }

  componentDidMount() {
    this.props.init();
    this.props.fetchCurrentUserInfo();
    this.getUnreadNotificationsListWithInterval();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.vkUserInfo !== prevProps.vkUserInfo) {
      this.setState({
        fetching: true,
      });
      const { id } = this.props.vkUserInfo;
      const response = await this.props.getVkAppsUser(id);
      if (response.status === 200) {
        const { user, vk_id } = response.data;
        this.props.saveCurrentUserData(user, vk_id);
      }
      this.setState({
        fetching: false,
      });
    }
  }

  getUnreadNotificationsListWithInterval(interval = 30000) {
    this.props.getUnreadNotificationsList();
    setInterval(() => {
      this.props.getUnreadNotificationsList();
    }, interval);
  }

  render() {
    const { user, unreadNotificationsCount } = this.props;
    const { fetching } = this.state;

    return (
      <Router history={this.history}>
        <Epic activeStory="routes" tabbar={
          <Tabbar
            hidden={!user}
            currentUserId={user && user.id}
            unreadNotificationsCount={unreadNotificationsCount}
          />
        }>
          <Routes
            id="routes"
            fetching={fetching}
            currentUser={user}
          />
        </Epic>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);