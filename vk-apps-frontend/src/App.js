import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

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
import HistoryAdapter from 'vk-apps-frontend/helpers/HistoryAdapter';
import { appsActions } from 'vk-apps-frontend/actions/vk';
import { currentUserActions } from 'vk-apps-frontend/actions';
import { vkAppsUsersActions } from 'vk-apps-frontend/actions/api';

import Tabbar from 'vk-apps-frontend/components/Tabbar';
import Root from 'vk-apps-frontend/components/Root';

const mapStateToProps = state => {
  const { vkUserInfo } = state.VK.appsUser;
  const { currentUser } = state;
  return {
    vkUserInfo,
    currentUser
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
      initializing: true,
    };
    this.history = HistoryAdapter.getInstance();
  }

  componentDidMount() {
    this.props.init();
    this.props.fetchCurrentUserInfo();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.vkUserInfo !== prevProps.vkUserInfo) {
      this.setState({
        initializing: true,
      });
      const { id } = this.props.vkUserInfo;
      const response = await this.props.getVkAppsUser(id);
      if (response.status === 200) {
        const { user, vk_id } = response.data;
        this.props.saveCurrentUserData(user, vk_id);
      }
      this.setState({
        initializing: false,
      });
    }
  }

  render() {
    const { currentUser } = this.props;
    const { initializing } = this.state;

    return (
      !initializing
        ? (
          <Router history={this.history}>
            <Route path="/" component={props => {
              const { location } = props;
              const { pathname } = location;
              const activeView = matchView(pathname);
              const match = getMatchedPath(pathname);
              const isBack = this.history.lastAction === 'BACK';

              return (
                <Epic
                  activeStory="root"
                  tabbar={
                    <Tabbar
                      currentUserId={currentUser.user && currentUser.user.id}
                      history={this.history}
                      location={location}
                    />
                  }
                >
                  <Root id="root" activeView={activeView} isBack={isBack}>
                    <Entrypoint
                      key="entrypoint"
                      id="entrypoint"
                      history={this.history}
                      match={match}
                      currentUser={currentUser}
                    />
                    <Home key="home" id="home" history={this.history} match={match} />

                    <User key="user" id="user" history={this.history} match={match} />
                    <UserEdit key="user-edit" id="user-edit" history={this.history} match={match} />

                    <Vacancy key="vacancy" id="vacancy" history={this.history} match={match} />
                    <VacancyEdit key="vacancy-edit" id="vacancy-edit" history={this.history} match={match} />
                    <VacancyCreate key="vacancy-create" id="vacancy-create" history={this.history} match={match} />
                    <Vacancies key="vacancies" id="vacancies" history={this.history} match={match} />
                    <VacanciesFilter key="vacancies-filter" id="vacancies-filter" history={this.history} match={match} />
                    <UserVacancies key="user-vacancies" id="user-vacancies" history={this.history} match={match} />

                    <Schedule key="schedule" id="schedule" history={this.history} match={match} />
                    <Lesson key="lesson" id="lesson" history={this.history} match={match} />
                    <LessonEdit key="lesson-edit" id="lesson-edit" history={this.history} match={match} />
                    <LessonCreate key="lesson-create" id="lesson-create" history={this.history} match={match} />

                    <Notifications key="notifications" id="notifications" history={this.history} match={match} />

                    <MainMenu key="main-menu" id="main-menu" history={this.history} match={match} />

                    <StudentRequest key="student-request" id="student-request" history={this.history} match={match} />
                    <OutgoingStudentRequests key="outgoing-student-requests" id="outgoing-student-requests" history={this.history} match={match} />

                    <MoneyTransfer key="money-transfer" id="money-transfer" history={this.history} match={match} />

                    <Tutors key="tutors" id="tutors" history={this.history} match={match} />
                    <Students key="students" id="students" history={this.history} match={match} />
                  </Root>
                </Epic>
              )
            }} />
          </Router>
        )
        : <ScreenSpinner/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);