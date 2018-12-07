import React from 'react';
import { connect } from 'react-redux';

import { 
  View, Panel, PanelHeader, Group, Avatar, Cell, Button, Div, HeaderButton
} from '@vkontakte/vkui';

import BackIcon from '../components/BackIcon';
import FlexDiv from '../components/FlexDiv';
import DivSpinner from '../components/DivSpinner';
import Main from '../components/Main';

import { locationActions, apiApplicationActions, vkApiActions } from '../actions';

const mapStateToProps = state => {
  const { activePanel } = state.locationReducer;
  const { accessToken, vkUserInfo } = state.vkAppsReducer;
  const { vkUsersInfo } = state.vkApiReducer;
  // TODO: rewrite using new application methods
  // const { applications } = state.apiApplicationReducer;
  const applications = [];
  const apiApplicationFetching = state.apiApplicationReducer.fetching;
  const vkApiFetching = state.vkApiReducer.fetching;
  return {
    activePanel, applications, accessToken, vkUserInfo, vkUsersInfo,
    apiApplicationFetching, vkApiFetching,
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
    //
    // const { id, signed_user_id } = this.props.vkUserInfo;
    // this.props.dispatch(
    //   apiApplicationActions.getApplications({
    //     user_id: id,
    //     signed_user_id: signed_user_id,
    //   })
    // )
    //   .then(() => {
    //     const { accessToken, applications } = this.props;
    //     const studentIds = applications.map(application => {
    //       return application.student;
    //     });
    //     this.props.dispatch(
    //       vkApiActions.fetchUsersInfo(accessToken, studentIds)
    //     )
    //   })
  }

  componentDidMount() {
    this.fetchNotifications();
  }

  acceptApplication(applicationId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.dispatch(
      apiApplicationActions.acceptApplication({
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
      apiApplicationActions.acceptApplication({
        user_id: id,
        signed_user_id: signed_user_id,
        application_id: applicationId,
      })
    )
      .then(() => this.fetchNotifications());
  }

  render () {
    const activePanel = this.props.activePanel || 'notifications';
    const { vkUsersInfo, applications, apiApplicationFetching, vkApiFetching } = this.props;
    const fetching =  apiApplicationFetching || vkApiFetching;

    console.log(this.props);

    return (
      <View id={this.props.id} activePanel={activePanel}>
        <Panel id="notifications">
          <PanelHeader>
            Уведомления
          </PanelHeader>
          { fetching ? (
            <DivSpinner />
          ) : (
            <Main>
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
            </Main>
          )}
        </Panel>

        <Panel id="show_student">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Уведомления
          </PanelHeader>
          <Main>
            <Div>Coming soon</Div>
          </Main>
        </Panel>
      </View>
    )
  }
}

export default connect(mapStateToProps)(Notifications);
