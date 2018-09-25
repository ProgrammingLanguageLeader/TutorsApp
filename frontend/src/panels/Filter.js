import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Div, Cell, Avatar, Button, List, Group, InfoRow, FormLayout, View, Icon24Done, SelectMimicry, colors, Root} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Settings from '@vkontakte/icons/dist/24/settings';

const osname = platform();


class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subject: '',
			activeView: 'filter'
		};
	}
	render() {
		return (
	  <Root activeView={this.state.activeView}>
			<View activePanel="filter" id="filter">
				<Panel id="filter" theme="white">
					<PanelHeader 
						left={<HeaderButton onClick={this.props.go} data-to="home">
						{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
						</HeaderButton>}>
						Фильтр
				</PanelHeader>
				<FormLayout>
					<SelectMimicry
					top="Выберите предмет"
					placeholder="Не выбрана"
					onClick={() => this.setState({ activeView: 'subjects' })}
					>{this.state.subject}</SelectMimicry>
				</FormLayout>
				</Panel>
			</View>
			<View activePanel="subjects" id="subjects">
				<Panel id="subjects">
				<PanelHeader
				left={<HeaderButton onClick={this.props.go} data-to="home">
						{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
						</HeaderButton>}>
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
}
<Filter />

export default Filter;

