import React from 'react';
import { connect } from 'react-redux';
import {
	View, Panel, PanelHeader, Div, Cell, List, Group, FormLayout, FixedLayout, Button, SelectMimicry, HeaderButton, RangeSlider
} from '@vkontakte/vkui';

import BackIcon from '../components/BackIcon';

import { locationActions } from '../actions/location';
import { filterActions } from '../actions/filter';

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subject: '',
			price_min: 0,
			price_max: 1500,
			primary_school: false,
			secondary_school: false,
			olympiads: false,
			ege: false,
			oge: false,
			university: false,

			activePanel: 'filter',
			studyLevel: '',
		};

		this.returnToFilterPanel = this.returnToFilterPanel.bind(this);
		this.applyButtonClick = this.applyButtonClick.bind(this);
		this.updateStudyLevel = this.updateStudyLevel.bind(this);
	}

	returnToFilterPanel() {
		this.setState({ 
			activePanel: 'filter'
		});
	}

	applyButtonClick() {
		const { 
			subject, price_min, price_max, experience, 
			primary_school, secondary_school, olympiads, ege, 
			oge, university
		} = this.state;
		const params = {
			subject, price_min, price_max, experience, 
			primary_school, secondary_school, olympiads, ege, 
			oge, university
		};
		this.props.dispatch(
			filterActions.updateFilter(
				params
			)
		);
		this.props.dispatch(
			locationActions.changeLocation('search')
		);
	}

	updateStudyLevel(studyLevel) {
		let updatedState = {
			primary_school: false,
			secondary_school: false,
			olympiads: false,
			ege: false,
			oge: false,
			university: false,
			studyLevel: '',
			activePanel: 'filter',
		}
		switch (studyLevel) {
			case 'primary_school':
				updatedState.primary_school = true;
				updatedState.studyLevel = 'Начальная школа';
				break;

			case 'secondary_school':
				updatedState.secondary_school = true;
				updatedState.studyLevel = 'Средняя школа';
				break;

			case 'olympiads':
				updatedState.olympiads = true;
				updatedState.studyLevel = 'Олимпиады';
				break;

			case 'ege':
				updatedState.ege = true;
				updatedState.studyLevel = 'Подготовка к ЕГЭ';
				break;

			case 'oge':
				updatedState.oge = true;
				updatedState.studyLevel = 'Подготовка к ОГЭ';
				break;

			case 'university':
				updatedState.university = true;
				updatedState.studyLevel = 'Курс высшего образования';
				break;

			default:
				console.log('Unsupported study level');
				break;
		}
		this.setState(updatedState);
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
						
						<RangeSlider 
							top={`Цена - (от ${this.state.price_min} до ${this.state.price_max} рублей/час)`}
							min={0}
							max={5000}
							step={100}
							defaultValue={[this.state.price_min, this.state.price_max]}
							onChange={([price_min, price_max]) => this.setState({ price_min: price_min, price_max: price_max })}
						/>
						
						<SelectMimicry
							top="Уровень обучения"
							placeholder="Любой"
							onClick={() => this.setState({ activePanel: 'study_level'})}
						>
							{this.state.studyLevel}
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
							<Cell onClick={() => this.updateStudyLevel('primary_school')}>
								Начальная школа
							</Cell>
							<Cell onClick={() => this.updateStudyLevel('secondary_school')}>
								Средняя школа
							</Cell>
              <Cell onClick={() => this.updateStudyLevel('olympiads')}>
								Олимпиады
							</Cell>
							<Cell onClick={() => this.updateStudyLevel('oge')}>
								Подготовка к ОГЭ
							</Cell>
							<Cell onClick={() => this.updateStudyLevel('ege')}>
								Подготовка к ЕГЭ
							</Cell>
							<Cell onClick={() => this.updateStudyLevel('university')}>
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
