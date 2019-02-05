import React from 'react';
import styled from 'styled-components';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';

import 'vk-apps-frontend/assets/css/Start.css';
import introOne from 'vk-apps-frontend/assets/images/intro_one.png'
import introTwo from 'vk-apps-frontend/assets/images/intro_two.png'
import introThree from 'vk-apps-frontend/assets/images/intro_three.png'

const CenteredFullscreenFlexDiv = styled.div`
  width: 100%; 
  height: 100%;
  display: flex; 
  align-items: center;
  justify-content: center; 
`;

const GallerySlide = styled.div.attrs({className: 'gallery-slide'})``;

const IntroText = styled.div.attrs({className: 'intro-label'})``;

const IntroImage = styled.img.attrs({className: 'intro-image'})``;

class Home extends React.Component {
  render() {
    return (
      <CenteredFullscreenFlexDiv>
        <PanelHeader>
          Поиск репетиторов
        </PanelHeader>
        <CenteredFullscreenFlexDiv>
          <Gallery
            align="center"
            autoplay={5000}
            bullets="dark"
            style={{ height: '100%', textAlign: "center" }}
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
                Выберите удобный для себя график
              </IntroText>
            </GallerySlide>
          </Gallery>
        </CenteredFullscreenFlexDiv>
      </CenteredFullscreenFlexDiv>
    );
  }
}

export default Home;