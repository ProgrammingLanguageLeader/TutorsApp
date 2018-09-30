import React from 'react';
import PropTypes from 'prop-types';
import {
	View, Panel, PanelHeader, HeaderButton, Cell, Avatar, Button, Group, Input, FormLayout
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';

const Contact = props => (
	<View id={props.id} activePanel="contact">
		<Panel id="contact">
			<PanelHeader
				left={
					<HeaderButton onClick={props.go} data-to="search">
						<BackIcon />
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
	</View>
);

export default Contact;
