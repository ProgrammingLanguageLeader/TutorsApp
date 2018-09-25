import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Cell, Avatar, Button, List, Group, InfoRow} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

const Vacancy = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<HeaderButton onClick={props.go} data-to="search">
				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			Поиск
		</PanelHeader>
		
		<Group title="Информация о репетиторе">
			
        <List>
			<Cell
			size="l"
			description="Школьный учитель, Возраст: 20"
			before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
			bottomContent={<Button onClick={props.go} data-to="contact_window">Связаться</Button>}
			>
			Артур Стамбульцян
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
      </Group>
	  <Group title="Преподаваемые предметы">
		  <Cell>
            	<InfoRow title="Математика">
            		от 1000 руб/60 мин
            	</InfoRow>
        	</Cell>
	  </Group>
	</Panel>
);

Vacancy.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Vacancy;
