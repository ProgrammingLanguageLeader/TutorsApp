import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const FlexDiv = styled.div`
  display: flex;
`;

const FlexDivWithPadding = styled(FlexDiv)`
  padding-top: 8px;
  padding-bottom: 8px;
`;

const GraySmallTextDiv = styled.div`
  color: var(--text_secondary);
  font-size: 14px;
`;

const NotificationCell = ({ notification, onSenderClick, buttonBefore, onButtonClick, buttonLabel }) => {
  const { verb } = notification;
  const notificationLabel =
      verb === 'student request create' && 'Создана заявка на добавление в список учеников'
      || verb === 'lesson create' && 'Создан урок'
      || verb === 'student request accept' && 'Принята заявка на добавление в список учеников'
      || verb === 'student request reject' && 'Отклонена заявка на добавление в список учеников'
      || verb === 'lesson delete' && 'Удален урок'
      || verb === 'lesson update' && 'Изменение урока'
      || verb === 'lesson payment' && 'Оплата урока'
      || verb;
  const isExpandable = Boolean(notification.target);
  return (
    <Cell multiline expandable={isExpandable}>
      {notification.sender && (
        <FlexDiv onClick={onSenderClick}>
          <Avatar size={64} src={ROOT_URL + notification.sender.avatar} />
          <Div>
            <div>
              {notification.sender.first_name} {notification.sender.last_name}
            </div>
            {isExpandable && (
              <GraySmallTextDiv>
                Нажмите для просмотра
              </GraySmallTextDiv>
            )}
          </Div>
        </FlexDiv>
      )}

      {verb === 'lesson payment' && notification.target.tutor && (
        <FlexDiv onClick={onSenderClick}>
          <Avatar size={64} src={ROOT_URL + notification.target.tutor.avatar} />
          <Div>
            <div>
              {notification.target.tutor.first_name} {notification.target.tutor.last_name}
            </div>
            {isExpandable && (
              <GraySmallTextDiv>
                Нажмите для просмотра
              </GraySmallTextDiv>
            )}
          </Div>
        </FlexDiv>
      )}
      <FlexDivWithPadding>
        { notificationLabel }
      </FlexDivWithPadding>
      <FlexDivWithPadding>
        <Button
          size="m"
          level="outline"
          before={buttonBefore}
          onClick={onButtonClick}
        >
          { buttonLabel }
        </Button>
      </FlexDivWithPadding>
      <FlexDiv>
        <GraySmallTextDiv>
          <Moment format="LLLL" value={notification.creation_time} />
        </GraySmallTextDiv>
      </FlexDiv>
    </Cell>
  );
};

export default NotificationCell;