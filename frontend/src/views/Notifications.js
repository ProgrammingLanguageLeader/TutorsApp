import React from 'react';
import { connect } from 'react-redux';

import { 
  View, Panel, PanelHeader, Group, Avatar, Cell, Button, Div, HeaderButton
} from '@vkontakte/vkui';

import BackIcon from '../components/BackIcon';
import FlexDiv from '../components/FlexDiv';
import DivSpinner from '../components/DivSpinner';

import { locationActions, apiLessonApplicationActions } from '../actions';

const mapStateToProps = state => {
  const { activePanel } = state.locationReducer;
  const { accessToken, vkUserInfo } = state.vkAppsUserReducer;
  const { vkUsersInfo } = state.vkApiUsersReducer;
  const applications = [];
  const vkApiUsersFetching = state.vkApiUsersReducer.fetching;
  return {
    activePanel, applications, accessToken, vkUserInfo, vkUsersInfo, vkApiUsersFetching,
  };
};

class Notifications extends React.Component {
  constructor (props) {
    super(props);

    this.acceptApplication = this.acceptApplication.bind(this);
    this.rejectApplication = this.rejectApplication.bind(this);
    this.fetchNotifications = this.fetchNotifications.bind(this);
  }

  fetchNotifications() {
    // TODO: rewrite using new application methods
  }

  componentDidMount() {
    this.fetchNotifications();
  }

  acceptApplication(applicationId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.dispatch(
      apiLessonApplicationActions.acceptApplication({
        user_id: id,
        signed_user_id: signed_user_id,
        application_id: applicationId,
      })
    )
      .then(() => this.fetchNotifications());
  }

  rejectApplication(applicationId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.dispatch(
      apiLessonApplicationActions.acceptApplication({
        user_id: id,
        signed_user_id: signed_user_id,
        application_id: applicationId,
      })
    )
      .then(() => this.fetchNotifications());
  }

  render () {
    const { vkUsersInfo, applications, apiApplicationFetching, vkApiUsersFetching } = this.props;
    const fetching =  apiApplicationFetching || vkApiUsersFetching;

    return (
      <View id={this.props.id} activePanel="notifications">
        <Panel id="notifications">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Уведомления
          </PanelHeader>
          { fetching ? (
            <DivSpinner />
          ) : (
            <Group title="Заявки">
              { applications.length > 0 && vkUsersInfo.size > 0 ?
                applications.map(application => {
                const userInfo = vkUsersInfo.get(application.student);
                return (
                  <Cell
                    expandable
                    size="l"
                    description={userInfo.city ? userInfo.city.title : ""}
                    before={
                      <Avatar src={userInfo.photo_200} onClick={() => this.props.dispatch(
                        locationActions.changeLocation('notifications', 'show_student')
                      )} />}
                    bottomContent={
                      <FlexDiv>
                        <Button size="l" stretched style={{ width: 120 }} onClick={
                          () => this.acceptApplication(application.id)
                        }>
                          Принять
                        </Button>
                        <Button size="l" level="outline" stretched style={{ marginLeft: 8 }} onClick={
                          () => this.rejectApplication(application.id)
                        }>
                          Отклонить
                        </Button>
                      </FlexDiv>
                    }>
                      {`${userInfo.firstName} ${userInfo.lastName}`}
                    </Cell>
                  );
                }) : (
                  <Div>
                    У вас нет активных заявок
                  </Div>
                )
              }
            </Group>
          )}
        </Panel>
      </View>
    )
  }
}

export default connect(mapStateToProps)(Notifications);
