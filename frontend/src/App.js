import React from 'react';
import { connect } from 'react-redux';
import '@vkontakte/vkui/dist/vkui.css';
import { Route, Redirect } from 'react-router-dom';

// import Home from './containers/Home';
import Search from './containers/Search';
import Profile from './containers/Profile';
import CreateVacancy from './containers/CreateVacancy';
import Contact from './containers/Contact';
import Settings from './containers/Settings';
import Filter from './containers/Filter';
import Students from './containers/Students';
import Start from './containers/Start';

import { vkActions } from './actions/vk';

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

class App extends React.Component {
	componentDidMount() {
		this.props.dispatch(vkActions.init());
    	this.props.dispatch(vkActions.fetchAccessToken());
	}

	render() {
		return (
			<div>
				{/* <PrivateRoute exact path="/" component={Home} /> */}
				<PrivateRoute exact path="/" component={Start} />
				<PrivateRoute path="/search" component={Search} />
				<PrivateRoute path="/profile" component={Profile} />
				<PrivateRoute path="/create_vacancy" component={CreateVacancy} />
				<PrivateRoute path="/contact" component={Contact} />
				<PrivateRoute path="/settings" component={Settings} />
				<PrivateRoute path="/filter" component={Filter} />
				<PrivateRoute path="/students" component={Students} />
				<Route path="/start" component={Start} />
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		...state
	};
}

export default connect(mapStateToProps)(App);
