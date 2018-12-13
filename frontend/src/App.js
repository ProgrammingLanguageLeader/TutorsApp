import React from 'react';
import { connect } from 'react-redux';
import '@vkontakte/vkui/dist/vkui.css';
import { Root, Epic, Tabbar, TabbarItem, PopoutWrapper, Div, Button, ScreenSpinner } from '@vkontakte/vkui';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Notification from '@vkontakte/icons/dist/28/notification';
import Icon28MoneyTransfer from '@vkontakte/icons/dist/28/money_transfer';
import Icon28Add from '@vkontakte/icons/dist/28/add_outline';

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

import { vkAppsActions, locationActions } from './actions';
import PopoutDiv from './components/PopoutDiv';

const mapStateToProps = (state) => {
  const { activeView, activePanel } = state.locationReducer;
  const { accessToken } = state.vkAppsTokenReducer;
  const vkAppsTokenFetching = state.vkAppsTokenReducer.fetching;
  return {
    activeView, accessToken, activePanel, vkAppsTokenFetching,
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    this.props.dispatch(vkAppsActions.init());
    this.props.dispatch(vkAppsActions.fetchCurrentUserInfo());
    this.props.dispatch(vkAppsActions.fetchAccessToken());
  }

  render() {
    const { activeView } = this.props;
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
            <Button onClick={this.init}>
              Авторизоваться в приложении
            </Button>
          </PopoutDiv>
        </PopoutWrapper>
    );

    return (
      <Epic activeStory="root" tabbar={
        <Tabbar>
          <TabbarItem
            onClick={() => this.props.dispatch(
              locationActions.changeLocation('show_profile'))}
            selected={this.props.activeView === 'show_profile'}
          >
            <Icon28User />
          </TabbarItem>
          <TabbarItem
            onClick={() => this.props.dispatch(
              locationActions.changeLocation('search_vacancies')
            )}
            selected={this.props.activeView === 'search_vacancies'}
          >
            <Icon28Search />
          </TabbarItem>
          <TabbarItem
            onClick={() => this.props.dispatch(
              locationActions.changeLocation('schedule', 'schedule')
            )}
            selected={this.props.activeView === 'schedule'}
          >
            <Icon28Newsfeed />
          </TabbarItem>
          <TabbarItem
            onClick={() => this.props.dispatch(
              locationActions.changeLocation('create_vacancy', 'create_vacancy')
            )}
            selected={this.props.activeView === 'create_vacancy'}
          >
            <Icon28Add />
          </TabbarItem>
          <TabbarItem
            onClick={() => this.props.dispatch(
              locationActions.changeLocation('notifications', 'notifications')
            )}
            selected={this.props.activeView === 'notifications'}
          >
            <Icon28Notification />
          </TabbarItem>
          <TabbarItem
            onClick={() => this.props.dispatch(
              locationActions.changeLocation('money_transfer')
            )}
            selected={this.props.activeView === 'money_transfer'}
          >
            <Icon28MoneyTransfer />
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
        </Root>
      </Epic>
    );
  }
}

export default connect(mapStateToProps)(App);
