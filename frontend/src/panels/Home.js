import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, Avatar, PanelHeader  } from '@vkontakte/vkui';

// import { createProfile } from '../services/backend';


const Home = props => (
	<Panel id={props.id}>
		<PanelHeader>Tutor</PanelHeader>
		{props.fetchedUser &&
		<Group title="User Data Fetched with VK Connect">
			<ListItem
				before={<Avatar src={props.fetchedUser.photo_200}/>}
				description={props.fetchedUser.city.title}
			>
				{`${props.fetchedUser.first_name} ${props.fetchedUser.last_name}`}
			</ListItem>
		</Group>}
		
			<Div>
				<Button size="xl" level="2" onClick={props.go} data-to="search">
					Найти репетитора
				</Button>
			</Div>
			<Div>
				<Button size="xl" level="2" onClick={props.go} data-to="create_vacancy">
					Я - репетитор
				</Button>
			</Div>
			<Div>
				<img src="back.jpg"></img>
			</Div>
		
	</Panel>
);



Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;

