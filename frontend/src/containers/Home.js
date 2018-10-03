import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, View } from '@vkontakte/vkui';

import CircleButton from '../customComponents/CircleButton';
import CenteredDiv from '../customComponents/CenteredDiv';
import FlexDiv from '../customComponents/FlexDiv';
import BackgroundDiv from '../customComponents/BackgroundDiv';
import student from '../img/student.jpg';

class Home extends React.Component {
	render() {
		return (
			<View activePanel="home">
				<Panel id="home">
					<PanelHeader>Tutor</PanelHeader>
					<BackgroundDiv image={student}>
						<CenteredDiv>
							<FlexDiv>
								<CircleButton data-to="search">
									Найти репетитора
								</CircleButton>
								<CircleButton data-to="edit_profile">
									Я - репетитор
								</CircleButton>
							</FlexDiv>
						</CenteredDiv>
					</BackgroundDiv>
				</Panel>
			</View>
		);
	}
};

export default Home;