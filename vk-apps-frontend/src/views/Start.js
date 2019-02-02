import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Panel, PanelHeader, View, Gallery, ScreenSpinner } from '@vkontakte/vkui';

import 'vk-apps-frontend/assets/css/Start.css';
import introOne from 'vk-apps-frontend/assets/images/intro_one.png'
import introTwo from 'vk-apps-frontend/assets/images/intro_two.png'
import introThree from 'vk-apps-frontend/assets/images/intro_three.png'

import { locationActions } from 'vk-apps-frontend/actions';
import { usersActions, vkAppsUsersActions } from 'vk-apps-frontend/actions/api';
import PopoutDiv from 'vk-apps-frontend/components/PopoutDiv';

const mapStateToProps = state => {
  const { vkUserInfo } = state.vkReducer.appsUserReducer;
  const { user } = state.apiReducer.usersReducer;
  return {
    vkUserInfo, user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLocation: options =>
      dispatch(locationActions.changeLocation(options)),
    getUser: (id, options) =>
      dispatch(usersActions.getUser(id, options)),
    createVkAppsUser: options =>
      dispatch(vkAppsUsersActions.createVkAppsUser(options)),
  };
};

const Main = styled.div`
  height: 100%;
  display: flex; 
  align-items: center;
  justify-content: center; 
`;

const GallerySlide = styled.div.attrs({className: 'gallery-slide'})``;

const IntroText = styled.div.attrs({className: 'intro-label'})``;

const IntroImage = styled.img.attrs({className: 'intro-image'})``;

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popout: null,
    };

    this.goToProfile = this.goToProfile.bind(this);
    this.goToVacanciesSearch = this.goToVacanciesSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.vkUserInfo.id === prevProps.vkUserInfo.id) {
      return;
    }
    const { id } = this.props.vkUserInfo;
    this.setState({
      popout: <PopoutDiv><ScreenSpinner /></PopoutDiv>
    });
    this.props.getUser({
      id: id,
    })
      .then(() => {
        if (this.props.user.id) {
          return Promise.resolve();
        }
        return this.props.createVkAppsUser({})
      })
      .then(() => {
        this.setState({
          popout: null
        });
      });
  }

  goToVacanciesSearch() {
    this.props.changeLocation('search_vacancies');
  }

  goToProfile() {
    this.props.changeLocation('show_profile');
  }

  render() {
    return (
      <View popout={this.state.popout} id={this.props.id} activePanel="home">
        <Panel id="home" theme="white" style={{ display: 'flex' }}>
          <PanelHeader>
            Поиск репетиторов
          </PanelHeader>
          <Main>
            <Gallery
              align="center"
              autoplay={5000}
              bullets="dark"
              style={{ height: '100%', textAlign: 'center' }}
            >
              <GallerySlide>
                <IntroImage src={introOne} />
                <IntroText>
                  Мы поможем Вам найти лучшего репетитора
                </IntroText>
              </GallerySlide>
              <GallerySlide>
                <IntroImage src={introTwo} />
                <IntroText>
                  Бесплатный подбор репетиторов для очных и дистанционных занятий в любом регионе
                </IntroText>
              </GallerySlide>
              <GallerySlide>
                <IntroImage src={introThree} />
                <IntroText>
                  Выбери удобный для себя график
                </IntroText>
              </GallerySlide>
            </Gallery>
          </Main>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Start);
