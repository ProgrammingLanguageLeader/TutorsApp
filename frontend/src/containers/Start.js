import React from 'react';
import { connect } from 'react-redux';
import { Panel, PanelHeader, View } from '@vkontakte/vkui';

import CircleButton from '../customComponents/CircleButton';
import CenteredDiv from '../customComponents/CenteredDiv';
import BackgroundDiv from '../customComponents/BackgroundDiv';
import student from '../img/student.jpg';

class Start extends React.Component {
	constructor(props) {
		super(props);

		this.registerTutor = this.registerTutor.bind(this);
		this.registerStudent = this.registerStudent.bind(this);
	}

	registerStudent() {
		console.log('student');
	}

	registerTutor() {
		console.log('tutor');
	}

	render() {
		return (
			<View id={this.props.id} activePanel="home">
				<Panel id="home">
					<PanelHeader>Tutor</PanelHeader>
					<BackgroundDiv image={student}>
						<CenteredDiv>
							<CircleButton onClick={this.registerStudent} data-to="search">
								Найти репетитора
							</CircleButton>
							<CircleButton onClick={this.registerTutor} data-to="create_vacancy">
								Я - репетитор
							</CircleButton>
						</CenteredDiv>
					</BackgroundDiv>
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = (state) => {
	const { fetching, response, errors } = state.apiReducer;
	return {
		fetching, response, errors
	};
};

export default connect(mapStateToProps)(Start);
