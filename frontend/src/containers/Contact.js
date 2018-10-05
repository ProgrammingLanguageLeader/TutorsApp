import React from 'react';
import { connect } from 'react-redux';
import {
	View, Panel, PanelHeader, HeaderButton, Cell, Avatar, Button, Input, FormLayout
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';

import { locationActions } from '../actions/location';

class Contact extends React.Component {
	constructor(props) {
		super(props);

		this.sendApplication = this.sendApplication.bind(this);
	}

	sendApplication() {
		locationActions.changeLocation('search')
	}

	render() {
		return (
			<View id={this.props.id} activePanel="contact">
				<Panel id="contact" theme="white">
					<PanelHeader
						left={
							<HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Подача заявки
					</PanelHeader>
					<Cell
						size="l"
						before={
							<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>
						}
					>
						Что-то осмысленное
					</Cell>
					<FormLayout>
						<Input top="Телефон" defaultValue="+79817298687"/>
						<Input top="Адрес" defaultValue="Москва, ул. Удальцова"/>
						<Button size="xl" onClick={this.sendApplication}>
							Отправить заявку
						</Button>
					</FormLayout>
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = state => {
	return state;
}

export default connect(mapStateToProps)(Contact);
