import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader, HeaderButton, Cell, Group, Div, Button } from '@vkontakte/vkui';

import { getActiveVacancies } from '../services/backend';
import BackIcon from '../customComponents/BackIcon';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'all',
			tutors: []
		};
	}

	async componentDidMount() {
		const tutors = await getActiveVacancies();
		if (!tutors) {
			return;
		}
		this.setState({
			tutors: tutors
		});
	}

	render() {
		return (
			<View id={this.props.id} activePanel="search">
				<Panel id="search">
					<PanelHeader noShadow
						left={
							<HeaderButton onClick={this.props.go} data-to="home">
								<BackIcon />
							</HeaderButton>
						}
					>
						Поиск репетиторов
					</PanelHeader>
					<Group>
						<Div>
							<Button size="xl" onClick={this.props.go} data-to="filter">Фильтр</Button>
						</Div>
						<Cell>Здесь будут компенты с информацией о вакансиях</Cell>
						{ this.state.tutors.map((tutor, index) => {
							return <Cell key={index}>ID: {tutor.user}</Cell>
						})}
					</Group>
				</Panel>
			</View>
		);
	}
};

Search.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Search;
