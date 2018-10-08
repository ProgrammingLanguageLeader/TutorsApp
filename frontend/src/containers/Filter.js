import React from 'react';
import { connect } from 'react-redux';
import {
	View, Panel, PanelHeader, Div, Cell, List, Group, FormLayout, FixedLayout, Button, SelectMimicry, HeaderButton
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';

import { locationActions } from '../actions/location';

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subject: '',
			price: '',
			experience: '',
			study_level: '',
			activePanel: 'filter'
		};

		this.returnToFilterPanel = this.returnToFilterPanel.bind(this);
		this.applyButtonClick = this.applyButtonClick.bind(this);
	}

	returnToFilterPanel() {
		this.setState({ 
			activePanel: 'filter'
		});
	}

	applyButtonClick() {
		this.props.dispatch(
			locationActions.changeLocation('search')
		);
	}

	render() {
		return (
			<View id={this.props.id} activePanel={this.state.activePanel}>
				<Panel id="filter" theme="white">
					<PanelHeader
						left={
							<HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Фильтр
					</PanelHeader>
					<FormLayout>
						<SelectMimicry
							top="Предмет"
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
						<SelectMimicry
							top="Уровень обучения"
							placeholder="Любой"
							onClick={() => this.setState({ activePanel: 'study_level'})}
						>
							{this.state.study_level}
						</SelectMimicry>
					</FormLayout>
					<FixedLayout vertical="bottom">
						<Div>
							<Button size="l" stretched onClick={this.applyButtonClick}>
								Применить
							</Button>
						</Div>
					</FixedLayout>
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
						Цена за час
					</PanelHeader>
					<Group>
						<List>
							<Cell onClick={() => this.setState({ price: '500-1000', activePanel: 'filter' })}>
								500-1000 руб.
							</Cell>
							<Cell onClick={() => this.setState({ price: '1000-1500', activePanel: 'filter' })}>
								1000-1500 руб.
							</Cell>
							<Cell onClick={() => this.setState({ price: '1500-2000', activePanel: 'filter' })}>
								1500-2000 руб.
							</Cell>
              <Cell onClick={() => this.setState({ price: 'Более 2000 руб.', activePanel: 'filter' })}>
								Более 2000 руб.
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
						Стаж преподавания
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

				<Panel id="study_level">
					<PanelHeader
						left={
							<HeaderButton onClick={this.returnToFilterPanel}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Уровень обучения
					</PanelHeader>
					<Group>
						<List>
							<Cell onClick={() => this.setState({ study_level: 'Начальная школа', activePanel: 'filter' })}>
								Начальная школа
							</Cell>
							<Cell onClick={() => this.setState({ study_level: 'Средняя школа', activePanel: 'filter' })}>
								Средняя школа
							</Cell>
              <Cell onClick={() => this.setState({ study_level: 'Средняя школа', activePanel: 'filter' })}>
								Олимпиады
							</Cell>
							<Cell onClick={() => this.setState({ study_level: 'Подготовка к ОГЭ', activePanel: 'filter' })}>
								Подготовка к ОГЭ
							</Cell>
							<Cell onClick={() => this.setState({ study_level: 'Подготовка к ЕГЭ', activePanel: 'filter' })}>
								Подготовка к ЕГЭ
							</Cell>
							<Cell onClick={() => this.setState({ study_level: 'Курс высшего образования', activePanel: 'filter' })}>
								Курс высшего образования
							</Cell>
						</List>
					</Group>
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = state => {
	return state;
}

export default connect(mapStateToProps)(Filter);