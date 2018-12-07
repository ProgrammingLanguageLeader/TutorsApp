import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, Avatar, Group, List, Button, Div
} from '@vkontakte/vkui';

import DivSpinner from '../components/DivSpinner';

import ChangeTab from './ChangeTab';

import { apiStudentsActions } from '../actions';
import { vkApiActions } from '../actions';
import { locationActions } from '../actions';


const ChangeTabContentDiv = styled.div`
  margin-top: 60px;
  background-color: #ffffff;
	padding-bottom: 80px;
`;

const mapStateToProps = state => {
  const apiProfileFetching = state.apiProfileReducer.fetching;
  const vkAppsFetching = state.vkAppsReducer.fetching;
  const vkApiFetching = state.vkApiReducer.fetching;
  const { students } = state.apiStudentsReducer;
  const { vkUserInfo, accessToken } = state.vkAppsReducer;
  const { vkUsersInfo } = state.vkApiReducer;
  const { activePanel } = state.locationReducer;
  return {
    students, vkUserInfo, activePanel, vkUsersInfo,
    apiProfileFetching, vkAppsFetching, vkApiFetching, accessToken,
  };
};

class Schedule extends React.Component {
  componentDidMount() {
    const { id, signed_user_id } = this.props.vkUserInfo;

    this.props.dispatch(
      apiStudentsActions.getStudents({
        user_id: id,
        signed_user_id: signed_user_id,
        tutor_id: id,
      })
    )
    .then(() => {
      const { accessToken } = this.props;
      const { students } = this.props;
      const studentsIds = students.map(student => {
        return student.vk_id;
      });
      this.props.dispatch(
        vkApiActions.fetchUsersInfo(accessToken, studentsIds)
      );
    });
  }

	render() {
    const activePanel = this.props.activePanel || "requests";
    const { students, vkUsersInfo, apiProfileFetching, vkAppsFetching, vkApiFetching } = this.props;
    const fetching = apiProfileFetching || vkAppsFetching || vkApiFetching;

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
                    onClick={() => this.props.dispatch(
                      locationActions.changeLocation('create_vacancy')
                    )}
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
                  { (students.length > 0 && vkUsersInfo.size > 0) ?
                    students
                      .filter(student => vkUsersInfo.get(student.profile_id))
                      .map(student => {
                        const userInfo = vkUsersInfo.get(Number(student.profile_id));
                        return (
                          <Cell
                            size="l"
                            description={userInfo.city ? userInfo.city.title : ""}
                            before={<Avatar src={userInfo.photo_200} />}
                          >
                            {userInfo.firstName} {userInfo.lastName}
                          </Cell>
                        )
                      })
                    : (
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
}

export default connect(mapStateToProps)(Schedule);
