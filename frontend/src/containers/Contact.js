import React from 'react';
import { withRouter } from 'react-router-dom';
import {
	View, Panel, PanelHeader, HeaderButton, Cell, Avatar, Button, Group, Input, FormLayout
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';

class Contact extends React.Component {
	render() {
		return (
			<View id={this.props.id} activePanel="contact">
				<Panel id="contact">
					<PanelHeader
						left={
							<HeaderButton onClick={() => this.props.history.goBack()}>
								<BackIcon />
							</HeaderButton>}
					>
						Подача заявки
					</PanelHeader>
					<Group title="Информация об ученике"> 
						<Cell
							size="l"
							before={
								<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>
							}
						>
							ОЛОЛО
						</Cell>
						<FormLayout>
							<Input top="ФИО" defaultValue="Ученик"/>
							<Input top="Телефон" defaultValue="+79817298687"/>
							<Input top="Адрес" defaultValue="Москва, ул. Удальцова"/>
							<Button size="xl" onClick={() => this.props.history.push('/search')}>
								Отправить заявку
							</Button>
						</FormLayout>
					</Group>
				</Panel>
			</View>
		);
	}
};

export default withRouter(Contact);
