import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, HeaderButton, Avatar, Div, PanelHeaderContent
} from '@vkontakte/vkui';

import Icon24Filter from '@vkontakte/icons/dist/24/filter';

import DivSpinner from '../components/DivSpinner';

import { vkApiActions, locationActions, apiVacancyActions } from '../actions';

const mapStateToProps = state => {
  const { vkUserInfo, accessToken } = state.vkAppsReducer;
  const apiVacancyFetching = state.apiVacancyReducer.fetching;
  const vkApiFetching = state.vkApiReducer.fetching;
  const filterParams = state.filterReducer;
  const { vacancies } = state.apiVacancyReducer;
  const { vkUsersInfo } = state.vkApiReducer;
  return {
    filterParams, vkUserInfo, accessToken, apiVacancyFetching, vkApiFetching,
    vacancies, vkUsersInfo,
  };
};

class SearchVacancies extends React.Component {
  constructor(props) {
    super(props);

    this.searchVacancies = this.searchVacancies.bind(this);
  }

  searchVacancies() {
    const { id, signed_user_id } = this.props.vkUserInfo;
    const params = this.props.filterParams;
    this.props.dispatch(
      apiVacancyActions.searchVacancies({
        user_id: id,
        signed_user_id: signed_user_id,
        ...params,
      })
    )
    .then(() => {
      const { accessToken, vacancies } = this.props;
      const vkIds = vacancies.map(vacancy => {
        return vacancy.owner.profile_id;
      });
      this.props.dispatch(
        vkApiActions.fetchUsersInfo(accessToken, vkIds)
      );
    });
  }

  componentDidMount() {
    this.searchVacancies();
  }

  render() {	
    const { vacancies, vkUsersInfo, vkApiFetching, apiVacancyFetching } = this.props;

    return (
      <View id={this.props.id} activePanel="search">
        <Panel id="search" theme="white">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.dispatch(
                locationActions.changeLocation('filter')
              )}>
                <Icon24Filter />
              </HeaderButton>
            }
          >
            <PanelHeaderContent>
              Поиск репетиторов
            </PanelHeaderContent>
          </PanelHeader>
          { vkApiFetching || apiVacancyFetching ? (
            <DivSpinner />
          ) : (
            <Div>
              { vacancies
                  .filter(vacancy => vkUsersInfo.get(vacancy.owner.profile_id))
                  .map(vacancy => {
                    const userInfo = vkUsersInfo.get(vacancy.owner.profile_id);
                    const cityTitle = userInfo.city ? userInfo.city.title : "";
                    const description = `${cityTitle} ${vacancy.price} рублей/час ${vacancy.subject}`;
                    return (
                      <Cell
                        expandable
                        onClick={() => this.props.dispatch(
                          locationActions.changeLocation('show_vacancy', 'show_vacancy', {
                            vacancyId: vacancy.id
                          })
                        )}
                        key={vacancy.id}
                        description={description}
                        before={<Avatar src={userInfo.photo_100} />}
                      >
                        {`${userInfo.firstName} ${userInfo.lastName}`}
                      </Cell>
                    );
                  })
              }
            </Div>
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(SearchVacancies);
