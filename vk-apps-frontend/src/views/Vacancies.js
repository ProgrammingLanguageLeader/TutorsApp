import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';
import List from '@vkontakte/vkui/dist/components/List/List';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';

import Icon24Filter from '@vkontakte/icons/dist/24/filter';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

import { vacanciesActions } from 'vk-apps-frontend/actions/api';
import { ROOT_URL } from 'vk-apps-frontend/constants';

const mapStateToProps = state => {
  const { vacancies, fetching } = state.apiReducer.vacanciesReducer;
  return {
    vacancies, fetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchVacancies: bindActionCreators(vacanciesActions.searchVacancies, dispatch),
  };
};

class Vacancies extends React.Component {
  async componentDidMount() {
    await this.props.searchVacancies();
  }

  render() {
    const { fetching, vacancies } = this.props;

    return (
      <div>
        <PanelHeader
          left={
            <HeaderButton onClick={() => this.props.history.goBack()}>
              <BackIcon />
            </HeaderButton>
          }
        >
          Поиск предложений
        </PanelHeader>

        <Group title="Фильтрация">
          <CellButton before={<Icon24Filter />} onClick={() => this.props.history.push('/vacancies_filter')}>
            Параметры фильтра
          </CellButton>
        </Group>

        { fetching && (
          <DivSpinner />
        )}

        { vacancies && (
          <div>
            <Group title="Список предложений">
              <List>
                { vacancies
                  .map(vacancy => (
                    <Link to={`/vacancy/${vacancy.id}`} key={vacancy.id}>
                      <Cell expandable multiline description={
                        <div>
                          <div>
                            {vacancy.subject}
                          </div>
                          <div>
                            {vacancy.owner.city}
                          </div>
                          <div>
                            {vacancy.price} рублей/час
                          </div>
                        </div>
                        }
                        before={
                          <Avatar size={64} src={ROOT_URL + vacancy.owner.avatar} />
                        }
                      >
                        {`${vacancy.owner.first_name} ${vacancy.owner.last_name}`}
                      </Cell>
                    </Link>
                  ))
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);
