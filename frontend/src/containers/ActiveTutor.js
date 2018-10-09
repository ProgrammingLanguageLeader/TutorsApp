import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, Avatar, Group, List, Button,
  platform, IOS
} from '@vkontakte/vkui';

import ChangeTab from './ChangeTab';
import FlexDiv from '../components/FlexDiv';

import { apiActions } from '../actions/api';
import { locationActions } from '../actions/location';


const osname = platform();
const ChangeTabContentDiv = styled.div
`
  margin-top: 60px;
  margin-bottom: ${osname === IOS ? 0 : 48}px;
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
          <ChangeTabContentDiv>
            <Group>
              <List>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
                <Cell
                  description="телефон"
                  before={<Avatar src={"photo_200"} />}
                >
                  Дима Шорохов
                </Cell>
              </List>
            </Group>
            <FlexDiv>
              <Button 
                size="xl"
                onClick={() => this.props.dispatch(locationActions.changeLocation('create_vacancy'))}
              >
                  Создать вакансию
              </Button>
            </FlexDiv>
          </ChangeTabContentDiv>
        </Panel>

        <Panel id="students">
					<PanelHeader noShadow>
						Активные
					</PanelHeader>
          <ChangeTab />
          <ChangeTabContentDiv>
            <List>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
              <Cell
                description="телефон"
                before={<Avatar src={"photo_200"} />}
              >
                Игорек.., ладно, не буду
              </Cell>
            </List>
          </ChangeTabContentDiv>
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
