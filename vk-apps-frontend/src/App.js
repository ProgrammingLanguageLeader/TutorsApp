import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import '@vkontakte/vkui/dist/vkui.css';
import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

import withTabbar from 'vk-apps-frontend/views/withTabbar';
import Home from 'vk-apps-frontend/views/Home';
import User from 'vk-apps-frontend/views/User';
import Vacancies from 'vk-apps-frontend/views/Vacancies';
import CreateVacancy from 'vk-apps-frontend/views/VacancyCreate';
import UserEdit from 'vk-apps-frontend/views/UserEdit';
import Schedule from 'vk-apps-frontend/views/Schedule';
import Filter from 'vk-apps-frontend/views/Filter';
import Notifications from 'vk-apps-frontend/views/Notifications';
import ShowVacancy from 'vk-apps-frontend/views/ShowVacancy';
import MainMenu from 'vk-apps-frontend/views/MainMenu';

import { appsActions } from 'vk-apps-frontend/actions/vk';
import { currentUserActions } from 'vk-apps-frontend/actions';
import { vkAppsUsersActions } from 'vk-apps-frontend/actions/api';

import PopoutDiv from 'vk-apps-frontend/components/PopoutDiv';
import Tabbar from 'vk-apps-frontend/components/Tabbar';

const mapStateToProps = state => {
  const { accessToken } = state.vkReducer.appsTokenReducer;
  const { vkUserInfo } = state.vkReducer.appsUserReducer;
  const fetching = state.apiReducer.vkAppsUsersReducer.fetching
    || state.vkReducer.appsUserReducer.fetching
    || state.vkReducer.appsTokenReducer.fetching;
  const { vkAppsUsersReducer } = state.apiReducer;
  const { currentUserReducer } = state;
  return {
    accessToken,
    fetching,
    vkUserInfo,
    vkAppsUsersReducer,
    currentUserReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: bindActionCreators(appsActions.init, dispatch),
    fetchCurrentUserInfo: bindActionCreators(appsActions.fetchCurrentUserInfo, dispatch),
    fetchAccessToken: bindActionCreators(appsActions.fetchAccessToken, dispatch),
    getVkAppsUser: bindActionCreators(vkAppsUsersActions.getVkAppsUser, dispatch),
    createVkAppsUser: bindActionCreators(vkAppsUsersActions.createVkAppsUser, dispatch),
    saveCurrentUserData: bindActionCreators(currentUserActions.currentUserSaveData, dispatch),
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initVkApps = this.initVkApps.bind(this);
  }

  async componentDidMount() {
    await this.initVkApps();

    const { id } = this.props.vkUserInfo;
    await this.props.getVkAppsUser(id);
    if (!this.props.vkAppsUsersReducer.user) {
      await this.props.createVkAppsUser();
    }
    else {
      const { user, vkId } = this.props.vkAppsUsersReducer;
      this.props.saveCurrentUserData(user, vkId);
    }
  }

  async initVkApps() {
    await this.props.init();
    await this.props.fetchCurrentUserInfo();
    await this.props.fetchAccessToken();
  }

  render() {
    const popout = this.props.fetching
      ? <ScreenSpinner/>
      : this.props.accessToken
        ? null
        : (
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
        );
    const { user } = this.props.currentUserReducer;

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/home" component={
            withTabbar(
              Home,
              <Tabbar userId={user ? user.id : null} selectedItem={"home"} />,
              popout,
              "white",
              true
            )}
          />

          <Route path="/user/:id" component={
            withTabbar(
              User,
              <Tabbar userId={user ? user.id : null} selectedItem={"user"} />,
              popout
            )}
          />

          <Route path="/vacancies" component={
            withTabbar(
              Vacancies,
              <Tabbar userId={user ? user.id : null} selectedItem={"vacancies"} />,
              popout
            )}
          />

          <Route path="/vacancy_create" component={
            withTabbar(
              CreateVacancy,
              <Tabbar userId={user ? user.id : null} selectedItem={"vacancy_create"} />,
              popout
            )}
          />

          <Route path="/user_edit" component={
            withTabbar(
              UserEdit,
              <Tabbar userId={user ? user.id : null} selectedItem={"user_edit"} />,
              popout
            )}
          />

          <Route path="/schedule" component={
            withTabbar(
              Schedule,
              <Tabbar userId={user ? user.id : null} selectedItem={"schedule"} />,
              popout
            )}
          />

          <Route path="/vacancies_filter" component={
            withTabbar(
              Filter,
              <Tabbar userId={user ? user.id : null} selectedItem={"vacancies_filter"} />,
              popout
            )}
          />

          <Route path="/notifications" component={
            withTabbar(
              Notifications,
              <Tabbar userId={user ? user.id : null} selectedItem={"notifications"} />,
              popout
            )}
          />

          <Route path="/vacancy/:id" component={
            withTabbar(
              ShowVacancy,
              <Tabbar userId={user ? user.id : null} selectedItem={"vacancy"} />,
              popout
            )}
          />

          <Route path="/main_menu" component={
            withTabbar(
              MainMenu,
              <Tabbar userId={user ? user.id : null} selectedItem={"main_menu"} />,
              popout
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
