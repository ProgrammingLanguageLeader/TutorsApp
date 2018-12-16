import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import '@vkontakte/vkui/dist/vkui.css';
import { Root, Epic, Tabbar, TabbarItem, PopoutWrapper, Div, Button, ScreenSpinner } from '@vkontakte/vkui';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Notification from '@vkontakte/icons/dist/28/notification';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';

import SearchVacancies from './views/SearchVacancies';
import ShowProfile from './views/ShowProfile';
import CreateVacancy from './views/CreateVacancy';
import EditProfile from './views/EditProfile';
import Schedule from './views/Schedule';
import Filter from './views/Filter';
import Start from './views/Start';
import Notifications from './views/Notifications';
import MoneyTransfer from './views/MoneyTransfer';
import ShowVacancy from "./views/ShowVacancy";
import MainMenu from "./views/MainMenu";

import { vkAppsActions, locationActions } from './actions';
import PopoutDiv from './components/PopoutDiv';

const mapStateToProps = state => {
  const { activeView, activePanel } = state.locationReducer;
  const { accessToken } = state.vkAppsTokenReducer;
  const { vkUserInfo } = state.vkAppsUserReducer;
  const vkAppsTokenFetching = state.vkAppsTokenReducer.fetching;
  return {
    activeView, accessToken, activePanel, vkAppsTokenFetching, vkUserInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: bindActionCreators(vkAppsActions.init, dispatch),
    fetchCurrentUserInfo: bindActionCreators(vkAppsActions.fetchCurrentUserInfo, dispatch),
    fetchAccessToken: bindActionCreators(vkAppsActions.fetchAccessToken, dispatch),
    changeLocation: bindActionCreators(locationActions.changeLocation, dispatch),
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.initVkApps = this.initVkApps.bind(this);
  }

  componentDidMount() {
    this.initVkApps();
  }

  initVkApps() {
    this.props.init();
    this.props.fetchCurrentUserInfo();
    this.props.fetchAccessToken();
  }

  render() {
    const { activeView, vkUserInfo } = this.props;
    const popout = this.props.vkAppsTokenFetching
      ? <ScreenSpinner/>
      : this.props.accessToken
        ? null
        : (
        <PopoutWrapper>
          <PopoutDiv>
            <Div>
              Пожалуйста, примите запрос на права доступа. Это необходимо для работы приложения
            </Div>
            <Button onClick={this.initVkApps}>
              Авторизоваться в приложении
            </Button>
          </PopoutDiv>
        </PopoutWrapper>
    );

    return (
      <Epic activeStory="root" tabbar={
        <Tabbar>
          <TabbarItem
            onClick={() => this.props.changeLocation('show_profile', '', { profileId: vkUserInfo.id })}
            selected={this.props.activeView === 'show_profile'}
          >
            <Icon28User />
          </TabbarItem>
          <TabbarItem
            onClick={() => this.props.changeLocation('search_vacancies')}
            selected={this.props.activeView === 'search_vacancies'}
          >
            <Icon28Search />
          </TabbarItem>
          <TabbarItem
            onClick={() => this.props.changeLocation('schedule', 'schedule')}
            selected={this.props.activeView === 'schedule'}
          >
            <Icon28Newsfeed />
          </TabbarItem>
          <TabbarItem
            onClick={() => this.props.changeLocation('notifications', 'notifications')}
            selected={this.props.activeView === 'notifications'}
          >
            <Icon28Notification />
          </TabbarItem>
          <TabbarItem
            onClick={() => this.props.changeLocation('main_menu')}
            selected={this.props.activeView === 'main_menu'}
          >
            <Icon28Menu />
          </TabbarItem>
        </Tabbar>
      }>
        <Root id="root" activeView={activeView} popout={popout}>
          <Start id="start" />
          <SearchVacancies id="search_vacancies" />
          <ShowProfile id="show_profile" />
          <CreateVacancy id="create_vacancy" />
          <ShowVacancy id="show_vacancy" />
          <EditProfile id="edit_profile" />
          <Schedule id="schedule" />
          <Filter id="filter" />
          <Notifications id="notifications" />
          <MoneyTransfer id="money_transfer"/>
          <MainMenu id="main_menu"/>
        </Root>
      </Epic>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
