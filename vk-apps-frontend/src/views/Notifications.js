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

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

import { notificationsActions } from 'vk-apps-frontend/actions/api';

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
  };
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getNotificationsList({
      unread: true,
    });
  }

  render () {
    const { fetching, notifications } = this.props;

    return (
      <div>
        <PanelHeader
          left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
          }
        >
          Уведомления
        </PanelHeader>

        <Group title="Непрочитанные">
          {fetching && (
            <DivSpinner />
          )}

          <List>
            {notifications.map(notification => (
              <Cell
                multiline
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
                before={
                  <Avatar size={64} src={ROOT_URL + notification.sender.avatar} />
                }
              >
                <div>
                  {notification.sender.first_name} {notification.sender.last_name}
                </div>
                <div style={{ paddingTop: 8, paddingBottom: 8 }}>
                  <Button size="l" style={{ marginRight: 8 }}>Принять</Button>
                  <Button size="l" level="secondary">Отклонить</Button>
                </div>
              </Cell>
            ))}
          </List>
        </Group>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
