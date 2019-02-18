import React from 'react';
import styled from 'styled-components';

import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import List from '@vkontakte/vkui/dist/components/List/List';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const PaddingTopGroup = styled(Group)`
  padding-top: 8px;
`;

const ShortUserCard = ({ user, history, isStudent, onDelete }) => (
  <PaddingTopGroup key={user.id}>
    <List>
      <Cell
        multiline
        expandable
        description="Нажмите для просмотра страницы пользователя"
        before={<Avatar size={64} src={ROOT_URL + user.avatar} />}
        onClick={() => history.push(`/user/${user.id}`)}
      >
        {user.first_name} {user.last_name}
      </Cell>

      {user.city && (
        <Cell multiline description="Город">
          {user.city}
        </Cell>
      )}

      {user.district && (
        <Cell multiline description="Район">
          {user.district}
        </Cell>
      )}

      {user.street && (
        <Cell multiline description="Улица">
          {user.street}
        </Cell>
      )}

      {user.metro_station && (
        <Cell multiline description="Станция метро">
          {user.metro_station}
        </Cell>
      )}

      {isStudent && (
        <CellButton level="danger" before={<Icon24Cancel/>} onClick={onDelete}>
          Удалить ученика
        </CellButton>
      )}
    </List>
  </PaddingTopGroup>
);

export default ShortUserCard;