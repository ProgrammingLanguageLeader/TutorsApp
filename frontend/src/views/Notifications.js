import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  View, Panel, PanelHeader, Group, Cell, List, HeaderButton
} from '@vkontakte/vkui';

import BackIcon from '../components/BackIcon';
import DivSpinner from '../components/DivSpinner';
import ApplicationCreationCell from "../components/ApplicationCreationCell";
import ApplicationAnswerCell from "../components/ApplicationAnswerCell";

import {
  locationActions,
  apiNotificationActions,
  vkApiActions,
  vkAppsActions,
  apiStudentApplicationActions,
  apiLessonApplicationActions, apiPaymentApplicationActions,
} from '../actions';
import { notificationLabels, notificationEventTypes } from "../constants";

const mapStateToProps = state => {
  const { activePanel } = state.locationReducer;
  const { vkUserInfo } = state.vkAppsUserReducer;
  const { accessToken } = state.vkAppsTokenReducer;
  const { vkUsersInfo } = state.vkApiUsersReducer;
  const { notifications } = state.apiNotificationReducer;
  const vkApiUsersFetching = state.vkApiUsersReducer.fetching;
  const apiNotificationFetching = state.apiNotificationReducer.fetching;
  return {
    activePanel, notifications, accessToken, vkUserInfo, vkUsersInfo, vkApiUsersFetching,
    apiNotificationFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goBack: bindActionCreators(locationActions.goBack, dispatch),
    changeLocation: bindActionCreators(locationActions.changeLocation, dispatch),
    getNotifications: bindActionCreators(apiNotificationActions.getNotifications, dispatch),
    markNotificationAsSeen: bindActionCreators(apiNotificationActions.markNotificationAsSeen, dispatch),
    allowNotifications: bindActionCreators(vkAppsActions.allowNotifications, dispatch),
    fetchUsersInfo: bindActionCreators(vkApiActions.fetchUsersInfo, dispatch),
    acceptStudentApplication: bindActionCreators(apiStudentApplicationActions.acceptApplication, dispatch),
    rejectStudentApplication: bindActionCreators(apiStudentApplicationActions.rejectApplication, dispatch),
    acceptLessonApplication: bindActionCreators(apiLessonApplicationActions.acceptApplication, dispatch),
    rejectLessonApplication: bindActionCreators(apiLessonApplicationActions.rejectApplication, dispatch),
    acceptPaymentApplication: bindActionCreators(apiPaymentApplicationActions.acceptApplication, dispatch),
    rejectPaymentApplication: bindActionCreators(apiPaymentApplicationActions.rejectApplication, dispatch),
  };
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.fetchNotifications = this.fetchNotifications.bind(this);
    this.acceptStudentApplication = this.acceptStudentApplication.bind(this);
    this.rejectStudentApplication = this.rejectStudentApplication.bind(this);
    this.acceptLessonApplication = this.acceptLessonApplication.bind(this);
    this.rejectLessonApplication = this.rejectLessonApplication.bind(this);
    this.acceptPaymentApplication = this.acceptPaymentApplication.bind(this);
    this.rejectPaymentApplication = this.rejectPaymentApplication.bind(this);
    this.markAsSeen = this.markAsSeen.bind(this);
  }

  componentDidMount() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.getNotifications({
      user_id: id,
      signed_user_id: signed_user_id
    })
      .then(() => {
        const { accessToken, notifications } = this.props;
        const vkIds = notifications.map(notification => {
          if (notification.student_application) {
            return notification.student_application.student.profile_id;
          }
          if (notification.lesson_application) {
            return notification.lesson_application.student.profile_id;
          }
          if (notification.payment_application) {
            return notification.payment_application.lesson.tutor.tutor_id;
          }
          if (notification.tutor) {
            return notification.tutor.profile_id;
          }
          if (notification.student) {
            return notification.student.profile_id;
          }
          if (notification.lesson) {
            return notification.lesson.tutor.profile_id;
          }
          return null;
        });
        this.props.fetchUsersInfo(accessToken, vkIds);
      })
  }

  acceptStudentApplication(applicationId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.acceptStudentApplication({
      user_id: id,
      signed_user_id: signed_user_id,
      student_application_id: applicationId,
    })
      .then(() => this.fetchNotifications())
  }

  rejectStudentApplication(applicationId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.rejectStudentApplication({
      user_id: id,
      signed_user_id: signed_user_id,
      student_application_id: applicationId,
    })
      .then(() => this.fetchNotifications())
  }

  acceptLessonApplication(applicationId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.acceptLessonApplication({
      user_id: id,
      signed_user_id: signed_user_id,
      lesson_application_id: applicationId,
    })
      .then(() => this.fetchNotifications())
  }

  rejectLessonApplication(applicationId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.rejectLessonApplication({
      user_id: id,
      signed_user_id: signed_user_id,
      lesson_application_id: applicationId,
    })
      .then(() => this.fetchNotifications())
  }

  acceptPaymentApplication(applicationId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.acceptPaymentApplication({
      user_id: id,
      signed_user_id: signed_user_id,
      payment_application_id: applicationId,
    })
      .then(() => this.fetchNotifications())
  }

  rejectPaymentApplication(applicationId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.rejectPaymentApplication({
      user_id: id,
      signed_user_id: signed_user_id,
      payment_application_id: applicationId,
    })
      .then(() => this.fetchNotifications())
  }

  markAsSeen(notificationId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.markNotificationAsSeen({
      user_id: id,
      signed_user_id: signed_user_id,
      notification_id: notificationId,
    })
      .then(() => this.fetchNotifications())
  }

  render () {
    const { vkUsersInfo, notifications, apiNotificationFetching, vkApiUsersFetching } = this.props;
    const notificationsFetching =  apiNotificationFetching || vkApiUsersFetching;

    return (
      <View id={this.props.id} activePanel="notifications">
        <Panel id="notifications">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.goBack()}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Уведомления
          </PanelHeader>
          <Group title="Активные уведомления">
            <List>
              {
                notificationsFetching
                ? (
                  <DivSpinner />
                )
                : notifications
                  .map(notification => {
                    const event = notification.event;
                    const label = notificationLabels[event];
                    switch (event) {
                      case notificationEventTypes.STUDENT_APPLICATION_CREATION: {
                        const applicationId = notification.student_application.student_application_id;
                        const studentId = notification.student_application.student.profile_id;
                        const studentVkProfile = vkUsersInfo[studentId];
                        if (!studentVkProfile) {
                          return null;
                        }
                        return (
                          <ApplicationCreationCell
                            key={notification.notification_id}
                            vkProfile={studentVkProfile}
                            label={label}
                            onClick={
                              () => this.props.changeLocation('show_profile', '', {
                                profileId: studentId
                              })
                            }
                            onAccept={() => this.acceptStudentApplication(applicationId)}
                            onReject={() => this.rejectStudentApplication(applicationId)}
                          />
                        );
                      }

                      case notificationEventTypes.STUDENT_APPLICATION_ACCEPT:
                      case notificationEventTypes.STUDENT_APPLICATION_REJECT:
                      case notificationEventTypes.PAYMENT_APPLICATION_ACCEPT:
                      case notificationEventTypes.PAYMENT_APPLICATION_REJECT: {
                        const tutorId = notification.tutor.profile_id;
                        const tutorVkProfile = vkUsersInfo[tutorId];
                        if (!tutorVkProfile) {
                          return null;
                        }
                        return (
                          <ApplicationAnswerCell
                            key={notification.notification_id}
                            vkProfile={tutorVkProfile}
                            onMarkAsSeen={() => this.markAsSeen(notification.notification_id)}
                            label={label}
                          />
                        );
                      }

                      case notificationEventTypes.LESSON_CREATION:
                      case notificationEventTypes.LESSON_CHANGING:
                      case notificationEventTypes.LESSON_DEACTIVATION:
                      case notificationEventTypes.LESSON_APPLICATION_ACCEPT:
                      case notificationEventTypes.LESSON_APPLICATION_REJECT: {
                        const tutorId = notification.tutor.profile_id;
                        const lessonId = notification.lesson.lesson_id;
                        const tutorVkProfile = vkUsersInfo[tutorId];
                        if (!tutorVkProfile) {
                          return null;
                        }
                        return (
                          <ApplicationAnswerCell
                            key={notification.notification_id}
                            expandable
                            vkProfile={tutorVkProfile}
                            onMarkAsSeen={() => this.markAsSeen(notification.notification_id)}
                            onClick={() => this.props.changeLocation('show_lesson', '', {
                              lessonId: lessonId
                            })}
                            label={label}
                          />
                        );
                      }

                      case notificationEventTypes.LESSON_APPLICATION_CREATION: {
                        const applicationId = notification.lesson_application.lesson_application_id;
                        const studentId = notification.lesson_application.student.profile_id;
                        const studentVkProfile = vkUsersInfo[studentId];
                        if (!studentVkProfile) {
                          return null;
                        }
                        return (
                          <ApplicationCreationCell
                            key={notification.notification_id}
                            vkProfile={studentVkProfile}
                            label={label}
                            onClick={
                              () => this.props.changeLocation('show_lesson_application', '', {
                                lessonApplicationId: applicationId
                              })
                            }
                            onAccept={() => this.acceptLessonApplication(applicationId)}
                            onReject={() => this.rejectLessonApplication(applicationId)}
                          />
                        );
                      }

                      case notificationEventTypes.PAYMENT_APPLICATION_CREATION: {
                        const applicationId = notification.payment_application.payment_application_id;
                        const tutorId = notification.payment_application.tutor.profile_id;
                        const tutorVkProfile = vkUsersInfo[tutorId];
                        if (!tutorVkProfile) {
                          return null;
                        }
                        return (
                          <ApplicationCreationCell
                            key={notification.notification_id}
                            vkProfile={tutorVkProfile}
                            label={label}
                            onClick={
                              () => this.props.changeLocation('show_payment_application', '', {
                                lessonApplicationId: applicationId
                              })
                            }
                            onAccept={() => this.acceptPaymentApplication(applicationId)}
                            onReject={() => this.rejectPaymentApplication(applicationId)}
                          />
                        );
                      }

                      default:
                        console.log(`Unhandled type of notification, event = ${event}`);
                        return null;
                    }
                  })
              }
              {
                notifications.length === 0 && (
                  <Cell multiline>
                    На данный момент уведомления отсутствуют
                  </Cell>
                )
              }
            </List>
          </Group>
        </Panel>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
