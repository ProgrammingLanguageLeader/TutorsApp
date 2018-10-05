import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Panel, PanelHeader, View, Alert, Button } from '@vkontakte/vkui';

import CircleButton from '../customComponents/CircleButton';
import CenteredDiv from '../customComponents/CenteredDiv';
import BackgroundDiv from '../customComponents/BackgroundDiv';
import student from '../img/student.jpg';

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
		// TODO: register student using backend
		this.props.history.push('/search');
	}

	registerTutor() {
		// TODO: register tutor using backend
		this.props.history.push('/edit_profile');
	}

  // TODO: remove this later
	openSheet () {
    this.setState({ 
			popout:
				<Alert
					actions={[{
						title: 'Close',
						autoclose: true,
						style: 'destructive'
					}, {
						title: 'Cancel',
						autoclose: true,
						style: 'cancel'
					}]}
					onClose={ () => this.setState({ popout: null }) }
				>
					<h2>Hi!</h2>
					<p>{JSON.stringify(this.props)}</p>
				</Alert>
    });
  }

	render() {
		return (
			<View popout={this.state.popout} id={this.props.id} activePanel="home">
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
              {/* TODO: remove this later */ }
							<Button onClick={this.openSheet.bind(this)}>
								Show VK info
							</Button>
						</CenteredDiv>
					</BackgroundDiv>
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = (state) => {
	const { fetching, response, errors } = state.apiReducer;
	const { vkReducer } = state;
	return {
		fetching, response, errors,
		vkReducer
	};
};

export default withRouter(connect(mapStateToProps)(Start));
