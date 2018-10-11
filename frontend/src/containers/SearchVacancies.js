import React from 'react';
import { connect } from 'react-redux';
import { 
	View, Panel, PanelHeader, Cell, HeaderButton, Avatar, Div, Group, List, Button
} from '@vkontakte/vkui';

import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24Info from '@vkontakte/icons/dist/24/info';

import DivSpinner from '../components/DivSpinner';
import BackIcon from '../components/BackIcon';

import { apiActions } from '../actions/api';
import { vkActions } from '../actions/vk';
import { locationActions } from '../actions/location';

class SearchVacancies extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: -1,
			activePanel: 'search',
		}

		this.searchVacancies = this.searchVacancies.bind(this);
		this.sendApplication = this.sendApplication.bind(this);
	}

	searchVacancies() {
		const { id, signed_user_id } = this.props.vkReducer.userInfo;
		const params = this.props.filterReducer;
		this.props.dispatch(
			apiActions.searchVacancies({
				user_id: id,
				signed_user_id: signed_user_id,
				...params,
			})
		)
		.then(() => {
			const { accessToken } = this.props.vkReducer;
			const { vacancies } = this.props.apiReducer;
      const vkIds = Object.keys(vacancies).map(vacancyId => {
        return vacancies[vacancyId].owner;
      });
			this.props.dispatch(
				vkActions.fetchUsersInfo(accessToken, vkIds)
			);
		});
	}

	componentDidMount() {
		this.searchVacancies();
	}

	sendApplication(vacancyId, studentId) {
		this.props.dispatch(
			apiActions.addApplication({
				vacancy: vacancyId,
				student: studentId,
			})
		);
	}

	render() {
		const { vacancies, fetching } = this.props.apiReducer;
		const { usersInfo } = this.props.vkReducer;
		const vacanciesFound = Object.keys(vacancies).length > 0 && usersInfo.size > 0;

		const currentUser = this.props.vkReducer.userInfo;
		const vacancy = vacancies[this.state.id];
		const userProfile = vacancy ? usersInfo.get(Number(vacancy.owner)) : undefined;

		return (
			<View id={this.props.id} activePanel={this.state.activePanel}>
				<Panel id="search" theme="white">
					<PanelHeader
						left={
							<HeaderButton size="xl" onClick={() => this.props.dispatch(locationActions.changeLocation('filter'))}>
								<Icon24Filter />
							</HeaderButton>
						}
					>
						Поиск репетиторов
					</PanelHeader>
					{ fetching ? (
						<DivSpinner />
					) : (
						<Div>
							{ vacanciesFound ? Object.keys(vacancies).map(vacancyId => {
								const vacancy = vacancies[vacancyId];
								const userInfo = usersInfo.get(Number(vacancy.owner));
								return (
									<Cell
										expandable 
										onClick={() => this.setState({ activePanel: 'show_vacancy', id: vacancy.id })}
										key={vacancy.id}
										description={`${userInfo.city.title}, ${vacancy.price} рублей/час, ${vacancy.subject}`}
										before={<Avatar src={userInfo.photo_100} />}
									>
										{`${userInfo.firstName} ${userInfo.lastName}`}
									</Cell>
								);
							}) : (
								<Div onClick={this.searchVacancies}>
									Попробуйте повторить попытку или изменить параметры фильтра. <br />
									Нажмите, чтобы повторить.
								</Div>
							)}
						</Div>
					)}
				</Panel>

				<Panel id="show_vacancy">
					<PanelHeader
						left={
							<HeaderButton onClick={() => this.setState({ activePanel: 'search' })}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Репетитор
					</PanelHeader>

					{ fetching ? (
            <DivSpinner />
          ) : (
						userProfile && vacancy && (
							<div>
								<Group id="tutor" style={{ marginTop: 0 }}>
									<Cell
										size="l"
										description={userProfile.city ? userProfile.city.title : ""}
										before={<Avatar src={userProfile.photo_200} size={80} />}
										bottomContent={
											<Button onClick={() => this.sendApplication(vacancy.id, currentUser.id)}>
												Связаться
											</Button>
										}
									>
										{`${userProfile.firstName} ${userProfile.lastName}`}
									</Cell>
								</Group>
								<Group id="tutor_info">
									<List>
										<Cell before={<Icon24Recent />}>
											{vacancy.subject || "Предмет не задан"}
										</Cell>
										<Cell before={<Icon24Education />}>
											{`${vacancy.price || "Цена не указана"} рублей/час`}
										</Cell>
										<Cell before={<Icon24Info />}>
											{vacancy.extra_info || "Не указано"}
										</Cell>
									</List>
								</Group>
							</div>
						)
					)}
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = state => {
	const { apiReducer, vkReducer, filterReducer } = state;
	return {
		apiReducer, vkReducer, filterReducer,
	};
};

export default connect(mapStateToProps)(SearchVacancies);
