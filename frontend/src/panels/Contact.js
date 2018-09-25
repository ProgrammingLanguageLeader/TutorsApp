import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Div, Cell, Avatar, Button, List, Group, InfoRow, Input, FormLayout} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

const Contact = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<HeaderButton onClick={props.go} data-to="search">
				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			Подача заявки
		</PanelHeader>
		
		<Group title="Информация об ученике">
			
       
			<Cell
			size="l"
			before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
			>
			ОЛОЛО
			</Cell>
		<FormLayout>
			<Input top="ФИО" defaultValue="Ученик"/>
			<Input top="Телефон" defaultValue="+79817298687"/>
			<Input top="Адрес" defaultValue="Москва, ул. Удальцова"/>
			<Button size="xl" onClick={props.go} data-to="search">Отправить заявку</Button>

        </FormLayout>
      </Group>
	  
	</Panel>
);

Contact.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Contact;
