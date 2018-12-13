import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, HeaderButton, Avatar, Group, Button
} from '@vkontakte/vkui';
import 'moment/locale/ru';

import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24MoneyCircle from '@vkontakte/icons/dist/24/money_circle';
import Icon24Info from '@vkontakte/icons/dist/24/info';

import DivSpinner from '../components/DivSpinner';
import BackIcon from '../components/BackIcon';

import { vkApiActions, locationActions, apiVacancyActions, apiLessonApplicationActions } from '../actions';
import Moment from "react-moment";

const mapStateToProps = state => {
  const { vkUserInfo } = state.vkAppsUserReducer;
  const { accessToken } = state.vkAppsTokenReducer;
  const apiVacancyFetching = state.apiVacancyReducer.fetching;
  const apiApplicationFetching = state.apiApplicationReducer.fetching;
  const vkApiUsersFetching = state.vkApiUsersReducer.fetching;
  const { vacancy } = state.apiVacancyReducer;
  const { activePanel, params } = state.locationReducer;
  const { vkUsersInfo } = state.vkApiUsersReducer;
  const apiVacancyError = state.apiVacancyReducer.errors;
  return {
    vacancy, vkUserInfo, accessToken, apiVacancyFetching, vkApiUsersFetching,
    apiApplicationFetching, activePanel, params, vkUsersInfo,
    apiVacancyError
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
      apiLessonApplicationActions.createApplication({
        user_id: id,
        signed_user_id: signed_user_id,
        vacancy_id: vacancyId,
        student_id: studentId,
      })
    );
  }

  render() {
    const {
      vkUserInfo, vkUsersInfo, vkApiUsersFetching, apiVacancyFetching, apiApplicationFetching, vacancy
    } = this.props;
    const fetching = apiVacancyFetching || vkApiUsersFetching || apiApplicationFetching || apiApplicationFetching;
    const vacancyOwnerVkInfo = Object.keys(vacancy).length ? vkUsersInfo[vacancy.owner.profile_id] : null;

    return (
      <View id={this.props.id} activePanel="show_vacancy">
        <Panel id="show_vacancy">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Вакансия
          </PanelHeader>
          {
            fetching
            ? (
              <DivSpinner />
            )
            : vacancyOwnerVkInfo && vacancy && (
              <div>
                <Group title="Информация о пользователе">
                  <Cell
                    size="l"
                    before={<Avatar src={vacancyOwnerVkInfo.photo_200} size={80} />}
                    bottomContent={
                      <Button onClick={() => this.sendApplication(vacancy.id, vkUserInfo.id)}>
                        Стать учеником
                      </Button>
                    }
                  >
                    {`${vacancyOwnerVkInfo.firstName} ${vacancyOwnerVkInfo.lastName}`}
                  </Cell>
                  {
                    vacancy.owner.creation_time && (
                      <Cell multiline description="Дата создания профиля">
                        <Moment locale="ru" format="D MMMM YYYY">
                          {vacancy.owner.creation_time}
                        </Moment>
                      </Cell>
                  )}
                  {
                    vacancy.owner.experience && (
                      <Cell multiline description="Опыт преподавания">
                        {vacancy.owner.experience}
                      </Cell>
                    )
                  }
                  {
                    vacancy.owner.education && (
                      <Cell multiline description="Образование">
                        {vacancy.owner.education}
                      </Cell>
                    )
                  }
                  {
                    vacancy.owner.city && (
                      <Cell multiline description="Город">
                        {vacancy.owner.city}
                      </Cell>
                    )
                  }
                  {
                    vacancy.owner.district && (
                      <Cell multiline description="Район">
                        {vacancy.owner.district}
                      </Cell>
                    )
                  }
                  {
                    vacancy.owner.street && (
                      <Cell multiline description="Улица">
                        {vacancy.owner.street}
                      </Cell>
                    )
                  }
                  {
                    vacancy.owner.metro_station && (
                      <Cell multiline description="Станция метро">
                        {vacancy.owner.metro_station}
                      </Cell>
                    )
                  }
                  {
                    vacancy.owner.description && (
                      <Cell multiline description="О себе">
                        {vacancy.owner.description}
                      </Cell>
                    )
                  }
                </Group>
                <Group title="Информация о вакансии">
                  <Cell
                    multiline
                    description="Предмет обучения"
                    before={<Icon24Education />}
                  >
                    {vacancy.subject}
                  </Cell>
                  <Cell
                    multiline
                    description="Стоимость занятия"
                    before={<Icon24MoneyCircle/>}
                  >
                    {vacancy.price} рублей/час
                  </Cell>
                  <Cell
                    multiline
                    description="Дополнительная информация"
                    before={<Icon24Info />}
                  >
                    {vacancy.extra_info || "Не указана"}
                  </Cell>
                </Group>
              </div>
            )
          }
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ShowVacancy);
