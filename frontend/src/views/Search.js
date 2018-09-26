import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader, HeaderButton, platform, IOS, Cell, Tabs, Group, TabsItem, Button } from '@vkontakte/vkui';

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
		this.setState({
			tutors: tutors
		});
	}

	render() {
		return (
			<View id={this.props.id} activePanel="search">
				<Panel id="search">
					<PanelHeader
						left={
							<HeaderButton onClick={this.props.go} data-to="home">
								<BackIcon />
							</HeaderButton>
						}
					>
						Поиск
					</PanelHeader>
					<Group>
						<Tabs theme="light">
							<TabsItem
								onClick={() => this.setState({ activeTab: 'all' })}
								selected={this.state.activeTab === 'all'}
							>
								Все
							</TabsItem>
							<TabsItem
								onClick={() => this.setState({ activeTab: 'active' })}
								selected={this.state.activeTab === 'active'}
							>
								Активные
							</TabsItem>
						</Tabs>
					</Group>
					<Button size="xl" onClick={this.props.go} data-to="filter">Фильтр</Button>
					<Cell>Здесь будут компенты с информацией о вакансиях</Cell>
					{ this.state.tutors.map((tutor, index) => {
						return <Cell key={index}>ID: {tutor.user}</Cell>
					}) }
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
