import React from 'react';
import {
	Panel, PanelHeader, HeaderButton, platform, IOS, Cell, List, Group, FormLayout, View, SelectMimicry, Root
} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();


class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subject: '',
			activeView: 'filter'
		};

		this.changeSubject = this.changeSubject.bind(this);
		this.switchToSubjectsView = this.switchToSubjectsView.bind(this);
	}

	changeSubject(newSubject) {
		this.setState({
			subject: newSubject
		});
	}

	switchToSubjectsView(activeView) {
		this.setState({
			activeView: 'subjects'
		});
	}

	render() {
		return (
			<Root activeView={this.state.activeView}>
				<View activePanel="filter" id="filter">
					<Panel id="filter" theme="white">
						<PanelHeader left={
							<HeaderButton onClick={this.props.go} data-to="search">
								{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
							</HeaderButton>}
						>
							Фильтр
						</PanelHeader>
						<FormLayout>
							<SelectMimicry
								top="Выберите предмет"
								placeholder="Не выбран"
								onClick={this.switchToSubjectsView}
							>
								{this.state.subject}
							</SelectMimicry>
						</FormLayout>
					</Panel>
				</View>
				<View activePanel="subjects" id="subjects">
					<Panel id="subjects">
						<PanelHeader
							left={
								<HeaderButton onClick={this.props.go} data-to="search">
									{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
								</HeaderButton>
							}
						>
							Выбор предмета
						</PanelHeader>
						<Group>
							<List>
								<Cell onClick={() => this.setState({ subject: 'Математика', activeView: 'filter' })}>
									Математика
								</Cell>
								<Cell onClick={() => this.setState({ subject: 'Физика', activeView: 'filter' })}>
									Физика
								</Cell>
								<Cell onClick={() => this.setState({ subject: 'Русский язык', activeView: 'filter' })}>
									Русский язык
								</Cell>
								<Cell onClick={() => this.setState({ subject: 'Английский язык', activeView: 'filter' })}>
									Английский язык
								</Cell>
							</List>
						</Group>
					</Panel>
				</View>
		  </Root>
		);
	}
};

export default Filter;

