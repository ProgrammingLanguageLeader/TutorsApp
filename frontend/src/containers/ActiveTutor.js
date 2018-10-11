import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, Avatar, Group, List, Button, Div
} from '@vkontakte/vkui';

import DivSpinner from '../components/DivSpinner';

import ChangeTab from './ChangeTab';

import { apiActions } from '../actions/api';
import { vkActions } from '../actions/vk';
import { locationActions } from '../actions/location';


const ChangeTabContentDiv = styled.div`
  margin-top: 60px;
  background-color: #ffffff;
	padding-bottom: 80px;
`;

class ActiveTutor extends React.Component {
	componentDidMount() {
    const { id, signed_user_id } = this.props.userInfo;

    this.props.dispatch(
      apiActions.getStudents({
        user_id: id,
        signed_user_id: signed_user_id,
        vk_id: id,
      })
    )
    .then(() => {
      const { accessToken } = this.props;
      const { students } = this.props;
      const studentsIds = students.map(student => {
        return student.vk_id;
      });
      this.props.dispatch(
        vkActions.fetchUsersInfo(accessToken, studentsIds)
      );
    });
  }

	render() {
    const activePanel = this.props.activePanel || "requests";
    const { students, usersInfo, fetching } = this.props;

		return (
			<View id={this.props.id} activePanel={activePanel}>
				<Panel id="requests">
					<PanelHeader noShadow>
						Активные
					</PanelHeader>
          <ChangeTab />
          <ChangeTabContentDiv>
            { fetching ? (
              <DivSpinner />
            ) : (
              <div>
                <Group>
                <List>
                  
                </List>
                </Group>
                <Div>
                  <Button 
                    size="xl"
                    onClick={() => this.props.dispatch(locationActions.changeLocation('create_vacancy'))}
                  >
                      Создать вакансию
                  </Button>
                </Div>
              </div>
            )}
          </ChangeTabContentDiv>
        </Panel>

        <Panel id="students">
					<PanelHeader noShadow>
						Активные
					</PanelHeader>
          <ChangeTab />
          <ChangeTabContentDiv>
              { fetching ? (
                <DivSpinner />
              ) : (
                <List>
                  { (students.length > 0 && usersInfo.size > 0) ? students.map(student => {
                    const userInfo = usersInfo.get(Number(student.vk_id));
                    if (!userInfo) {
                      return;
                    }
                    return (
                      <Cell
                        size="l"
                        description={userInfo.city ? userInfo.city.title : ""}
                        before={<Avatar src={userInfo.photo_200} />}
                      >
                        {userInfo.firstName} {userInfo.lastName}
                      </Cell>
                    );
                  }) : (
                    <Cell>
                      Ученики отсутствуют
                    </Cell>
                  )}
                </List>
              )}
          </ChangeTabContentDiv>
        </Panel>
      </View>
		);
	}
};

const mapStateToProps = state => {
  const { fetching, students } = state.apiReducer;
  const { userInfo, usersInfo, accessToken } = state.vkReducer;
  const { activePanel } = state.locationReducer;
  return {
    students, userInfo, activePanel, usersInfo, 
    fetching, accessToken, 
  };
}

export default connect(mapStateToProps)(ActiveTutor);
