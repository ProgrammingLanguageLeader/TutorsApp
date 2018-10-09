import React from 'react';
import { connect } from 'react-redux';
import {
	View, Panel, PanelHeader, HeaderButton, Div, Button
} from '@vkontakte/vkui';

import BackIcon from '../components/BackIcon';

import { locationActions } from '../actions/location';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		
		this.editButtonClick = this.editButtonClick.bind(this);
		this.deleteButtonClick = this.deleteButtonClick.bind(this);
	}

	editButtonClick() {
		// WTF ?!
		// TODO: create edit vacancy component
		this.props.dispatch(
			locationActions.changeLocation('create_vacancy')
		);
	}

	deleteButtonClick() {
		// TODO: delete vacancy action
		this.this.props.dispatch(
			locationActions.changeLocation('start')
		);
	}

	render() {
		return (
			<View id={this.props.id} activePanel="settings">
				<Panel id="settings">
					<PanelHeader
						left={
							<HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Настройки
					</PanelHeader>
					<Div>
						<Button size="xl" level="2" onClick={this.editButtonClick}>
							Редактировать
						</Button>
					</Div>
					<Div>
						<Button size="xl" level="2" onClick={this.deleteButtonClick}>
							Удалить
						</Button>
					</Div>
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(Settings);