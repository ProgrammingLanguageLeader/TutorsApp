import React from 'react';
import { connect } from 'react-redux';
import {
	View, Panel, PanelHeader, HeaderButton, Cell, Avatar, Group, List, Tabs, TabsItem, FixedLayout
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';

import { apiActions } from '../actions/api';
import { locationActions } from '../actions/location';

class ActiveTutor extends React.Component {
	constructor(props) {
    super(props);
    
    this.state = {
      activeTab: 'request'
    }
	}

	render() {
		return (
			<View id={this.props.id} activePanel="active_tutor">
				<Panel id={this.props.activePanel}>
					<PanelHeader noShadow>
						Активные
					</PanelHeader>
          <FixedLayout vertical="top">
            <Tabs 
              theme="header"
              type="buttons"
            >
              <TabsItem onClick={() => this.setState({ activeTab: 'request' })}
                selected={this.state.activeTab === 'request'}
              >
                Мои завки
              </TabsItem>
              <TabsItem onClick={() => this.setState({ activeTab: 'students' })}
                selected={this.state.activeTab === 'students'}
              >
                Ученики
              </TabsItem>
            </Tabs>
          </FixedLayout>
        
          <Group style={{ marginTop: 52 }}>
            <List>
              <Cell
                size="l"
                description="89045678463. Москва, ул. Удальцова, д. 4"
                before={
                  <Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>
                }
              >
                Артур
              </Cell>
            </List>
          </Group>
        </Panel>
      </View>
		);
	}
};

const mapStateToProps = state => {
	return state;
}

export default connect(mapStateToProps)(ActiveTutor);
