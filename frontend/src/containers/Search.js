import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { View, Panel, PanelHeader, HeaderButton, Cell, Group, Div, Button } from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';
import { apiActions } from '../actions/api';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'all'
		};
	}

	componentDidMount() {
		this.props.dispatch(
			apiActions.makeRequest('get_active_vacancies', 'get', {})
		);
	}

	render() {
		const vacanciesFetched = !this.props.fetching && 
			this.props.errors.length === 0 &&
			this.props.vacancies;

		return (
			<View id={this.props.id} activePanel="search">
				<Panel id="search">
					<PanelHeader noShadow
						left={
							<HeaderButton onClick={() => this.props.history.goBack()}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Поиск репетиторов
					</PanelHeader>
					<Group>
						<Div>
							<Button size="xl" onClick={() => this.props.history.push('/filter')}>
								Фильтр
							</Button>
						</Div>
						<Cell>Здесь будут компенты с информацией о вакансиях</Cell>
						{ vacanciesFetched && this.props.vacancies.map((vacancy, index) => {
							return <Cell key={index}>ID: {vacancy.user}</Cell>
						})}
					</Group>
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = state => {
	const { fetching, errors, response } = state.apiReducer;
	return {
		vacancies: response,
		fetching,
		errors
	};
};

export default withRouter(connect(mapStateToProps)(Search));
