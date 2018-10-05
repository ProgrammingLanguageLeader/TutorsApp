import React from 'react';
import { connect } from 'react-redux';
import {
	View, Panel, PanelHeader, Cell, Avatar, Button, File, Input, FormLayout, Textarea
} from '@vkontakte/vkui';
import Icon24Document from '@vkontakte/icons/dist/24/document';

import { locationActions } from '../actions/location';

class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			study_level: '',
		};
  }

	render() {
		return (
			<View id={this.props.id} activePanel="edit_profile">
				<Panel id="edit_profile" theme="white">					
					<PanelHeader noShadow>
						Профиль
					</PanelHeader>
					<FormLayout>
						<Cell
							size="l"
							description="Школьный учитель, Возраст: 20"
							before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
						>
							Артур Стамбульцян
						</Cell>

						<Input top="Стаж преподавания" defaultValue=""/>
						<Input
							top="Образование"
							bottom='Прикрепите копии документов об образовании и трудовом стаже, если хотите разместить свою заявку с пометкой "Проверенный специалист"'
							defaultValue=""
						/>
							<File before={<Icon24Document />} size="l" />
						<Input top="Адрес" defaultValue="" />
          	<Input top="Электронная почта" defaultValue=""/>
						<Textarea top="О себе" placeholder="" />
						<Button size="xl" onClick={() => this.props.dispatch(locationActions.changeLocation('show_profile'))}>
							Сохранить
						</Button>
					</FormLayout>
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = (state) => {
	const { history } = state.locationReducer;
	return {
		history
	};
}

export default connect(mapStateToProps)(EditProfile);
