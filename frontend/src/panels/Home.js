import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Avatar, PanelHeader  } from '@vkontakte/vkui';

import CircleButton from '../customComponents/CircleButton';
import CenteredDiv from '../customComponents/CenteredDiv';
import FlexDiv from '../customComponents/FlexDiv';
import BackgroundDiv from '../customComponents/BackgroundDiv';
import student from '../img/student.jpg';


class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Panel id={this.props.id}>
				<PanelHeader>Tutor</PanelHeader>
				{this.props.fetchedUser &&
				<Group title="User Data Fetched with VK Connect">
					<ListItem
						before={<Avatar src={this.props.fetchedUser.photo_200}/>}
						description={this.props.fetchedUser.city.title}
					>
						{`${this.props.fetchedUser.first_name} ${this.props.fetchedUser.last_name}`}
					</ListItem>
				</Group>
				}

				<BackgroundDiv image={student}>
					<CenteredDiv>
						<FlexDiv>
							<CircleButton stretched onClick={this.props.go} data-to="search">
								Найти репетитора
							</CircleButton>
							<CircleButton stretched onClick={this.props.go} data-to="create_vacancy">
								Я - репетитор
							</CircleButton>
						</FlexDiv>
					</CenteredDiv>
				</BackgroundDiv>
			</Panel>
		);
	}
};

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

