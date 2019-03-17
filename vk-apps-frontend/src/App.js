import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';

import Entrypoint from 'vk-apps-frontend/views/Entrypoint';
import Home from 'vk-apps-frontend/views/Home';
import User from 'vk-apps-frontend/views/User';
import Vacancies from 'vk-apps-frontend/views/Vacancies';
import VacancyCreate from 'vk-apps-frontend/views/VacancyCreate';
import UserEdit from 'vk-apps-frontend/views/UserEdit';
import Schedule from 'vk-apps-frontend/views/Schedule';
import VacanciesFilter from 'vk-apps-frontend/views/VacanciesFilter';
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

import { matchView, getMatchedPath } from 'vk-apps-frontend/routes';
import history from 'vk-apps-frontend/helpers/history';
import { appsActions } from 'vk-apps-frontend/actions/vk';
import { currentUserActions } from 'vk-apps-frontend/actions';
import { vkAppsUsersActions } from 'vk-apps-frontend/actions/api';

import Tabbar from 'vk-apps-frontend/components/Tabbar';

const mapStateToProps = state => {
  const { vkUserInfo } = state.VK.appsUser;
  const { user, vkId } = state.currentUser;
  return {
    vkUserInfo,
    user,
    vkId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: bindActionCreators(appsActions.init, dispatch),
    fetchCurrentUserInfo: bindActionCreators(appsActions.fetchCurrentUserInfo, dispatch),
    getVkAppsUser: bindActionCreators(vkAppsUsersActions.getVkAppsUser, dispatch),
    saveCurrentUserData: bindActionCreators(currentUserActions.currentUserSaveData, dispatch),
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
    };
  }

  componentDidMount() {
    this.props.init();
    this.props.fetchCurrentUserInfo();
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

  render() {
    const { user } = this.props;
    const { fetching } = this.state;

    return (
      <Router history={history}>
        <Route path="/" component={props => {
          const { pathname } = props.location;
          const viewName = matchView(pathname);
          const match = getMatchedPath(pathname);

          return (
            <Epic
              activeStory={viewName}
              tabbar={
                <Tabbar hidden={!user} currentUserId={user && user.id} />
              }
            >
              <Entrypoint
                id="entrypoint"
                history={history}
                match={match}
                fetching={fetching}
                currentUser={user}
              />
              <Home id="home" history={history} match={match} />

              <User id="user" history={history} match={match} />
              <UserEdit id="user-edit" history={history} match={match} />

              <Vacancy id="vacancy" history={history} match={match} />
              <VacancyEdit id="vacancy-edit" history={history} match={match} />
              <VacancyCreate id="vacancy-create" history={history} match={match} />
              <Vacancies id="vacancies" history={history} match={match} />
              <VacanciesFilter id="vacancies-filter" history={history} match={match} />
              <UserVacancies id="user-vacancies" history={history} match={match} />

              <Schedule id="schedule" history={history} match={match} />
              <Lesson id="lesson" history={history} match={match} />
              <LessonEdit id="lesson-edit" history={history} match={match} />
              <LessonCreate id="lesson-create" history={history} match={match} />

              <Notifications id="notifications" history={history} match={match} />

              <MainMenu id="main-menu" history={history} match={match} />

              <StudentRequest id="student-request" history={history} match={match} />
              <OutgoingStudentRequests id="outgoing-student-requests" history={history} match={match} />

              <MoneyTransfer id="money-transfer" history={history} match={match} />

              <Tutors id="tutors" history={history} match={match} />
              <Students id="students" history={history} match={match} />
            </Epic>
          )
        }} />
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);