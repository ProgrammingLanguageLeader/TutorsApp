import React from 'react';
import { connect } from 'react-redux';
import {
	View, Panel, PanelHeader, Cell, Avatar, Button, File, Input, FormLayout, FixedLayout, Textarea, Spinner, HeaderButton
} from '@vkontakte/vkui';
import Icon24Document from '@vkontakte/icons/dist/24/document';

import BackIcon from '../components/BackIcon';

import { apiActions } from '../actions/api';
import { locationActions } from '../actions/location';

class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			experience: '',
			education: '',
			address: '',
			email: '',
			description: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
  }

	componentDidMount() {
		const { id, signed_user_id } = this.props.userInfo;
    this.props.dispatch(
      apiActions.getProfile({
				vk_id: id,
				user_id: id,
				signed_user_id: signed_user_id,
      })
		);
	}

	handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

		console.log(name, value);
    this.setState({
      [name]: value
    });
  }

	updateProfile() {
		// TODO: send form using apiActions
		this.props.dispatch(locationActions.changeLocation('show_profile'));
	}

	render() {
		const { fetching } = this.props;
    const { city, photo_200, first_name, last_name } = this.props.userInfo;
    const { description, experience, education, address, email } = this.props.profile;

		return (
			<View 
				id={this.props.id} 
				activePanel="edit_profile"
			>
				<Panel id="edit_profile" theme="white">					
					<PanelHeader
						left={
							<HeaderButton key="back" onClick={() => this.props.dispatch(locationActions.goBack())}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Профиль
					</PanelHeader>
					{ fetching ? (
						<Spinner />
					) : (
						<FormLayout>
							<Cell
								size="l"
								description={city ? city.title : ""}
								before={<Avatar src={photo_200} />}
							>
								{`${first_name} ${last_name}`}
							</Cell>

							<Input
								name="experience"
								top="Стаж преподавания" 
								defaultValue={experience ? experience : ""}
								onChange={this.handleChange}
							/>
							
							<Input
								name="education"
								top="Образование"
								bottom='Прикрепите копии документов об образовании и трудовом стаже, если хотите разместить свою заявку с пометкой "Проверенный специалист"'
								defaultValue={education ? education : ""}
								onChange={this.handleChange}
							/>
								<File before={<Icon24Document />} size="l" />
							
							<Input 
								name="address"
								top="Адрес" 
								defaultValue={address ? address : ""}
								onChange={this.handleChange}
							/>
							
							<Input
								name="email"
								top="Электронная почта" 
								defaultValue={email ? email : ""}
								onChange={this.handleChange}
							/>
							
							<Textarea 
								name="description"
								top="О себе" 
								placeholder={description ? description : ""} 
								onChange={this.handleChange}
							/>
							<Button size="xl" onClick={this.updateProfile}>
								Сохранить
							</Button>
						</FormLayout>
					)}
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = (state) => {
	const { userInfo } = state.vkReducer;
  const { fetching } = state.apiReducer;
  const { profile } = state.apiReducer;
	return {
    userInfo, fetching, profile, 
  };
}

export default connect(mapStateToProps)(EditProfile);
