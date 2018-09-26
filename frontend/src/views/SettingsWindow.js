import React from 'react';
import PropTypes from 'prop-types';
import {
	View, Panel, PanelHeader, HeaderButton, Div, Button
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';

const SettingsWindow = props => (
	<View id={props.id} activePanel="settings">
		<Panel id="settings">
			<PanelHeader
				left={
					<HeaderButton onClick={props.go} data-to="search">
						<BackIcon />
					</HeaderButton>
				}
			>
				Настройки
			</PanelHeader>
			<Div>
				<Button size="xl" level="2" onClick={props.go} data-to="create_vacancy">
					Редактировать
				</Button>
			</Div>
			<Div>
				<Button size="xl" level="2" onClick={props.go} data-to="home">
					Удалить
				</Button>
			</Div>
    </Panel>
	</View>
);

SettingsWindow.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default SettingsWindow;