import React from 'react';
import { withRouter } from 'react-router-dom';
import {
	View, Panel, PanelHeader, HeaderButton, Div, Button
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';

class Settings extends React.Component {
	render() {
		return (
			<View id={this.props.id} activePanel="settings">
				<Panel id="settings">
					<PanelHeader
						left={
							<HeaderButton onClick={() => this.props.history.goBack()}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Настройки
					</PanelHeader>
					<Div>
						<Button size="xl" level="2" onClick={() => this.props.history.push('/create_vacancy')}>
							Редактировать
						</Button>
					</Div>
					<Div>
						<Button size="xl" level="2" onClick={() => this.props.history.push('/')}>
							Удалить
						</Button>
					</Div>
				</Panel>
			</View>
		);
	}
};

export default withRouter(Settings);