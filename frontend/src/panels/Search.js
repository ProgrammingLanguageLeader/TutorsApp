import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Cell, Avatar, Tabs, Group, TabsItem, Button} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import { getActiveVacancies } from '../services/backend';

const osname = platform();

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab1: 'all',
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
			<Panel id={this.props.id}>
				<PanelHeader
					left={
						<HeaderButton onClick={this.props.go} id="home">
							{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
						</HeaderButton>
					}
				>
					Поиск
				</PanelHeader>
				<Group>
					<Tabs theme="light">
						<TabsItem
							onClick={() => this.setState({ activeTab1: 'all' })}
							selected={this.state.activeTab1 === 'all'}
						>
							Все
						</TabsItem>
						<TabsItem
							onClick={() => this.setState({ activeTab1: 'active' })}
							selected={this.state.activeTab1 === 'active'}
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
		);
	}
};

Search.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Search;
