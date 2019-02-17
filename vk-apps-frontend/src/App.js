import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

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
import LessonCreate from 'vk-apps-frontend/views/LessonCreate';
import LessonEdit from 'vk-apps-frontend/views/LessonEdit';
import UserVacancies from 'vk-apps-frontend/views/UserVacancies';
import VacancyEdit from 'vk-apps-frontend/views/VacancyEdit';
import OutgoingStudentRequests from 'vk-apps-frontend/views/OutgoingStudentRequests';
import Tutors from 'vk-apps-frontend/views/Tutors';
import Students from 'vk-apps-frontend/views/Students';

import { appsActions } from 'vk-apps-frontend/actions/vk';
import { currentUserActions } from 'vk-apps-frontend/actions';
import { vkAppsUsersActions, notificationsActions } from 'vk-apps-frontend/actions/api';

import withTabbar from 'vk-apps-frontend/components/withTabbar';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import PopoutDiv from 'vk-apps-frontend/components/PopoutDiv';

const mapStateToProps = state => {
  const fetching = state.apiReducer.vkAppsUsersReducer.fetching || state.vkReducer.appsUserReducer.fetching;
  const { vkUserInfo } = state.vkReducer.appsUserReducer;
  const { user, vkId } = state.currentUserReducer;
  const { unreadNotificationsCount } = state.apiReducer.notificationsReducer;
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
    this.getUnreadNotificationsListWithInterval = this.getUnreadNotificationsListWithInterval.bind(this);
  }

  componentDidMount() {
    this.props.init();
    this.props.fetchCurrentUserInfo();
    this.getUnreadNotificationsListWithInterval();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.vkUserInfo !== prevProps.vkUserInfo) {
      const { id } = this.props.vkUserInfo;
      const response = await this.props.getVkAppsUser(id);
      console.log(response);
      if (response.status === 200) {
        const { user, vk_id } = response.data;
        this.props.saveCurrentUserData(user, vk_id);
      }
    }
  }

  getUnreadNotificationsListWithInterval() {
    setInterval(() => {
      this.props.getUnreadNotificationsList();
    }, 15000);
  }

  render() {
    const { user, unreadNotificationsCount } = this.props;
    const popout = this.props.fetching && (
      <PopoutWrapper>
        <PopoutDiv>
          <Div>
            Инициализация сервиса.
          </Div>
          <Div>
            Соединение с клиентским приложением VK...
          </Div>
          <DivSpinner />
        </PopoutDiv>
      </PopoutWrapper>
    );

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            { user ? (
              <Redirect to={`/user/${user.id}`} />
            ) : (
              <Redirect to="/home" />
            )}
          </Route>

          <Route
            path="/home"
            render={routerProps => (
              !user ? (
                <Home {...routerProps} />
              ) : (
                <Redirect to={`/user/${user.id}`} />
              )
            )}
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

          <Route
            path="/lesson_create"
            component={
              withTabbar(
                LessonCreate,
                user ? user.id : null,
                unreadNotificationsCount,
                "lesson_create",
                popout
              )
            }
          />

          <Route
            path="/lesson_edit/:id"
            component={
              withTabbar(
                LessonEdit,
                user ? user.id : null,
                unreadNotificationsCount,
                "lesson_edit",
                popout
              )
            }
          />

          <Route
            path="/user_vacancies"
            component={
              withTabbar(
                UserVacancies,
                user ? user.id : null,
                unreadNotificationsCount,
                "user_vacancies",
                popout
              )
            }
          />

          <Route
            path="/vacancy_edit/:id"
            component={
              withTabbar(
                VacancyEdit,
                user ? user.id : null,
                unreadNotificationsCount,
                "vacancy_edit",
                popout
              )
            }
          />

          <Route
            path="/outgoing_student_requests"
            component={
              withTabbar(
                OutgoingStudentRequests,
                user ? user.id : null,
                unreadNotificationsCount,
                "outgoing_student_requests",
                popout
              )
            }
          />

          <Route
            path="/tutors"
            component={
              withTabbar(
                Tutors,
                user ? user.id : null,
                unreadNotificationsCount,
                "tutors",
                popout
              )
            }
          />

          <Route
            path="/students"
            component={
              withTabbar(
                Students,
                user ? user.id : null,
                unreadNotificationsCount,
                "students",
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