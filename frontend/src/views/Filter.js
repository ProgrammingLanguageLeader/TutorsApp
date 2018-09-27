import React from 'react';
import {
	View, Panel, PanelHeader, Cell, List, Group, FormLayout, SelectMimicry, HeaderButton
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subject: '',
			price: '',
			experience: '',
			activePanel: 'filter'
		};

		this.returnToFilterPanel = this.returnToFilterPanel.bind(this);
	}

	returnToFilterPanel() {
		this.setState({ 
			activePanel: 'filter'
		});
	}

	render() {
		return (
			<View id={this.props.id} activePanel={this.state.activePanel}>
				<Panel id="filter">
					<PanelHeader 
						left={
							<HeaderButton onClick={this.props.go} data-to="search">
								<BackIcon />
							</HeaderButton>
						}
					>
						Фильтр
					</PanelHeader>
					<FormLayout>
						<SelectMimicry
							top="Выберите предмет"
							placeholder="Любой"
							onClick={() => this.setState({ activePanel: 'subjects'})}
						>
							{this.state.subject}
						</SelectMimicry>
						<SelectMimicry
							top="Цена"
							placeholder="Любая"
							onClick={() => this.setState({ activePanel: 'price'})}
						>
							{this.state.price}
						</SelectMimicry>
						<SelectMimicry
							top="Стаж преподавания"
							placeholder="Любой"
							onClick={() => this.setState({ activePanel: 'experience'})}
						>
							{this.state.experience}
						</SelectMimicry>
					</FormLayout>
				</Panel>

				<Panel id="subjects">
					<PanelHeader
						left={
							<HeaderButton onClick={this.returnToFilterPanel}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Выбор предмета
					</PanelHeader>
					<Group>
						<List>
							<Cell onClick={() => this.setState({ subject: 'Математика', activePanel: 'filter' })}>
								Математика
							</Cell>
							<Cell onClick={() => this.setState({ subject: 'Физика', activePanel: 'filter' })}>
								Физика
							</Cell>
							<Cell onClick={() => this.setState({ subject: 'Русский язык', activePanel: 'filter' })}>
								Русский язык
							</Cell>
							<Cell onClick={() => this.setState({ subject: 'Английский язык', activePanel: 'filter' })}>
								Английский язык
							</Cell>
						</List>
					</Group>
				</Panel>

				<Panel id="price">
					<PanelHeader
						left={
							<HeaderButton onClick={this.returnToFilterPanel}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Цена
					</PanelHeader>
					<Group>
						<List>
							<Cell onClick={() => this.setState({ price: '500-1000', activePanel: 'filter' })}>
								500-1000
							</Cell>
							<Cell onClick={() => this.setState({ price: '1000-1500', activePanel: 'filter' })}>
								1000-1500
							</Cell>
							<Cell onClick={() => this.setState({ price: '1500-2000', activePanel: 'filter' })}>
								1500-2000
							</Cell>
						</List>
					</Group>
				</Panel>

				<Panel id="experience">
					<PanelHeader
						left={
							<HeaderButton onClick={this.returnToFilterPanel}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Стаж работы
					</PanelHeader>
					<Group>
						<List>
							<Cell onClick={() => this.setState({ experience: 'Меньше года', activePanel: 'filter' })}>
								Меньше года
							</Cell>
							<Cell onClick={() => this.setState({ experience: '1-2 года', activePanel: 'filter' })}>
								1-2 года
							</Cell>
							<Cell onClick={() => this.setState({ experience: '3-5 лет', activePanel: 'filter' })}>
								3-5 лет
							</Cell>
							<Cell onClick={() => this.setState({ experience: '5-10 лет', activePanel: 'filter' })}>
								5-10 лет
							</Cell>
							<Cell onClick={() => this.setState({ experience: 'Более 10 лет', activePanel: 'filter' })}>
								Более 10 лет
							</Cell>
						</List>
					</Group>
				</Panel>
			</View>
		);
	}
};

export default Filter;
