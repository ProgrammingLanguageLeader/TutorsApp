import React from 'react';
import { connect } from 'react-redux';
import '@vkontakte/vkui/dist/vkui.css';
import { Root, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';

import Icon28Document from '@vkontakte/icons/dist/28/document';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28User from '@vkontakte/icons/dist/28/user';

import Search from './containers/Search';
import ShowProfile from './containers/ShowProfile';
import CreateVacancy from './containers/CreateVacancy';
import EditProfile from './containers/EditProfile';
import Contact from './containers/Contact';
import ActiveTutor from './containers/ActiveTutor';
import Settings from './containers/Settings';
import Filter from './containers/Filter';
import Students from './containers/Students';
import Start from './containers/Start';

import { vkActions } from './actions/vk';
import { locationActions } from './actions/location';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStory: 'root',
		}
	}

	componentDidMount() {
		this.props.dispatch(vkActions.init());
		this.props.dispatch(vkActions.fetchCurrentUserInfo());
		// Можем ли мы не спрашивать токен каждый раз?
		this.props.dispatch(vkActions.fetchAccessToken());
	}

	render() {
		const { activeView, activePanel } = this.props;

		return (
			<Epic activeStory="root" tabbar={
					<Tabbar>
						<TabbarItem
							onClick={() => this.props.dispatch(locationActions.changeLocation('search'))}
							selected={this.props.activeView === 'search'}
						>
							<Icon28Search />
						</TabbarItem>
						<TabbarItem
							onClick={() => this.props.dispatch(locationActions.changeLocation('active_tutor', 'requests'))}
							selected={this.props.activeView === 'active_tutor'}
						>
							<Icon28Document />
						</TabbarItem>
						<TabbarItem
							onClick={() => this.props.dispatch(locationActions.changeLocation('show_profile'))}
							selected={this.props.activeView === 'show_profile'}
						>
							<Icon28User />
						</TabbarItem>
					</Tabbar>
      }>
				<Root id="root" activeView={activeView}>
					<Start id="start" />
					<Search id="search" />
					<ShowProfile id="show_profile" />
					<CreateVacancy id="create_vacancy" />
					<EditProfile id="edit_profile" />
					<Contact id="contact" />
					<ActiveTutor id="active_tutor" />
					<Settings id="settings" />
					<Filter id="filter" />
					<Students id="student" />
				</Root>
			</Epic>
		);
	}
};

const mapStateToProps = (state) => {
	const { activeView, activePanel } = state.locationReducer;
	const { accessToken } = state.vkReducer;
	return {
		activeView, accessToken, activePanel
	};
}

export default connect(mapStateToProps)(App);
