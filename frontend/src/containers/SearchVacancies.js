import React from 'react';
import { connect } from 'react-redux';
import { 
	View, Panel, PanelHeader, Cell, FixedLayout, Button, Avatar, Div
} from '@vkontakte/vkui';

import DivSpinner from '../components/DivSpinner';

import { apiActions } from '../actions/api';
import { vkActions } from '../actions/vk';
import { locationActions } from '../actions/location';

class SearchVacancies extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'all'
		};

		this.searchVacancies = this.searchVacancies.bind(this);
	}

	searchVacancies() {
		const { id, signed_user_id } = this.props.vkReducer.userInfo;
		const { params } = this.props.filterReducer;
		this.props.dispatch(
			apiActions.searchVacancies({
				user_id: id,
				signed_user_id: signed_user_id,
				...params,
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
		});
	}

	componentDidMount() {
		this.searchVacancies();
	}

	render() {
		const { vacancies, fetching } = this.props.apiReducer;
		const { usersInfo } = this.props.vkReducer;
		const vacanciesFound = vacancies.length > 0 && usersInfo.size > 0;

		return (
			<View id={this.props.id} activePanel="search">
				<Panel id="search" theme="white">
					<PanelHeader>
						Поиск репетиторов
					</PanelHeader>
					{ fetching ? (
						<DivSpinner />
					) : (
						<div>
							<Div style={{paddingBottom: 60}}>
								{ vacanciesFound ? vacancies.map(vacancy => {
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
								}) : (
									<Div onClick={this.searchVacancies}>
										Что-то пошло не так... Попробуйте повторить попытку или изменить параметры фильтра.
										Нажмите, чтобы повторить.
									</Div>
								)}
							</Div>
							<FixedLayout vertical="bottom">
								<Div>
									<Button size="xl" onClick={() => this.props.dispatch(locationActions.changeLocation('filter'))}>
										Фильтр
									</Button>
								</Div>
							</FixedLayout>
						</div>
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
