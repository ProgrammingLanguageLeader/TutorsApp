import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Root } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './views/Home';
import Search from './views/Search';
import Profile from './views/Profile';
import CreateVacancy from './views/CreateVacancy';
import Contact from './views/Contact';
import SettingsWindow from './views/SettingsWindow';
import Filter from './views/Filter';
import Students from './views/Students';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeView: 'home',
			fetchedUser: null,
		};

		this.go = this.go.bind(this);
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ 
						fetchedUser: e.detail.data 
					});
					break;
				default:
					console.log(e.detail.type);
			}
		});

		connect.send("VKWebAppGetUserInfo", {});
	}

	go = (e) => {
		this.setState({ 
			activeView: e.currentTarget.dataset.to 
		});
	};

	render() {
		return (
			<Root activeView={this.state.activeView}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
				<Search id="search" go={this.go} />
				<Profile id="profile" go={this.go} />
				<CreateVacancy id="create_vacancy" go={this.go} />
				<Contact id="contact_window" go={this.go} />
				<SettingsWindow id="settings_window" go={this.go} />
				<Filter id="filter" go={this.go} />
				<Students id="students" go={this.go} />
			</Root>
		);
	}
}

export default App;
