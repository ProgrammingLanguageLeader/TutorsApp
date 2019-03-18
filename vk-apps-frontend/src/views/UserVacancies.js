import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';
import List from '@vkontakte/vkui/dist/components/List/List';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';

import Icon24Add from '@vkontakte/icons/dist/24/add';

import VacancyCell from 'vk-apps-frontend/components/VacancyCell';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';

import { vacanciesActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchVacancies: bindActionCreators(vacanciesActions.searchVacancies, dispatch),
  };
};

class UserVacancies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vacancies: [],
      fetching: false,
    }
  }

  async componentDidMount() {
    this.setState({
      fetching: true,
    });
    const { user } = this.props.currentUser;
    const vacanciesResponse = await this.props.searchVacancies({
      owner: user && user.id,
    });
    const vacancies = vacanciesResponse.status === 200
      ? vacanciesResponse.data.results
      : [];
    this.setState({
      vacancies,
      fetching: false,
    });
  }

  render() {
    const { fetching, vacancies } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Ваши предложения
          </PanelHeader>

          {fetching && <DivSpinner />}

          <Group>
            <CellButton
              before={<Icon24Add/>}
              onClick={() => this.props.history.push('/vacancy/create')}
            >
              Создать предложение
            </CellButton>
          </Group>

          {vacancies && (
            <div>
              <Group title="Список предложений">
                <List>
                  { vacancies.map(vacancy => (
                    <VacancyCell
                      key={vacancy.id}
                      vacancy={vacancy}
                      onClick={() => this.props.history.push(`/vacancy/${vacancy.id}`)}
                    />
                  ))}

                  {vacancies.length === 0 && (
                    <Cell multiline>
                      Не найдено ни одного предложения
                    </Cell>
                  )}
                </List>
              </Group>
              <Footer>
                Показано предложений: {vacancies.length}
              </Footer>
            </div>
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserVacancies);