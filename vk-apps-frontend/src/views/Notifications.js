import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import Icon24View from '@vkontakte/icons/dist/24/view';
import Icon24Hide from '@vkontakte/icons/dist/24/hide';

import NotificationCell from 'vk-apps-frontend/components/NotificationCell';
import BackIcon from 'vk-apps-frontend/components/BackIcon';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

import { notificationsActions, tutorsActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { fetching, unreadNotifications, readNotifications } = state.apiReducer.notificationsReducer;
  const { currentUserReducer } = state;
  return {
    unreadNotifications,
    readNotifications,
    fetching,
    currentUserReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUnreadNotificationsList: bindActionCreators(notificationsActions.getUnreadNotificationsList, dispatch),
    getReadNotificationsList: bindActionCreators(notificationsActions.getReadNotificationsList, dispatch),
    setUnreadNotification: bindActionCreators(notificationsActions.setUnreadNotification, dispatch),
    acceptStudentRequest: bindActionCreators(tutorsActions.acceptStudentRequest, dispatch),
    deleteStudentRequest: bindActionCreators(tutorsActions.deleteStudentRequest, dispatch),
  };
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetUnreadNotification = this.handleSetUnreadNotification.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      Promise.all([
        this.props.getUnreadNotificationsList(),
        this.props.getReadNotificationsList(),
      ]);
    }
  }

  async handleSetUnreadNotification(id, unread) {
    await this.props.setUnreadNotification(id, {
      unread
    });
    await Promise.all([
      this.props.getUnreadNotificationsList(),
      this.props.getReadNotificationsList(),
    ]);
  }

  render () {
    const { fetching, unreadNotifications, readNotifications } = this.props;

    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={this.props.history.goBack}>
            <BackIcon />
          </HeaderButton>
        }>
          Уведомления
        </PanelHeader>

        <Group title="Новые уведомления">
          {fetching && (
            <DivSpinner />
          )}
          <List>
            { unreadNotifications.map(notification => (
              <NotificationCell
                key={notification.id}
                notification={notification}
                buttonBefore={<Icon24Hide/>}
                buttonLabel={"Пометить прочитанным"}
                onButtonClick={
                  () => this.handleSetUnreadNotification(notification.id, false)
                }
                onSenderClick={
                  notification.target
                    ? () => this.props.history.push(`/${notification.target.content_type}/${notification.target.id}`)
                    : null
                }
              />
            ))}

            { unreadNotifications.length === 0 && (
              <Div>Нет уведомлений</Div>
            )}
          </List>
        </Group>

        <Group title="Просмотренные уведомления">
          <List>
            { readNotifications.map(notification => (
              <NotificationCell
                key={notification.id}
                notification={notification}
                buttonBefore={<Icon24View/>}
                buttonLabel={"Пометить непрочитанным"}
                onButtonClick={
                  () => this.handleSetUnreadNotification(notification.id, true)
                }
                onSenderClick={
                  notification.target
                    ? () => this.props.history.push(`/${notification.target.content_type}/${notification.target.id}`)
                    : null
                }
              />
            ))}

            {readNotifications.length === 0 && (
              <Div>Нет уведомлений</Div>
            )}
          </List>
        </Group>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);