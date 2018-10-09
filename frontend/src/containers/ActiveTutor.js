import React from 'react';
import { connect } from 'react-redux';
import {
	View, Panel, PanelHeader, Cell, Avatar, Group, List, Button
} from '@vkontakte/vkui';

import ChangeTab from './ChangeTab';
import FlexDiv from '../components/FlexDiv';

import { apiActions } from '../actions/api';
import { locationActions } from '../actions/location';

class ActiveTutor extends React.Component {
	componentDidMount() {
    const { id, signed_user_id } = this.props.userInfo;

    this.props.dispatch(
      apiActions.getStudents({
        user_id: id,
        signed_user_id: signed_user_id,
        vk_id: id,
      })
    );
  }

	render() {
    const activePanel = this.props.activePanel || "requests";

		return (
			<View id={this.props.id} activePanel={activePanel}>
				<Panel id="requests">
					<PanelHeader noShadow>
						Активные
					</PanelHeader>
          <ChangeTab />
          <Group style={{ marginTop: "60px" }}>
            <List>
              <Cell
              // TODO: Добавляемый список вакансий
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Дима Шорохов
              </Cell>
            </List>
          </Group>

          <FlexDiv>
            <Button size="xl"
              onClick={() => this.props.dispatch(locationActions.changeLocation('create_vacancy'))}>
                Создать вакансию
            </Button>
          </FlexDiv>
        </Panel>

        <Panel id="students">
					<PanelHeader noShadow>
						Активные
					</PanelHeader>
          <ChangeTab />
          <Group style={{ marginTop: "60px" }}>
            <List>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
            </List>
          </Group>
        </Panel>
      </View>
		);
	}
};

const mapStateToProps = state => {
  const { students } = state.apiReducer;
  const { userInfo } = state.vkReducer;
  const { activePanel } = state.locationReducer;
  return {
    students, userInfo, activePanel,
  };
}

export default connect(mapStateToProps)(ActiveTutor);
