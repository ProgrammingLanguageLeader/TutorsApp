import React from 'react';
import { connect } from 'react-redux';
import { Panel, PanelHeader, View } from '@vkontakte/vkui';

import CircleButton from '../customComponents/CircleButton';
import CenteredDiv from '../customComponents/CenteredDiv';
import BackgroundDiv from '../customComponents/BackgroundDiv';
import student from '../img/student.jpg';

import { apiActions } from '../actions/api';
import { locationActions } from '../actions/location';

class Start extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			popout: null,
		};

		this.registerTutor = this.registerTutor.bind(this);
		this.registerStudent = this.registerStudent.bind(this);
	}

	registerStudent() {
		this.props.dispatch(
			apiActions.createProfile({
				vk_id: this.props.vkReducer.userInfo['id'],
				is_student: true,
			})
		);
		this.props.dispatch(
			locationActions.changeLocation('search'),
		)
	}

	registerTutor() {
		// TODO: register tutor using backend
		this.props.dispatch(
			locationActions.changeLocation('edit_profile')
		);
	}

	render() {
		return (
			<View id={this.props.id} activePanel="home">
				<Panel id="home">
					<PanelHeader>Tutor</PanelHeader>
					<BackgroundDiv image={student}>
						<CenteredDiv>
							<CircleButton onClick={this.registerStudent}>
								Найти репетитора
							</CircleButton>
							<CircleButton onClick={this.registerTutor}>
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
	const { vkReducer, apiReducer } = state;
	return {
		apiReducer, vkReducer
	};
};

export default connect(mapStateToProps)(Start);
