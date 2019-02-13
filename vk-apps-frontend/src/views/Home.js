import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import introOne from 'vk-apps-frontend/assets/images/intro_one.png'
import introTwo from 'vk-apps-frontend/assets/images/intro_two.png'
import introThree from 'vk-apps-frontend/assets/images/intro_three.png'

import { vkAppsUsersActions, usersActions } from 'vk-apps-frontend/actions/api';
import { currentUserActions } from 'vk-apps-frontend/actions';

const FlexedWhitePanel = styled(Panel).attrs({
  theme: "white",
})`
  display: flex;
`;

const CenteredFullscreenFlexDiv = styled.div`
  width: 100%; 
  height: 100%;
  display: flex; 
  align-items: center;
  flex-direction: column;
`;

const StyledGallery = styled(Gallery).attrs({
  align: "center",
  bullets: "dark",
  autoplay: 8000,
})`
 height: 100% !important;
 width: 100%;
`;

const GallerySlideDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (orientation: portrait) {
    flex-direction: column;
  }

  @media (orientation: landscape) and (min-width: 768px) {
    flex-direction: column;
  }
  
  @media (orientation: landscape) and (max-width: 768px) {
    flex-direction: row;
  }
`;

const IntroTextDiv = styled.div`
  line-height: 1.5;
  padding: 10px;
  text-align: center;
  
  @media (orientation: portrait) {
    order: 1;
  }
  
  @media (orientation: landscape) and (min-width: 768px) {
    flex-grow: 6;
    order: 1;
  }
  
  @media (orientation: landscape) and (max-width: 768px) {
    flex-grow: 6;
    order: 1;
  }
`;

const IntroImage = styled.img`
  object-fit: contain;
  padding: 10px;
  
  @media (orientation: portrait) {
    --image_size: 80vw;
    width: var(--image_size);
    height: var(--image_size);
    order: 0;
  }
  
  @media (orientation: landscape) and (min-width: 768px) {
    --image_size: 50vh;
    order: 0;
    flex-grow: 3;
    width: var(--image_size);
    height: var(--image_size);
  }
  
  @media (orientation: landscape) and (max-width: 768px) {
    --image_size: 60vh;
    order: 0;
    flex-grow: 3;
    width: var(--image_size);
    height: var(--image_size);
  }
`;

const StartWorkingButton = ({ onClick }) => (
  <Button size="l" onClick={onClick}>
    Начать работу
  </Button>
);

const mapStateToProps = state => {
  const { user } = state.apiReducer.vkAppsUsersReducer;
  const { vkUserInfo } = state.vkReducer.appsUserReducer;
  return {
    user,
    vkUserInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createVkAppsUser: bindActionCreators(vkAppsUsersActions.createVkAppsUser, dispatch),
    updateUser: bindActionCreators(usersActions.updateUser, dispatch),
    uploadAvatar: bindActionCreators(usersActions.uploadAvatar, dispatch),
    saveCurrentUserData: bindActionCreators(currentUserActions.currentUserSaveData, dispatch),
  };
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.createUser = this.createUser.bind(this);
    this.updateUserInfoFromVK = this.updateUserInfoFromVK.bind(this);
    this.updateAvatarFromVK = this.updateAvatarFromVK.bind(this);
  }

  async createUser() {
    await this.props.createVkAppsUser();
    const { user } = this.props;
    await Promise.all([
      this.updateUserInfoFromVK(user.id),
      this.updateAvatarFromVK(user.id)
    ]);
    this.props.history.push('');
  }

  async updateUserInfoFromVK(id) {
    const { first_name, last_name, city } = this.props.vkUserInfo;
    await this.props.updateUser(id, {
      first_name,
      last_name,
      city: city ? city.title : null,
    });
  }

  async updateAvatarFromVK(id) {
    const { photo_200 } = this.props.vkUserInfo;
    const response = await axios({
      url: photo_200,
      method: 'GET',
      responseType: 'blob',
    });
    const avatar = new File(
      [response.data],
      'uploaded_file.jpg',
      {
        type: 'image/jpeg',
        lastModified: Date.now()
      }
    );
    await this.props.uploadAvatar(id, {
      avatar,
    });
  }

  render() {
    return (
      <View activePanel="panel">
        <FlexedWhitePanel id="panel">
          <PanelHeader>
            Поиск репетиторов
          </PanelHeader>
          <CenteredFullscreenFlexDiv>
            <StyledGallery>
              <GallerySlideDiv>
                <IntroImage src={introOne} />
                <IntroTextDiv>
                  <Div>
                    Возможность размещения предложений для репетиторов
                  </Div>
                  <StartWorkingButton onClick={this.createUser} />
                </IntroTextDiv>
              </GallerySlideDiv>
              <GallerySlideDiv>
                <IntroImage src={introTwo} />
                <IntroTextDiv>
                  <Div>
                    Поиск репетиторов для очных и дистанционных занятий в любом регионе
                  </Div>
                  <StartWorkingButton onClick={this.createUser} />
                </IntroTextDiv>
              </GallerySlideDiv>
              <GallerySlideDiv>
                <IntroImage src={introThree} />
                <IntroTextDiv>
                  <Div>
                    Составление расписания внутри приложения
                  </Div>
                  <StartWorkingButton onClick={this.createUser} />
                </IntroTextDiv>
              </GallerySlideDiv>
            </StyledGallery>
          </CenteredFullscreenFlexDiv>
        </FlexedWhitePanel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);