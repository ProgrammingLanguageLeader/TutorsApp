import React from 'react';
import { connect } from 'react-redux';

import { 
  View, Panel, PanelHeader, Group, Avatar, Cell, Button
} from '@vkontakte/vkui';

import FlexdDiv from '../components/FlexDiv';
import DivSpinner from '../components/DivSpinner';

import { locationActions } from '../actions/location';
import { apiActions } from '../actions/api';
import { vkActions } from '../actions/vk';

class Notifications extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activePanel: 'notifications'
    }
  }

  componentDidMount() {
    const vk_id = this.props.userInfo.id;
    this.props.dispatch(
      apiActions.getApplications({
        vk_id,
      })
    )
    .then(() => {
      const { accessToken, applications } = this.props;
      const studentIds = applications.map(application => {
        return application.student;
      })
      return this.props.dispatch(
        vkActions.fetchUsersInfo(accessToken, studentIds)
      )
    })
  }

  render () {
    const { fetching, usersInfo, applications } = this.props;

    return (
      <View activePanel={this.state.activePanel}>
        <Panel id="notifications">
          <PanelHeader>
            Уведомления
          </PanelHeader>
          { fetching ? (
            <DivSpinner />
          ) : (
            <Group title="Заявки">
              { applications.map(application => {
                const userInfo = usersInfo.get(Number(application.student));
                return (
                  <Cell
                    expandable
                    onClick={() => this.setState({ activePanel: 'show_student'})}
                    size="l"
                    description={userInfo.city ? userInfo.city.title : ""}
                    before={<Avatar src={userInfo.photo_200} />}
                    bottomContent={
                      <FlexdDiv>
                        <Button size="l" stretched style={{ width: 120 }}>
                          Принять
                        </Button>
                        <Button size="l" level="outline" stretched style={{ marginLeft: 8 }}>
                          Отклонить
                        </Button>
                      </FlexdDiv>
                    }>
                      {`${userInfo.firstName} ${userInfo.lastName}`}
                    </Cell>
                  );
                }) 
              }
            </Group>
          )}
        </Panel>

        <Panel id="show_student">
          
        </Panel>
      </View>
    )
  }
};

const mapStateToProps = state => {
  const { activePanel } = state.locationReducer;
  const { accessToken, userInfo, usersInfo } = state.vkReducer;
  const { fetching, applications } = state.apiReducer;
  return {
    activePanel, applications, accessToken, userInfo, usersInfo, 
  };
}

export default connect(mapStateToProps)(Notifications);
