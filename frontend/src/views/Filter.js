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
			activePanel: 'filter'
		};
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
							placeholder="Не выбран"
							onClick={() => this.setState({ activePanel: 'subjects'})}
						>
							{this.state.subject}
						</SelectMimicry>
					</FormLayout>
				</Panel>

				<Panel id="subjects">
					<PanelHeader
						left={
							<HeaderButton onClick={this.props.go} data-to="search">
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
			</View>
		);
	}
};

export default Filter;

