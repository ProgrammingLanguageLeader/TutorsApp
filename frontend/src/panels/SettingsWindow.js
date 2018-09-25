import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Div, Cell, Avatar, Button, List, Group, InfoRow} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Settings from '@vkontakte/icons/dist/24/settings';

const osname = platform();

const SettingsWindow = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<HeaderButton onClick={props.go} data-to="search">
				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
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
);

SettingsWindow.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default SettingsWindow;