import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, View } from '@vkontakte/vkui';

import CircleButton from '../customComponents/CircleButton';
import CenteredDiv from '../customComponents/CenteredDiv';
import FlexDiv from '../customComponents/FlexDiv';
import BackgroundDiv from '../customComponents/BackgroundDiv';
import student from '../img/student.jpg';

const Home = (props) => (
	<View id={props.id} activePanel="home">
		<Panel id="home">
			<PanelHeader>Tutor</PanelHeader>
			<BackgroundDiv image={student}>
				<CenteredDiv>
					<FlexDiv>
						<CircleButton stretched onClick={props.go} data-to="search">
							Найти репетитора
						</CircleButton>
						<CircleButton stretched onClick={props.go} data-to="create_vacancy">
							Я - репетитор
						</CircleButton>
					</FlexDiv>
				</CenteredDiv>
			</BackgroundDiv>
		</Panel>
	</View>
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