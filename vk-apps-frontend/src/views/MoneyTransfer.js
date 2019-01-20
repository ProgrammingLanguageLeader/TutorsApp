import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, Avatar, HeaderButton, Group
} from '@vkontakte/vkui';

import DivSpinner from '../components/DivSpinner';

import { locationActions } from '../actions';
import BackIcon from "../components/BackIcon";

const mapStateToProps = (state) => {
  return state;
};

class ShowProfile extends React.Component {
  render() {
    const fetching = false;
    const outgoingPaymentsApplication = [];
    const incomingPaymentsApplication = [];

    return (
      <View id={this.props.id} activePanel="money_transfer">
        <Panel id="money_transfer">
          <PanelHeader left={
            <HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
              <BackIcon />
            </HeaderButton>
          }>
            Платежи
          </PanelHeader>
          { fetching ? (
            <DivSpinner />
          ) : (
            <div>
              <Group title="Исходящие платежи">
                { outgoingPaymentsApplication.length > 0
                  ? (
                    <Avatar/>
                  )
                  : (
                    <Cell multiline>
                      Вы не запрашивали оплату занятий в ближайшие 2 недели
                    </Cell>
                  )
                }
              </Group>
              <Group title="Входящие платежи">
                {
                  incomingPaymentsApplication.length > 0
                  ? (
                    <Avatar/>
                  )
                  : (
                    <Cell multiline>
                      У вас нет уведомлений о входящих платежах
                    </Cell>
                  )
                }
              </Group>
            </div>
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ShowProfile);