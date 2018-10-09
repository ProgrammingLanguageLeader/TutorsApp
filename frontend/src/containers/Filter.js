import React from 'react';
import { connect } from 'react-redux';
import {
	View, Panel, PanelHeader, Cell, List, Group, FormLayout, 
	FixedLayout, Button, SelectMimicry, HeaderButton, RangeSlider, colors,
	platform, IOS
} from '@vkontakte/vkui';

import BackIcon from '../components/BackIcon';
import FlexDiv from '../components/FlexDiv';

import Icon24Done from '@vkontakte/icons/dist/24/done';
import { locationActions } from '../actions/location';
import { filterActions } from '../actions/filter';


const initialState = {
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

const osname = platform();

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;

		this.returnToFilterPanel = this.returnToFilterPanel.bind(this);
		this.applyButtonClick = this.applyButtonClick.bind(this);
		this.deleteButtonClick = this.deleteButtonClick.bind(this);
		this.updateStudyLevel = this.updateStudyLevel.bind(this);
		this.updateStateFromFilterReducer = this.updateStateFromFilterReducer.bind(this);
	}

	componentDidMount() {
		this.updateStateFromFilterReducer();
	}

	updateStateFromFilterReducer() {
		this.setState({
			...this.props.filterReducer,
		}, () => {
			let studyLevel = '';
			if (this.state.primary_school)
				studyLevel = 'primary_school';
			else if (this.state.secondary_school)
				studyLevel = 'secondary_school';
			else if (this.state.olympiads)
				studyLevel = 'olympiads';
			else if (this.state.ege)
				studyLevel = 'ege';
			else if (this.state.oge)
				studyLevel = 'oge';
			else if (this.state.university)
				studyLevel = 'university';
			this.updateStudyLevel(studyLevel);
		});
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
			filterActions.updateFilter(params)
		);
		this.props.dispatch(
			locationActions.changeLocation('search')
		);
	}

	deleteButtonClick() {
		this.setState({
			...initialState,
		});
		this.props.dispatch(
			filterActions.deleteFilter()
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
					<FormLayout style={{ paddingBottom: 60 }}>
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
							value={[this.state.price_min, this.state.price_max]}
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
					<FixedLayout vertical="bottom" style={{ marginBottom: osname === IOS ? 0 : 48 }}>
						<FlexDiv>
							<Button size="l" stretched style={{	marginRight: "8px" }} onClick={this.applyButtonClick}>
								Применить
							</Button>
							<Button size="l" stretched style={{ background: "#E64646" }} stretched onClick={this.deleteButtonClick}>
								Очистить
							</Button>
						</FlexDiv>
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
							<Cell
								onClick={() => this.setState({ subject: 'Математика', activePanel: 'filter' })}
								asideContent={this.state.subject === 'Математика' ? <Icon24Done fill={colors.blue_300} /> : null}
							>
								Математика
							</Cell>
							<Cell
								onClick={() => this.setState({ subject: 'Физика', activePanel: 'filter' })}
								asideContent={this.state.subject === 'Физика' ? <Icon24Done fill={colors.blue_300} /> : null}
							>
								Физика
							</Cell>
							<Cell
								onClick={() => this.setState({ subject: 'Русский язык', activePanel: 'filter' })}
								asideContent={this.state.subject === 'Русский язык' ? <Icon24Done fill={colors.blue_300} /> : null}
								>
								Русский язык
							</Cell>
							<Cell
								onClick={() => this.setState({ subject: 'Английский язык', activePanel: 'filter' })}
								asideContent={this.state.subject === 'Английский язык' ? <Icon24Done fill={colors.blue_300} /> : null}
							>
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
							<Cell 
								onClick={() => this.updateStudyLevel('primary_school')}
								asideContent={this.state.primary_school === true ? <Icon24Done fill={colors.blue_300} /> : null}
							>
								Начальная школа
							</Cell>
							<Cell
								onClick={() => this.updateStudyLevel('secondary_school')}							
								asideContent={this.state.secondary_school === true ? <Icon24Done fill={colors.blue_300} /> : null}
							>
								Средняя школа
							</Cell>
              <Cell
								onClick={() => this.updateStudyLevel('olympiads')}
								asideContent={this.state.olympiads === true ? <Icon24Done fill={colors.blue_300} /> : null}
							>
								Олимпиады
							</Cell>
							<Cell
								onClick={() => this.updateStudyLevel('oge')}
								asideContent={this.state.oge === true ? <Icon24Done fill={colors.blue_300} /> : null}
							>
								Подготовка к ОГЭ
							</Cell>
							<Cell
								onClick={() => this.updateStudyLevel('ege')}
								asideContent={this.state.ege === true ? <Icon24Done fill={colors.blue_300} /> : null}
							>
								Подготовка к ЕГЭ
							</Cell>
							<Cell
								onClick={() => this.updateStudyLevel('university')}
								asideContent={this.state.university === true ? <Icon24Done fill={colors.blue_300} /> : null}	
							>
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
	const { filterReducer } = state;
	return {
		filterReducer, 
	};
}

export default connect(mapStateToProps)(Filter);
