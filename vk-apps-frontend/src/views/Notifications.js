import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import PullToRefresh from '@vkontakte/vkui/dist/components/PullToRefresh/PullToRefresh';

import Icon24View from '@vkontakte/icons/dist/24/view';
import Icon24Hide from '@vkontakte/icons/dist/24/hide';

import NotificationCell from 'vk-apps-frontend/components/NotificationCell';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

import { notificationsActions, tutorsActions } from 'vk-apps-frontend/actions/api';

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
    this.state = {
      fetching: false,
      unreadNotifications: [],
      readNotifications: [],
    };
    this.fetchNotifications = this.fetchNotifications.bind(this);
    this.handleSetUnreadNotification = this.handleSetUnreadNotification.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  async fetchNotifications() {
    this.setState({
      fetching: true,
    });
    const unreadNotificationsResponse = await this.props.getUnreadNotificationsList();
    const readNotificationsResponse = await this.props.getReadNotificationsList();
    const unreadNotifications = unreadNotificationsResponse.status === 200
      ? unreadNotificationsResponse.data.results
      : [];
    const readNotifications = readNotificationsResponse.status === 200
      ? readNotificationsResponse.data.results
      : [];
    this.setState({
      fetching: false,
      unreadNotifications,
      readNotifications,
    });
  }

  async componentDidMount() {
    await this.fetchNotifications();
  }

  async handleSetUnreadNotification(id, unread) {
    await this.props.setUnreadNotification(id, {
      unread
    });
    await this.fetchNotifications();
  }

  async onRefresh() {
    this.setState({
      fetching: true,
    });
    await this.fetchNotifications();
    this.setState({
      fetching: false,
    })
  }

  render () {
    const {
      fetching,
      unreadNotifications,
      readNotifications,
    } = this.state;

    return (
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
          }>
            Уведомления
          </PanelHeader>

          <PullToRefresh onRefresh={this.onRefresh} isFetching={fetching}>
            <div>
              <Group title="Новые уведомления">
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

                  { !fetching && unreadNotifications.length === 0 && (
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

                  { !fetching && readNotifications.length === 0 && (
                    <Div>Нет уведомлений</Div>
                  )}
                </List>
              </Group>
            </div>
          </PullToRefresh>
        </Panel>
      </View>
    )
  }
}

export default connect(null, mapDispatchToProps)(Notifications);