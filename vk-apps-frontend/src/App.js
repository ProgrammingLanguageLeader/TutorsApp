import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import axios from 'axios';

import '@vkontakte/vkui/dist/vkui.css';
import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

import Home from 'vk-apps-frontend/views/Home';
import User from 'vk-apps-frontend/views/User';
import Vacancies from 'vk-apps-frontend/views/Vacancies';
import CreateVacancy from 'vk-apps-frontend/views/VacancyCreate';
import UserEdit from 'vk-apps-frontend/views/UserEdit';
import Schedule from 'vk-apps-frontend/views/Schedule';
import Filter from 'vk-apps-frontend/views/Filter';
import Notifications from 'vk-apps-frontend/views/Notifications';
import Vacancy from 'vk-apps-frontend/views/Vacancy';
import MainMenu from 'vk-apps-frontend/views/MainMenu';
import StudentRequest from 'vk-apps-frontend/views/StudentRequest';
import Lesson from 'vk-apps-frontend/views/Lesson';
import MoneyTransfer from 'vk-apps-frontend/views/MoneyTransfer';

import { appsActions } from 'vk-apps-frontend/actions/vk';
import { currentUserActions } from 'vk-apps-frontend/actions';
import { vkAppsUsersActions, notificationsActions, usersActions } from 'vk-apps-frontend/actions/api';

import withTabbar from 'vk-apps-frontend/components/withTabbar';
import PopoutDiv from 'vk-apps-frontend/components/PopoutDiv';

const mapStateToProps = state => {
  const { accessToken } = state.vkReducer.appsTokenReducer;
  const { vkUserInfo } = state.vkReducer.appsUserReducer;
  const fetching = state.apiReducer.vkAppsUsersReducer.fetching
    || state.vkReducer.appsUserReducer.fetching
    || state.vkReducer.appsTokenReducer.fetching;
  const { vkAppsUsersReducer } = state.apiReducer;
  const { currentUserReducer } = state;
  const { unreadNotificationsCount } = state.apiReducer.notificationsReducer;
  return {
    accessToken,
    fetching,
    vkUserInfo,
    vkAppsUsersReducer,
    currentUserReducer,
    unreadNotificationsCount,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: bindActionCreators(appsActions.init, dispatch),
    fetchCurrentUserInfo: bindActionCreators(appsActions.fetchCurrentUserInfo, dispatch),
    fetchAccessToken: bindActionCreators(appsActions.fetchAccessToken, dispatch),
    getVkAppsUser: bindActionCreators(vkAppsUsersActions.getVkAppsUser, dispatch),
    createVkAppsUser: bindActionCreators(vkAppsUsersActions.createVkAppsUser, dispatch),
    updateUser: bindActionCreators(usersActions.updateUser, dispatch),
    uploadAvatar: bindActionCreators(usersActions.uploadAvatar, dispatch),
    saveCurrentUserData: bindActionCreators(currentUserActions.currentUserSaveData, dispatch),
    getUnreadNotificationsList: bindActionCreators(notificationsActions.getUnreadNotificationsList, dispatch),
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initVkApps = this.initVkApps.bind(this);
    this.getUnreadNotificationsListWithInterval = this.getUnreadNotificationsListWithInterval.bind(this);
    this.createUser = this.createUser.bind(this);
    this.uploadAvatarFromVK = this.uploadAvatarFromVK.bind(this);
    this.updateUserFromVK = this.updateUserFromVK.bind(this);
  }

  async createUser() {
    await this.props.createVkAppsUser();
    const { id } = this.props.vkAppsUsersReducer.user;
    Promise.all([
      this.updateUserFromVK(id),
      this.uploadAvatarFromVK(id)
    ]);
  }

  async updateUserFromVK(id) {
    const { first_name, last_name, city } = this.props.vkUserInfo;
    await this.props.updateUser(id, {
      first_name,
      last_name,
      city: city ? city.title : null,
    });
  }

  async uploadAvatarFromVK(id) {
    const { photo_200 } = this.props.vkUserInfo;
    const response = await axios({
      url: photo_200,
      method: 'GET',
      responseType: 'blob',
    });
    const avatar = new File(
      [response.data],
      "uploaded_file.jpg",
      {
        type: "image/jpeg",
        lastModified: Date.now()
      }
    );
    await this.props.uploadAvatar(id, {
      avatar,
    });
  }

  async componentDidMount() {
    await this.initVkApps();

    const { id } = this.props.vkUserInfo;
    await this.props.getVkAppsUser(id);
    if (!this.props.vkAppsUsersReducer.user) {
      await this.createUser();
    }
    const { user, vkId } = this.props.vkAppsUsersReducer;
    this.props.saveCurrentUserData(user, vkId);

    await this.props.getUnreadNotificationsList();
    this.getUnreadNotificationsListWithInterval();
  }

  getUnreadNotificationsListWithInterval() {
    setInterval(() => {
      this.props.getUnreadNotificationsList();
    }, 15000);
  }

  async initVkApps() {
    await this.props.init();
    await this.props.fetchCurrentUserInfo();
    await this.props.fetchAccessToken();
  }

  render() {
    const { user } = this.props.currentUserReducer;
    const { unreadNotificationsCount } = this.props;
    const popout =
      this.props.fetching && (
        <ScreenSpinner/>
      )
      || !this.props.accessToken && (
        <PopoutWrapper>
          <PopoutDiv>
            <Div>
              Пожалуйста, примите запрос на права доступа. Это необходимо для работы приложения
            </Div>
            <Button onClick={this.initVkApps}>
              Авторизоваться в приложении
            </Button>
          </PopoutDiv>
        </PopoutWrapper>
      )
      || !user && (
        <PopoutWrapper>
          <PopoutDiv>
            <Div>
              Соединение прервано
            </Div>
            <Button onClick={() => window.location.reload()}>
              Попробовать снова
            </Button>
          </PopoutDiv>
        </PopoutWrapper>
      );

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route
            path="/home"
            component={
              withTabbar(
                Home,
                user ? user.id : null,
                unreadNotificationsCount,
                "home",
                popout,
                "white",
                true
              )
            }
          />

          <Route
            path="/user/:id"
            component={
              withTabbar(
                User,
                user ? user.id : null,
                unreadNotificationsCount,
                "user",
                popout
              )
            }
          />

          <Route
            path="/vacancies"
            component={
              withTabbar(
                Vacancies,
                user ? user.id : null,
                unreadNotificationsCount,
                "vacancies",
                popout
              )
            }
          />

          <Route
            path="/vacancy_create"
            component={
              withTabbar(
                CreateVacancy,
                user ? user.id : null,
                unreadNotificationsCount,
                "vacancy_create",
                popout
              )
            }
          />

          <Route
            path="/user_edit"
            component={
              withTabbar(
                UserEdit,
                user ? user.id : null,
                unreadNotificationsCount,
                "user_edit",
                popout
              )
            }
          />

          <Route
            path="/schedule"
            component={
              withTabbar(
                Schedule,
                user ? user.id : null,
                unreadNotificationsCount,
                "schedule",
                popout
              )
            }
          />

          <Route
            path="/vacancies_filter"
            component={
              withTabbar(
                Filter,
                user ? user.id : null,
                unreadNotificationsCount,
                "vacancies_filter",
                popout
              )
            }
          />

          <Route
            path="/notifications"
            component={
              withTabbar(
                Notifications,
                user ? user.id : null,
                unreadNotificationsCount,
                "notifications",
                popout
              )
            }
          />

          <Route
            path="/vacancy/:id"
            component={
              withTabbar(
                Vacancy,
                user ? user.id : null,
                unreadNotificationsCount,
                "vacancy",
                popout
              )
            }
          />

          <Route
            path="/main_menu"
            component={
              withTabbar(
                MainMenu,
                user ? user.id : null,
                unreadNotificationsCount,
                "main_menu",
                popout
              )
            }
          />

          <Route
            path="/student_request/:id"
            component={
              withTabbar(
                StudentRequest,
                user ? user.id : null,
                unreadNotificationsCount,
                "student_request",
                popout
              )
            }
          />

          <Route
            path="/lesson/:id"
            component={
              withTabbar(
                Lesson,
                user ? user.id : null,
                unreadNotificationsCount,
                "lesson",
                popout
              )
            }
          />

          <Route
            path="/money_transfer"
            component={
              withTabbar(
                MoneyTransfer,
                user ? user.id : null,
                unreadNotificationsCount,
                "money_transfer",
                popout
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);