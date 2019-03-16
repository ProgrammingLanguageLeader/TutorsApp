import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';
import List from '@vkontakte/vkui/dist/components/List/List';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import Icon24Add from '@vkontakte/icons/dist/24/add';

import PaginationButton from 'vk-apps-frontend/components/PaginationButton';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

import { vacanciesActions } from 'vk-apps-frontend/actions/api';

import { ROOT_URL, DEFAULT_RESULTS_COUNT } from 'vk-apps-frontend/constants';

const mapStateToProps = state => {
  const { vacanciesFilter } = state;
  return {
    vacanciesFilter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchVacancies: bindActionCreators(vacanciesActions.searchVacancies, dispatch),
  };
};

class Vacancies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      pageNumber: 0,
      vacancies: [],
      fetching: false,
    };
    this.fetchVacancies = this.fetchVacancies.bind(this);
    this.handlePaginationButtonClick = this.handlePaginationButtonClick.bind(this);
  }

  async componentDidMount() {
    await this.fetchVacancies();
  }

  async fetchVacancies() {
    this.setState({
      fetching: true,
    });
    const { pageNumber } = this.state;
    const vacanciesResponse = await this.props.searchVacancies({
      ...this.props.vacanciesFilter,
      offset: DEFAULT_RESULTS_COUNT * pageNumber,
      limit: DEFAULT_RESULTS_COUNT,
    });
    const vacancies = vacanciesResponse.status === 200
      ? vacanciesResponse.data.results
      : [];
    const count = vacanciesResponse.status === 200
      ? vacanciesResponse.data.count
      : 0;
    this.setState({
      vacancies,
      count,
      fetching: false,
    });
  }

  async handlePaginationButtonClick(pageNumber) {
    await this.setState({
      pageNumber,
    });
    await this.fetchVacancies();
  }

  render() {
    const { fetching, vacancies, count, pageNumber } = this.state;
    const needPagination = count > DEFAULT_RESULTS_COUNT;
    const pagesNumber = Math.ceil(count / DEFAULT_RESULTS_COUNT);

    return (
      <View id={this.props.id} activePanel="panel">
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={() => this.props.history.goBack()}>
              <BackIcon />
            </HeaderButton>
          }>
            Поиск предложений
          </PanelHeader>

          <Group>
            <CellButton before={<Icon24Filter />} onClick={() => this.props.history.push('/vacancies/filter')}>
              Параметры фильтра
            </CellButton>
            <CellButton
              before={<Icon24Add/>}
              onClick={() => this.props.history.push('/vacancy/create')}
            >
              Создать предложение
            </CellButton>
          </Group>

          {fetching && <DivSpinner />}

          {vacancies && (
            <div>
              <Group title="Список предложений">
                <List>
                  { vacancies.map(vacancy => (
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
                        {vacancy.owner.first_name} {vacancy.owner.last_name}
                      </Cell>
                    </Link>
                  ))}
                  {vacancies.length === 0 && (
                    <Cell multiline>
                      Не найдено ни одного предложения, попробуйте изменить параметры фильтра
                    </Cell>
                  )}
                </List>
                {needPagination && (
                  <Div style={{ textAlign: 'center' }}>
                    {[...Array(pagesNumber).keys()]
                      .slice(0, 5)
                      .map(number => (
                        <PaginationButton
                          key={number}
                          onClick={() => this.handlePaginationButtonClick(number)}
                          active={pageNumber === number}
                        >
                          {number + 1}
                        </PaginationButton>
                      ))
                    }
                  </Div>
                )}
              </Group>
              <Footer>
                Найдено предложений: {count}
              </Footer>
            </div>
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);
