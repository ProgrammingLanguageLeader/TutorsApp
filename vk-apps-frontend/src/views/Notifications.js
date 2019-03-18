import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import PullToRefresh from '@vkontakte/vkui/dist/components/PullToRefresh/PullToRefresh';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';

import Icon24View from '@vkontakte/icons/dist/24/view';
import Icon24Hide from '@vkontakte/icons/dist/24/hide';

import NotificationCell from 'vk-apps-frontend/components/NotificationCell';
import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

import { notificationsActions } from 'vk-apps-frontend/actions/api';
import { appsActions } from 'vk-apps-frontend/actions/vk';

const FullHeightDiv = styled.div`
  height: calc(100vh - var(--tabbar_height) - 64px - 54px);
`;

const mapStateToProps = state => {
  const { isAllowed } = state.VK.appsNotifications;
  return {
    isAllowed,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUnreadNotificationsList: bindActionCreators(notificationsActions.getUnreadNotificationsList, dispatch),
    getReadNotificationsList: bindActionCreators(notificationsActions.getReadNotificationsList, dispatch),
    setUnreadNotification: bindActionCreators(notificationsActions.setUnreadNotification, dispatch),
    allowNotifications: bindActionCreators(appsActions.allowNotifications, dispatch),
    denyNotifications: bindActionCreators(appsActions.denyNotifications, dispatch),
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
    const notificationsAllowed = this.props.isAllowed;
    const notificationsButtonClick = notificationsAllowed
      ? () => this.props.denyNotifications()
      : () => this.props.allowNotifications();

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Уведомления
          </PanelHeader>

          { fetching && !refreshing && (
            <Div>
              <DivSpinner/>
            </Div>
          )}

          <Group>
            <CellButton onClick={notificationsButtonClick}>
              {notificationsAllowed
                ? 'Запретить уведомления ВКонтакте'
                : 'Разрешить уведомления ВКонтакте'
              }
            </CellButton>
          </Group>

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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);