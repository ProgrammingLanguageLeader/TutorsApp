import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
	Panel, PanelHeader, View, Button, Div, Gallery, FixedLayout, ScreenSpinner
} from '@vkontakte/vkui';

import './Start.css';

import introOne from '../assets/intro_one.png'
import introTwo from '../assets/intro_two.png'
import introThree from '../assets/intro_three.png'

import { apiActions } from '../actions/api';
import { locationActions } from '../actions/location';

const Main = styled.div.attrs({
	className: "fullHeight",
})`
	background-color: #ffffff;
	display: flex; 
	align-items: center;
	justify-content: center; 
	padding-bottom: 80px;
	padding-top: 60px;
`;

const IntroText = styled.p`
	padding-bottom: 36px;
	line-height: 1.5;
`;

const IntroImage = styled.img`
	width: 70%;
	height: auto;
`;

class Start extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			popout: <ScreenSpinner />,
		};

		this.goToProfile = this.goToProfile.bind(this);
		this.goToVacanciesSearch = this.goToVacanciesSearch.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.userInfo.id === prevProps.userInfo.id) {
			return;
		}
		const { id, signed_user_id } = this.props.userInfo;
		this.setState({
			popout: <ScreenSpinner />
		});
		this.props.dispatch(
			apiActions.getProfile({
        vk_id: id,
        user_id: id,
        signed_user_id: signed_user_id,
      })
		)
		.then(() => {
			if (this.props.profile.vk_id) {
				return Promise.resolve();
			}
			return this.props.dispatch(
				apiActions.createProfile({
					vk_id: id,
					user_id: id,
					signed_user_id: signed_user_id,
				})
			)
		})
		.then(() => {
			this.setState({
				popout: null
			});
		});
	}

	goToVacanciesSearch() {
		this.props.dispatch(
			locationActions.changeLocation('search'),
		)
	}

	goToProfile() {
		const { profile } = this.props;
		const profileFilled = profile.experience || profile.education || profile.address || profile.description;
		if (profileFilled) {
			this.props.dispatch(
				locationActions.changeLocation('show_profile')
			)
		}
		else {
			this.props.dispatch(
				locationActions.changeLocation('edit_profile')
			);
		}
	}

	render() {
		return (
			<View popout={this.state.popout} id={this.props.id} activePanel="home">
				<Panel id="home">
					<PanelHeader noShadow>
						Tutor
					</PanelHeader>
					<Main>
						<Gallery bullets="dark" style={{ height: 'auto', textAlign: 'center' }}>
							<div>
								<IntroImage src={introOne} />
								<IntroText>
									Мы поможем найти вам <br /> лучшего репетитора
								</IntroText>
							</div>
							<div>
								<IntroImage src={introTwo} />
								<IntroText>
									Бесплатный подбор репетиторов  <br /> для очных и дистанционных <br /> занятий в любом регионе!
								</IntroText>
							</div>
							<div>
								<IntroImage src={introThree} />
								<IntroText>
									Выбери удобный <br /> для себя график
								</IntroText>
							</div>
						</Gallery>
					</Main>
					<FixedLayout vertical="bottom">
						<Div style={{ display: 'flex' }}>
							<Button style={{ margin: 2, height: 52, display: 'flex', flex: 1, justifyContent: 'center' }} onClick={this.goToVacanciesSearch}>
								Найти репититора
							</Button>
							<Button style={{ margin: 2, height: 52, display: 'flex', flex: 1, justifyContent: 'center' }} onClick={this.goToProfile}>
								Я репетитор
							</Button>
						</Div>
					</FixedLayout>
				</Panel>
			</View>
		);
	}
};

const mapStateToProps = (state) => {
	const { userInfo } = state.vkReducer;
	const { profile } = state.apiReducer;
	return {
		userInfo, profile, 
	};
};

export default connect(mapStateToProps)(Start);
