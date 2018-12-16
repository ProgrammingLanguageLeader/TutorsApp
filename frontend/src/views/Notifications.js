import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  View, Panel, PanelHeader, Group, Cell, List, HeaderButton
} from '@vkontakte/vkui';

import BackIcon from '../components/BackIcon';
import DivSpinner from '../components/DivSpinner';
import StudentApplicationCell from "../components/StudentApplicationCell";

import {
  locationActions, apiNotificationActions, vkApiActions, vkAppsActions, apiStudentApplicationActions,
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
  };
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.fetchNotifications = this.fetchNotifications.bind(this);
    this.acceptStudentApplication = this.acceptStudentApplication.bind(this);
    this.rejectStudentApplication = this.rejectStudentApplication.bind(this);
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
          if (notification.student_application)
            return notification.student_application.student.profile_id;
          if (notification.lesson_application)
            return notification.lesson_application.student.profile_id;
          // TODO: write other cases
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
                          <StudentApplicationCell
                            key={notification.notification_id}
                            studentVkProfile={studentVkProfile}
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
                        return null;

                      case notificationEventTypes.STUDENT_APPLICATION_REJECT:
                        return null;

                      case notificationEventTypes.LESSON_CREATION:
                        return null;

                      default:
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
