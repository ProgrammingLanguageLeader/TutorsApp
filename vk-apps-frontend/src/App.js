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
  const { vkUserInfo, fetching } = state.VK.appsUserReducer;
  const { user, vkId } = state.currentUser;
  const { unreadNotificationsCount } = state.API.notificationsReducer;
  return {
    fetching,
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
      historyLocalLength: 1,
      isUserRegistered: true,
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

    this.history.listen((location, action) => {
      let newHistoryLocalLength = this.state.historyLocalLength;
      if (action === 'POP') {
        newHistoryLocalLength--;
      } else {
        newHistoryLocalLength++;
      }
      this.setState({
        historyLocalLength: newHistoryLocalLength
      });
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.vkUserInfo !== prevProps.vkUserInfo) {
      const { id } = this.props.vkUserInfo;
      const response = await this.props.getVkAppsUser(id);
      if (response.status === 200) {
        const { user, vk_id } = response.data;
        this.props.saveCurrentUserData(user, vk_id);
        this.setState({
          isUserRegistered: true
        });
      }
      else {
        this.setState({
          isUserRegistered: false
        });
      }
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
    const { isUserRegistered } = this.state;

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
            isUserRegistered={isUserRegistered}
            currentUser={user}
          />
        </Epic>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);