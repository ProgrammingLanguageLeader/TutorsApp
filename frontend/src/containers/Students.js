import React from 'react';
import { connect } from 'react-redux';
import {
	View, Panel, PanelHeader, HeaderButton, Cell, Avatar, List, Group
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';

import { locationActions } from '../actions/location';

class Students extends React.Component {
	render() {
		return (
			<View id={this.props.id} activePanel="students">
				<Panel id="students">
					<PanelHeader
						left={
							<HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Поиск
					</PanelHeader>
					<Group title="Ученики">
						<List>
							<Cell
								size="l"
								description="89045678463. Москва, ул. Удальцова, д. 4"
								before={
									<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>
								}
							>
								Артурка
							</Cell>
						</List>
					</Group>
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(Students);
