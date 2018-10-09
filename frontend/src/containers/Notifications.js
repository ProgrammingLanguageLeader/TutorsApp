import React from 'react';
import { connect } from 'react-redux';

import { View, Panel, PanelHeader, Group, Avatar, Cell, 
  city, first_name, last_name, photo_200, Button
} from '@vkontakte/vkui';

import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';

import FlexdDiv from '../components/FlexDiv';
import { locationActions } from '../actions/location';

class Notifications extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      activePanel: 'notifications'
    }
  }

  render () {

    return (
      <View activePanel={this.state.activePanel}>
        <Panel id="notifications">
          <PanelHeader>
            Уведомления
          </PanelHeader>
          <Group title="Заявки">
            {/* TODO: Список заявок с бэка */}
            <Cell
								size="l"
								description={city ? city.title : ""}
                before={<Avatar src={photo_200} />}
                asideContent={
                <Icon24MoreHorizontal style={{ paddingBottom: 60 }}/>
              }
                bottomContent={
                  <FlexdDiv>
                    <Button size="l" stretched style={{ width: 120 }}>Принять</Button>
                    <Button size="l" level="outline" stretched style={{ marginLeft: 8 }}>Отклонить</Button>
                  </FlexdDiv>
                }
                onClick
							>
								{`${first_name} ${last_name}`}
							</Cell>
          </Group>
        </Panel>
      </View>
    )
  }
};

const mapStateToProps = state => {
  const { activePanel } = state.locationReducer;
  return {
    activePanel,
  };
}

export default connect(mapStateToProps)(Notifications);
