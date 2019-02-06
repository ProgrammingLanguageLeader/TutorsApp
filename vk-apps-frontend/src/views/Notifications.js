import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import List from '@vkontakte/vkui/dist/components/List/List';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import Icon24View from '@vkontakte/icons/dist/24/view';
import Icon24Hide from '@vkontakte/icons/dist/24/hide';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

import { notificationsActions, tutorsActions } from 'vk-apps-frontend/actions/api';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const mapStateToProps = state => {
  const { fetching, notifications } = state.apiReducer.notificationsReducer;
  return {
    notifications, fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotificationsList: bindActionCreators(notificationsActions.getNotificationsList, dispatch),
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
    this.props.getNotificationsList();
  }

  async handleSetUnreadNotification(id, unread) {
    await this.props.setUnreadNotification(id, {
      unread
    });
    await this.props.getNotificationsList();
  }

  render () {
    const { fetching, notifications } = this.props;
    const unreadNotifications = notifications.filter(
      notification => notification.unread && notification.target
    );
    const readNotifications = notifications.filter(
      notification => !notification.unread && notification.target
    );

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
            {unreadNotifications.map(notification => (
              <Cell
                multiline
                expandable
                key={notification.id}
                description={
                  <div>
                    <div>
                      {notification.target.content_type === 'student_request' && 'Заявка на добавление в список учеников'}
                    </div>
                    <div>
                      <Moment format="LL" date={notification.creation_time} />
                    </div>
                  </div>
                }
              >
                <div
                  style={{ display: "flex" }}
                  onClick={() => this.props.history.push(`/${notification.target.content_type}/${notification.target.id}`)}
                >
                  <Avatar size={64} src={ROOT_URL + notification.sender.avatar} />
                  <Div>
                    {notification.sender.first_name} {notification.sender.last_name}
                  </Div>
                </div>
                <div style={{ display: "flex", paddingTop: 8, paddingBottom: 8 }}>
                  <Button size="m" level="outline" before={<Icon24Hide/>} onClick={
                    () => this.handleSetUnreadNotification(notification.id, false)
                  }>
                    Пометить просмотренным
                  </Button>
                </div>
              </Cell>
            ))}

            {unreadNotifications.length === 0 && (
              <Div>Нет уведомлений</Div>
            )}
          </List>
        </Group>

        <Group title="Просмотренные уведомления">
          <List>
            {readNotifications.map(notification => (
              <Cell
                multiline
                expandable
                key={notification.id}
                description={
                  <div>
                    <div>
                      {notification.target.content_type === 'student_request' && 'Заявка на добавление в список учеников'}
                    </div>
                    <div>
                      <Moment format="LL" date={notification.creation_time} />
                    </div>
                  </div>
                }
              >
                <div
                  style={{ display: "flex" }}
                  onClick={() => this.props.history.push(`/${notification.target.content_type}/${notification.target.id}`)}
                >
                  <Avatar size={64} src={ROOT_URL + notification.sender.avatar} />
                  <Div>
                    {notification.sender.first_name} {notification.sender.last_name}
                  </Div>
                </div>
                <div style={{ display: "flex", paddingTop: 8, paddingBottom: 8 }}>
                  <Button size="m" level="outline" before={<Icon24View/>} onClick={
                    () => this.handleSetUnreadNotification(notification.id, true)
                  }>
                    Пометить непросмотренным
                  </Button>
                </div>
              </Cell>
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