import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Search from './panels/Search';
import Vacancy from './panels/Vacancy';
import CreateVacancy from './panels/CreateVacancy';
import ProfileTutor from './panels/ProfileTutor';
import Contact from './panels/Contact';
import SettingsWindow from './panels/SettingsWindow';
import Filter from './panels/Filter';
import ToolBar from './panels/ToolBar';
import Students from './panels/Students';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});

		connect.send("VKWebAppGetUserInfo", {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
				<Search id="search" go={this.go} />
				<Vacancy id="vacancy" go={this.go} />
				<CreateVacancy id="create_vacancy" go={this.go} />
				<ProfileTutor id="profile_tutor" go={this.go} />
				<Contact id="contact_window" go={this.go} />
				<SettingsWindow id="settings_window" go={this.go} />
				<Filter id="filter" go={this.go} />
				<ToolBar id="toolbar" go={this.go} />
				<Students id="students" go={this.go} />
			</View>
		);
	}
}

export default App;
