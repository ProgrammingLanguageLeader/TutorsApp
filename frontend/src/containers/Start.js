import React from 'react';
import { connect } from 'react-redux';
import { Panel, PanelHeader, View, Button, InfoRow, Div, Cell, Group} from '@vkontakte/vkui';

import FlexDiv from '../components/FlexDiv';
import CenteredDiv from '../components/CenteredDiv';
import BackgroundDiv from '../components/BackgroundDiv';
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

	componentWillReceiveProps(nextProps) {
		const { id, signed_user_id } = nextProps.vkReducer.userInfo;
		this.props.dispatch(
			apiActions.createProfile({
				vk_id: id,
				user_id: id,
				signed_user_id: signed_user_id,
			})
		);
	}

	registerStudent() {
		this.props.dispatch(
			locationActions.changeLocation('search'),
		)
	}

	registerTutor() {
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
						<Group style={{ marginTop: 0 }}>
							<Div>
								Мы поможем найти вам лучшего репетитора
							</Div>
						</Group>
						<FlexDiv style={{ marginTop: "10%" }}>
							<Button stretched level="secondary" 
								style={{ width: "40%", paddingTop: "5%", paddingBottom: "5%", borderRadius: "5%"}}
								onClick={this.registerStudent}
							>
								Найти репетитора
							</Button>
							<Button 
								stretched
								level="secondary"
								style={{ width: "40%", paddingTop: "5%", paddingBottom: "5%", borderRadius: "5%", marginLeft: 8,  }} 
								onClick={this.registerTutor}
							>
								Я - репетитор
							</Button>
						</FlexDiv>
					</BackgroundDiv>
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = (state) => {
	const { vkReducer } = state;
	return {
		vkReducer
	};
};

export default connect(mapStateToProps)(Start);
