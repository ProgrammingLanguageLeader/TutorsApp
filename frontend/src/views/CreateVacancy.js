import React from 'react';
import PropTypes from 'prop-types';
import {
	View, Panel, PanelHeader, HeaderButton, Cell, Avatar, Button, Input, FormLayout, CellButton, Select, Textarea
} from '@vkontakte/vkui';
import Icon24Add from '@vkontakte/icons/dist/24/add';

import BackIcon from '../customComponents/BackIcon';

class CreateVacancy extends React.Component {
	render() {
		return (
			<View id={this.props.id} activePanel="create_vacancy">
				<Panel id="create_vacancy">
					<PanelHeader
						left={
							<HeaderButton onClick={this.props.go} data-to="home">
								<BackIcon />
							</HeaderButton>
						}
					>
						Регистрация
					</PanelHeader>
					<FormLayout>
						<Cell
							size="l"
							description="Школьный учитель, Возраст: 20"
							before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
						>
							Артур Стамбульцян
						</Cell>
						<Input top="Стаж" defaultValue="2 года"/>
						<Input top="Образование" defaultValue="РЭУ им. Г.В.Плеханова"/>
						<Input top="Адрес" defaultValue="Москва, ул. Удальцова"/>
						<Select top="Предмет" placeholder="Выберите предмет" defaultValue="math">
							<option value="math">Математика</option>
							<option value="phys">Физика</option>
							<option value="rus">Русский язык</option>
							<option value="eng">Английский</option>
						</Select>
						<CellButton before={<Icon24Add />}>
							Добавить предмет
						</CellButton>
						<Input top="Оплата за 60 мин" defaultValue="1000"/>
						<Textarea top="О себе" placeholder="" />
						<Button size="xl" onClick={this.props.go} data-to="profile">
							Сохранить
						</Button>
					</FormLayout>
				</Panel>
			</View>
		);
	}
};

CreateVacancy.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default CreateVacancy;
