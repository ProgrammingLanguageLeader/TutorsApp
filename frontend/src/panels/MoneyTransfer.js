import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, Avatar, List, HeaderButton, Group
} from '@vkontakte/vkui';

import DivSpinner from '../components/DivSpinner';
import Main from '../components/Main';

import { locationActions } from '../actions';
import BackIcon from "../components/BackIcon";

const mapStateToProps = (state) => {
  return {};
};

class ShowProfile extends React.Component {
  render() {
    const fetching = false;

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
            <Main>
              <Group id="money_transfer" style={{ marginTop: 0 }}>
                <Cell>Example</Cell>
              </Group>
            </Main>
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ShowProfile);