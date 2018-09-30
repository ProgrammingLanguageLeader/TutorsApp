import React from 'react';
import PropTypes from 'prop-types';
import '@vkontakte/vkui/dist/vkui.css';
import { Route, Redirect } from 'react-router-dom';

import Home from './containers/Home';
import Search from './containers/Search';
import Profile from './containers/Profile';
import CreateVacancy from './containers/CreateVacancy';
import Contact from './containers/Contact';
import SettingsWindow from './containers/SettingsWindow';
import Filter from './containers/Filter';
import Students from './containers/Students';
import Start from './containers/Start';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (true) ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/start",
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
);

const App = ({store}) => (
	<div>
		<PrivateRoute exact path="/" component={Home} />
		<PrivateRoute path="/search" component={Search} />
		<PrivateRoute path="/profile" component={Profile} />
		<PrivateRoute path="/create_vacancy" component={CreateVacancy} />
		<PrivateRoute path="/contact_window" component={Contact} />
		<PrivateRoute path="/settings_window" component={SettingsWindow} />
		<PrivateRoute path="/filter" component={Filter} />
		<PrivateRoute path="/students" component={Students} />
		<Route path="/start" component={Start} />
	</div>
);

App.propTypes = {
	store: PropTypes.object.isRequired
};

export default App;
