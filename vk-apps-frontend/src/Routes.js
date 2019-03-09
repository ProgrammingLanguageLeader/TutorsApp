import React from 'react';
import { Route, withRouter, matchPath } from 'react-router-dom';

import Root from '@vkontakte/vkui/dist/components/Root/Root';

import Entrypoint from 'vk-apps-frontend/views/Entrypoint';
import Home from 'vk-apps-frontend/views/Home';
import User from 'vk-apps-frontend/views/User';
import Vacancies from 'vk-apps-frontend/views/Vacancies';
import VacancyCreate from 'vk-apps-frontend/views/VacancyCreate';
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

const urlsToComponents = {
  '/home': Home,

  '/user/:id(\\d+)': User,
  '/user/:id(\\d+)/edit': UserEdit,

  '/vacancy/:id(\\d+)': Vacancy,
  '/vacancy/:id(\\d+)/edit': VacancyEdit,
  '/vacancy/create': VacancyCreate,
  '/vacancies': Vacancies,
  '/vacancies/filter': Filter,
  '/vacancies/current_user': UserVacancies,

  '/schedule': Schedule,
  '/lesson/:id(\\d+)': Lesson,
  '/lesson/:id(\\d+)/edit': LessonEdit,
  '/lesson/create': LessonCreate,

  '/notifications': Notifications,

  '/main_menu': MainMenu,

  '/student_request/:id(\\d+)': StudentRequest,
  '/student_requests/outgoing': OutgoingStudentRequests,

  '/money_transfer': MoneyTransfer,

  '/tutors': Tutors,
  '/students': Students,
};

const getExactUrlPattern = path => {
  const urlPattern = Object.keys(urlsToComponents).find(
    urlPattern => matchPath(
      path,
      {
        path: urlPattern,
        exact: true,
        strict: false,
      }
    )
  );
  return urlPattern ? urlPattern : '/';
};

class Routes extends React.Component {
  render() {
    const { location, isUserRegistered, currentUser } = this.props;
    const panels = Object.entries(urlsToComponents).map(
      urlToComponent => {
        const [url, Component] = urlToComponent;
        return (
          <div key={url} id={url}>
            <Route exact path={url} render={props => (
              <Component {...props} />
            )} />

            // TODO: get rid of the stub after fix in VK UI
            <div className="View__panel" />
          </div>
        );
      }
    ).concat(
      <div key="/" id="/">
        <Route exact path="/">
          <Entrypoint
            currentUser={currentUser}
            isUserRegistered={isUserRegistered}
          />
        </Route>

        // TODO: get rid of the stub after fix in VK UI
        <div className="View__panel" />
      </div>
    );

    return (
      <Root activeView={getExactUrlPattern(location.pathname)}>
        {panels}
      </Root>
    );
  }
}

export default withRouter(Routes);