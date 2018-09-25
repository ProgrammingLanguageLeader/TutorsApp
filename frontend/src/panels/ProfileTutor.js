import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Div, Cell, Avatar, Button, List, Group, InfoRow} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Settings from '@vkontakte/icons/dist/24/settings';

const osname = platform();

const ProfileTutor = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<HeaderButton onClick={props.go} data-to="search">
				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			Репетитор
		</PanelHeader>
			
        <List>
			<Cell
			size="l"
			description="Школьный учитель, Возраст: 20"
			before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
			asideContent={<Settings onClick={props.go} data-to="settings_window"/>}
			>
			Артур Стамбульцян
			</Cell>
			
			<Cell>
				<Button onClick={props.go} data-to="students">Ученики</Button>
			</Cell>
        	<Cell>
            	<InfoRow title="Стаж">
            		2 года
        		</InfoRow>
        	</Cell>
        	<Cell>
            	<InfoRow title="Образование">
              		РЭУ им. Г.В.Плеханова
            	</InfoRow>
          	</Cell>
			<Cell>
            	<InfoRow title="Адрес">
            		Москва, ул. Удальцова
            	</InfoRow>
        	</Cell>
        </List>
	  <Group title="Преподаваемые предметы">
		  <Cell>
            	<InfoRow title="Математика">
            		от 1000 руб/60 мин
            	</InfoRow>
        	</Cell>
	  </Group>

	</Panel>
);

ProfileTutor.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default ProfileTutor;
