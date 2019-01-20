import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, HeaderButton, Avatar, PanelHeaderContent, Group, Footer, List
} from '@vkontakte/vkui';

import Icon24Filter from '@vkontakte/icons/dist/24/filter';

import DivSpinner from '../components/DivSpinner';

import { vkApiActions, locationActions, apiVacancyActions } from '../actions';

const mapStateToProps = state => {
  const { accessToken } = state.vkAppsTokenReducer;
  const apiVacancyFetching = state.apiVacanciesReducer.fetching;
  const vkApiUsersFetching = state.vkApiUsersReducer.fetching;
  const filterParams = state.filterReducer;
  const { vacancies } = state.apiVacanciesReducer;
  const { vkUsersInfo } = state.vkApiUsersReducer;
  return {
    filterParams, accessToken, apiVacancyFetching, vkApiUsersFetching,
    vacancies, vkUsersInfo,
  };
};

class SearchVacancies extends React.Component {
  constructor(props) {
    super(props);

    this.searchVacancies = this.searchVacancies.bind(this);
  }

  searchVacancies() {
    const params = this.props.filterParams;
    this.props.dispatch(
      apiVacancyActions.searchVacancies({
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
    const { vacancies, vkUsersInfo, vkApiUsersFetching, apiVacancyFetching } = this.props;

    return (
      <View id={this.props.id} activePanel="search">
        <Panel id="search">
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
          { vkApiUsersFetching || apiVacancyFetching ? (
            <DivSpinner />
          ) : (
            <div>
              <Group title="Список предложений" >
                <List>
                  { vacancies
                    .filter(vacancy => vkUsersInfo[vacancy.owner.profile_id])
                    .map(vacancy => {
                      const userInfo = vkUsersInfo[vacancy.owner.profile_id];
                      const cityTitle = vacancy.owner.city ? vacancy.owner.city : "Город не указан";
                      return (
                        <Cell
                          expandable
                          multiline
                          onClick={() => this.props.dispatch(
                            locationActions.changeLocation('show_vacancy', 'show_vacancy', {
                              vacancyId: vacancy.id
                            })
                          )}
                          key={vacancy.vacancy_id}
                          description={
                            <div>
                              <div>
                                {vacancy.subject}
                              </div>
                              <div>
                                {cityTitle}
                              </div>
                              <div>
                                {vacancy.price} рублей/час
                              </div>
                            </div>
                          }
                          before={<Avatar size={64} src={userInfo.photo_200} />}
                        >
                          {`${userInfo.firstName} ${userInfo.lastName}`}
                        </Cell>
                      );
                    })
                  }
                  {
                    vacancies.length === 0 && (
                      <Cell multiline>
                        Предложений не найдено, попробуйте изменить параметры фильтра
                      </Cell>
                    )
                  }
                </List>
              </Group>
              <Footer>
                {
                  vacancies.length === 1
                  ? `Показано ${vacancies.length} предложение`
                  : (2 <= vacancies.length) && (vacancies.length <= 4)
                    ? `Показано ${vacancies.length} предложения`
                    : `Показано ${vacancies.length} предложений`
                }
              </Footer>
            </div>
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(SearchVacancies);
