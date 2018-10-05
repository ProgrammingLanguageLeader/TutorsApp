import React from 'react';
import { connect } from 'react-redux';
import '@vkontakte/vkui/dist/vkui.css';
import { Root } from '@vkontakte/vkui';

import Search from './containers/Search';
import Profile from './containers/Profile';
import CreateVacancy from './containers/CreateVacancy';
import Contact from './containers/Contact';
import Settings from './containers/Settings';
import Filter from './containers/Filter';
import Students from './containers/Students';
import Start from './containers/Start';

import { vkActions } from './actions/vk';

class App extends React.Component {
	componentDidMount() {
		this.props.dispatch(vkActions.init());
		this.props.dispatch(vkActions.fetchCurrentUserInfo());
    this.props.dispatch(vkActions.fetchAccessToken());
	}

	render() {
		return (
			<Root activeView={this.props.activeView}>
				<Start id="start" />
				<Search id="search" />
				<Profile id="profile" />
				<CreateVacancy id="create_vacancy" />
				<Contact id="contact" />
				<Settings id="settings" />
				<Filter id="filter" />
				<Students id="student" />
			</Root>
		);
	}
};

const mapStateToProps = (state) => {
	const { activeView } = state.locationReducer;
	return {
		activeView,
	};
}

export default connect(mapStateToProps)(App);
