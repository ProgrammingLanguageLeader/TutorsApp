import React from 'react';
import PropTypes from 'prop-types';
import { 
	View, Panel, PanelHeader, HeaderButton, Cell, Avatar, Button, List, Group, InfoRow 
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.setState({
			activePanel: 'profile'
		});
	}

	render() {
		return (
			<View id={this.props.id} activePanel="profile">
				<Panel id="profile">
					<PanelHeader
						left={
							<HeaderButton onClick={this.props.go} data-to="search">
								<BackIcon />
							</HeaderButton>
						}
					>
						Поиск
					</PanelHeader>
					<Group title="Информация о репетиторе">
						<List>
							<Cell
								size="l"
								description="Школьный учитель, Возраст: 20"
								before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
								bottomContent={<Button onClick={this.props.go} data-to="contact_window">Связаться</Button>}
							>
								Артур Стамбульцян
							</Cell>
							<Cell>
								<InfoRow title="Стаж">
									2 года
								</InfoRow>
							</Cell>
							<Cell>
								<InfoRow title="Образование">
									РЭУ им. Г.В.Плеханова
								</InfoRow>
							</Cell>
							<Cell>
								<InfoRow title="Адрес">
									Москва, ул. Удальцова
								</InfoRow>
							</Cell>
						</List>
					</Group>
					<Group title="Преподаваемые предметы">
						<Cell>
							<InfoRow title="Математика">
								от 1000 руб/60 мин
							</InfoRow>
						</Cell>
					</Group>
				</Panel>
			</View>
		);
	}
};

export default Profile;
