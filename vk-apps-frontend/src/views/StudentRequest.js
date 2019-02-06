import React from 'react';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import BackIcon from 'vk-apps-frontend/components/BackIcon';

class StudentRequest extends React.Component {
  render() {
    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={this.props.history.goBack}>
            <BackIcon />
          </HeaderButton>
        }>
          Заявка ученика
        </PanelHeader>
        <Group title="Информация о заявке">
          <div style={{ display: "flex", padding: 8 }}>
            <Button
              size="m"
              level="primary"
              before={<Icon24Add/>}
              style={{ marginRight: 4 }}
              onClick={() => console.log('Раньше здесь был мат')}
            >
              Принять
            </Button>
            <Button
              size="m"
              level="secondary"
              before={<Icon24Cancel/>}
              onClick={() => console.log('Раньше здесь был мат')}
            >
              Отклонить
            </Button>
          </div>
        </Group>
      </div>
    );
  }
}

export default StudentRequest;