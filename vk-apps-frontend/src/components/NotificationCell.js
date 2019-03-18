import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';

import CellHeaderDiv from 'vk-apps-frontend/components/CellHeaderDiv';
import AvatarFlexDiv from 'vk-apps-frontend/components/AvatarFlexDiv';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const notificationVerbs = {
  'student request create': 'Создана заявка на добавление в список учеников',
  'lesson create': 'Создан урок',
  'student request accept': 'Принята заявка на добавление в список учеников',
  'student request reject': 'Отклонена заявка на добавление в список учеников',
  'lesson delete': 'Удален урок',
  'lesson update': 'Изменение урока',
  'lesson payment': 'Оплата урока',
  'student delete': 'Вы были удалены из списка учеников',
};

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const FlexDivWithPadding = styled(FlexDiv)`
  padding-top: 4px;
  padding-bottom: 4px;
`;

const GraySmallTextDiv = styled.div`
  color: var(--text_secondary);
  font-size: 14px;
`;

const StyledSvgDiv = styled.div`
  padding-left: 8px;
  color: var(--icon_tertiary);
`;

const NotificationCell = ({ notification, onSenderClick, buttonBefore, onButtonClick, buttonLabel }) => {
  const { verb } = notification;
  const notificationLabel = notificationVerbs[verb] || verb;
  const isExpandable = Boolean(notification.target);
  return (
    <Cell multiline>
      { verb !== 'lesson payment' && notification.sender && (
        <FlexDiv onClick={onSenderClick}>
          <AvatarFlexDiv>
            <Avatar size={64} src={ROOT_URL + notification.sender.avatar} />
          </AvatarFlexDiv>
          <CellHeaderDiv>
            {notification.sender.first_name} {notification.sender.last_name}
          </CellHeaderDiv>
          {isExpandable && (
            <StyledSvgDiv>
              <Icon24Chevron />
            </StyledSvgDiv>
          )}
        </FlexDiv>
      )}

      {verb === 'lesson payment' && notification.target.tutor && (
        <FlexDiv onClick={onSenderClick}>
          <Avatar size={64} src={ROOT_URL + notification.target.tutor.avatar} />
          <CellHeaderDiv>
            {notification.target.tutor.first_name} {notification.target.tutor.last_name}
          </CellHeaderDiv>
          {isExpandable && (
            <StyledSvgDiv>
              <Icon24Chevron />
            </StyledSvgDiv>
          )}
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
          <Moment format="LLLL">
            {notification.creation_time}
          </Moment>
        </GraySmallTextDiv>
      </FlexDiv>
    </Cell>
  );
};

export default NotificationCell;