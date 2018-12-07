import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, HeaderButton, Avatar, Group, List, Button
} from '@vkontakte/vkui';

import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24Info from '@vkontakte/icons/dist/24/info';

import DivSpinner from '../components/DivSpinner';
import BackIcon from '../components/BackIcon';

import { vkApiActions, locationActions, apiVacancyActions, apiApplicationActions } from '../actions';

const mapStateToProps = state => {
  const { vkUserInfo, accessToken } = state.vkAppsReducer;
  const apiVacancyFetching = state.apiVacancyReducer.fetching;
  const apiApplicationFetching = state.apiApplicationReducer.fetching;
  const vkApiFetching = state.vkApiReducer.fetching;
  const { vacancy } = state.apiVacancyReducer;
  const { activePanel, params } = state.locationReducer;
  return {
    vacancy, vkUserInfo, accessToken, apiVacancyFetching, vkApiFetching,
    apiApplicationFetching, activePanel, params,
  };
};

class ShowVacancy extends React.Component {
  constructor(props) {
    super(props);

    this.getVacancy = this.getVacancy.bind(this);
    this.sendApplication = this.sendApplication.bind(this);
  }

  componentDidMount() {
    const { vacancyId } = this.props.params;
    this.getVacancy(vacancyId);
  }

  getVacancy(vacancyId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.dispatch(
      apiVacancyActions.getVacancy({
        user_id: id,
        signed_user_id: signed_user_id,
        vacancy_id: vacancyId,
      })
    )
      .then(() => {
        const { accessToken, vacancy } = this.props;
        this.props.dispatch(
          vkApiActions.fetchUsersInfo(accessToken, vacancy.owner.profile_id)
        );
      });
  }

  sendApplication(vacancyId, studentId) {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.dispatch(
      apiApplicationActions.addApplication({
        user_id: id,
        signed_user_id: signed_user_id,
        vacancy_id: vacancyId,
        student_id: studentId,
      })
    );
  }

  render() {
    const { vkUserInfo, vkApiFetching, apiVacancyFetching, apiApplicationFetching, vacancy } = this.props;

    return (
      <View id={this.props.id} activePanel={this.props.activePanel}>
        <Panel id="show_vacancy">
          <PanelHeader
            left={
              <HeaderButton onClick={() => locationActions.goBack()}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Репетитор
          </PanelHeader>

          { vkApiFetching || apiVacancyFetching || apiApplicationFetching ? (
            <DivSpinner />
          ) : (
            vkUserInfo && vacancy && (
              <div>
                <Group id="tutor" style={{ marginTop: 0 }}>
                  <Cell
                    size="l"
                    description={vkUserInfo.city ? vkUserInfo.city.title : ""}
                    before={<Avatar src={vkUserInfo.photo_200} size={80} />}
                    bottomContent={
                      <Button onClick={() => this.sendApplication(vacancy.id, vkUserInfo.id)}>
                        Связаться
                      </Button>
                    }
                  >
                    {`${vkUserInfo.firstName} ${vkUserInfo.lastName}`}
                  </Cell>
                </Group>
                <Group id="tutor_info">
                  <List>
                    <Cell before={<Icon24Recent />}>
                      {vacancy.subject || "Предмет не задан"}
                    </Cell>
                    <Cell before={<Icon24Education />}>
                      {`${vacancy.price || "Цена не указана"} рублей/час`}
                    </Cell>
                    <Cell before={<Icon24Info />}>
                      {vacancy.extra_info || "Не указано"}
                    </Cell>
                  </List>
                </Group>
              </div>
            )
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ShowVacancy);
