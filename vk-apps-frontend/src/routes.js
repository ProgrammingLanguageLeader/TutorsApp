import { matchPath } from 'react-router-dom';

export const pathsToViews = {
  '/': 'entrypoint',
  '/home': 'home',

  '/user/:id(\\d+)': 'user',
  '/user/:id(\\d+)/edit': 'user-edit',

  '/vacancy/:id(\\d+)': 'vacancy',
  '/vacancy/:id(\\d+)/edit': 'vacancy-edit',
  '/vacancy/create': 'vacancy-create',
  '/vacancies': 'vacancies',
  '/vacancies/filter': 'vacancies-filter',
  '/vacancies/current_user': 'user-vacancies',

  '/schedule': 'schedule',
  '/lesson/:id(\\d+)': 'lesson',
  '/lesson/:id(\\d+)/edit': 'lesson-edit',
  '/lesson/create': 'lesson-create',

  '/notifications': 'notifications',

  '/main_menu': 'main-menu',

  '/student_request/:id(\\d+)': 'student-request',
  '/student_requests/outgoing': 'outgoing-student-requests',

  '/money_transfer': 'money-transfer',

  '/tutors': 'tutors',
  '/students': 'students',
};

export const findPath = url => {
  return Object.keys(pathsToViews).find(path =>
    matchPath(url, {
      path: path,
      exact: true,
      strict: false,
    })
  );
};

export const matchView = url => {
  const matchedPath = findPath(url);
  return pathsToViews[matchedPath] || 'entrypoint';
};

export const getMatchedPath = url => {
  return matchPath(url, {
    path: findPath(url),
    exact: true,
    strict: false,
  });
};