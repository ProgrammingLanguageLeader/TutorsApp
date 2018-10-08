import React from 'react';
import { connect } from 'react-redux';
import { 
	View, Panel, PanelHeader, Cell, Group, Div, Button, Avatar
} from '@vkontakte/vkui';

import { apiActions } from '../actions/api';
import { vkActions } from '../actions/vk';
import { locationActions } from '../actions/location';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'all'
		};
	}

	componentDidMount() {
		const { id, signed_user_id } = this.props.vkReducer.userInfo;
		this.props.dispatch(
			apiActions.getActiveVacancies({
				vk_id: id,
				user_id: id,
				signed_user_id: signed_user_id,
			})
		)
		.then(() => {
			const { accessToken } = this.props.vkReducer;
      let vkIds = this.props.apiReducer.vacancies.map(vacancy => {
        return vacancy.user;
      });
			this.props.dispatch(
				vkActions.fetchUsersInfo(accessToken, vkIds)
			);
		})
	}

	render() {
		const { vacancies } = this.props.apiReducer;
		const { usersInfo } = this.props.vkReducer;
		const vacanciesFetched = vacancies.length > 0 && usersInfo.size > 0;

		return (
			<View id={this.props.id} activePanel="search">
				<Panel id="search">
					<PanelHeader noShadow>
						Поиск репетиторов
					</PanelHeader>
					<Group>
						<Div>
							<Button size="xl" onClick={() => this.props.dispatch(locationActions.changeLocation('filter'))}>
								Фильтр
							</Button>
						</Div>
						{ vacanciesFetched && vacancies.map(vacancy => {
							const userInfo = usersInfo.get(Number(vacancy.user));
							return (
								<Cell
									key={vacancy.id}
									description={`${userInfo.city.title}, ${vacancy.price} рублей/час`}
									before={<Avatar src={userInfo.photo_100} />}
								>
									{`${userInfo.firstName} ${userInfo.lastName}`}
								</Cell>
							);
						})}
					</Group>
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = state => {
	const { apiReducer, vkReducer } = state;
	return {
		apiReducer, vkReducer
	};
};

export default connect(mapStateToProps)(Search);
