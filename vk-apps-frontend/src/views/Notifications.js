import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

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
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

import { notificationsActions } from 'vk-apps-frontend/actions/api';

const FullHeightDiv = styled.div`
  height: calc(100vh - var(--tabbar_height) - 64px);
`;

const mapDispatchToProps = dispatch => {
  return {
    getUnreadNotificationsList: bindActionCreators(notificationsActions.getUnreadNotificationsList, dispatch),
    getReadNotificationsList: bindActionCreators(notificationsActions.getReadNotificationsList, dispatch),
    setUnreadNotification: bindActionCreators(notificationsActions.setUnreadNotification, dispatch),
  };
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: null,
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
      refreshing: true,
    });
    await this.fetchNotifications();
    setTimeout(
      () => {
        this.setState({
          refreshing: false,
        });
      },
      1000
    );
  }

  render () {
    const {
      refreshing,
      fetching,
      unreadNotifications,
      readNotifications
    } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
          }>
            Уведомления
          </PanelHeader>

          { fetching && !refreshing && (
            <Div>
              <DivSpinner/>
            </Div>
          )}

          <PullToRefresh onRefresh={this.onRefresh} isFetching={refreshing}>
            <FullHeightDiv>
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
            </FullHeightDiv>
          </PullToRefresh>
        </Panel>
      </View>
    )
  }
}

export default connect(null, mapDispatchToProps)(Notifications);