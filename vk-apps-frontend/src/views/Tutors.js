import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';
import List from '@vkontakte/vkui/dist/components/List/List';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

import { tutorsActions } from 'vk-apps-frontend/actions/api';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const PaddingTopGroup = styled(Group)`
  padding-top: 8px;
`;

const mapStateToProps = state => {
  const { tutors, fetching } = state.apiReducer.tutorsReducer;
  const { currentUserReducer } = state;
  return {
    tutors,
    fetching,
    currentUserReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTutorsList: bindActionCreators(tutorsActions.getTutorsList, dispatch),
  };
};

class Tutors extends React.Component {
  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      this.props.getTutorsList();
    }
  }

  render() {
    const { tutors, fetching } = this.props;

    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={this.props.history.goBack}>
            <BackIcon />
          </HeaderButton>
        }>
          Список учителей
        </PanelHeader>

        {fetching && (
          <DivSpinner />
        )}

        {tutors.map(tutor => (
          <PaddingTopGroup key={tutor.id}>
            <List>
              <Cell
                multiline
                expandable
                description="Нажмите для просмотра страницы пользователя"
                before={<Avatar size={64} src={ROOT_URL + tutor.avatar} />}
                onClick={() => this.props.history.push(`/user/${tutor.id}`)}
              >
                {tutor.first_name} {tutor.last_name}
              </Cell>

              {tutor.city && (
                <Cell multiline description="Город">
                  {tutor.city}
                </Cell>
              )}

              {tutor.district && (
                <Cell multiline description="Район">
                  {tutor.district}
                </Cell>
              )}

              {tutor.street && (
                <Cell multiline description="Улица">
                  {tutor.street}
                </Cell>
              )}

              {tutor.metro_station && (
                <Cell multiline description="Станция метро">
                  {tutor.metro_station}
                </Cell>
              )}
            </List>
          </PaddingTopGroup>
        ))}
        <Footer>
          Показано пользователей: {tutors.length}
        </Footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutors);