import React from 'react';
import { connect } from 'react-redux';
import '@vkontakte/vkui/dist/vkui.css';
import { Root, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Notification from '@vkontakte/icons/dist/28/notification';
import Icon28MoneyTransfer from '@vkontakte/icons/dist/28/money_transfer';

import SearchVacancies from './panels/SearchVacancies';
import ShowProfile from './panels/ShowProfile';
import CreateVacancy from './panels/CreateVacancy';
import EditProfile from './panels/EditProfile';
import Contact from './panels/Contact';
import Schedule from './panels/Schedule';
import Filter from './panels/Filter';
import Start from './panels/Start';
import Notifications from './panels/Notifications';
import MoneyTransfer from './panels/MoneyTransfer';
import ShowVacancy from "./panels/ShowVacancy";

import { vkAppsActions, locationActions } from './actions';

const mapStateToProps = (state) => {
  const { activeView, activePanel } = state.locationReducer;
  const { accessToken } = state.vkAppsReducer;
  return {
    activeView, accessToken, activePanel
  };
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(vkAppsActions.init());
    this.props.dispatch(vkAppsActions.fetchCurrentUserInfo());
    this.props.dispatch(vkAppsActions.fetchAccessToken());
  }

  render() {
    const { activeView } = this.props;

    return (
      <Epic activeStory="root" tabbar={
        <Tabbar>
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
              locationActions.changeLocation('schedule', 'requests')
            )}
            selected={this.props.activeView === 'schedule'}
          >
            <Icon28Newsfeed />
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
              locationActions.changeLocation('show_profile'))}
            selected={this.props.activeView === 'show_profile'}
          >
            <Icon28User />
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
        <Root id="root" activeView={activeView}>
          <Start id="start" />
          <SearchVacancies id="search_vacancies" />
          <ShowProfile id="show_profile" />
          <CreateVacancy id="create_vacancy" />
          <ShowVacancy id="show_vacancy" />
          <EditProfile id="edit_profile" />
          <Contact id="contact" />
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
