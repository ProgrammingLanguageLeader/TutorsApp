import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';

import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import CellHeaderDiv from 'vk-apps-frontend/components/CellHeaderDiv';
import AvatarFlexDiv from 'vk-apps-frontend/components/AvatarFlexDiv';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const NormalWhiteSpaceDiv = styled.div`
  white-space: normal;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const PaddingTopBottomDiv = styled.div`
  padding: 8px 0;
`;

const GraySmallTextDiv = styled.div`
  color: var(--text_secondary);
  font-size: 14px;
`;

const LessonCell = ({ lesson, currentUser, onClick }) => {
  const visibleUser = currentUser.user.id === lesson.tutor.id
    ? lesson.student
    : lesson.tutor;

  return (
    <Cell expandable multiline onClick={onClick}>
      <FlexDiv>
        <AvatarFlexDiv>
          <Avatar src={ROOT_URL + visibleUser.avatar} size={64}/>
        </AvatarFlexDiv>
        <CellHeaderDiv>
          {visibleUser.first_name} {visibleUser.last_name}
        </CellHeaderDiv>
      </FlexDiv>
      <NormalWhiteSpaceDiv>
        <PaddingTopBottomDiv>
          <GraySmallTextDiv>
            <Moment format="HH:mm - " date={lesson.beginning_time}/>
            <Moment format="HH:mm" date={lesson.ending_time}/>
            <div>{lesson.price} рублей за занятие</div>
          </GraySmallTextDiv>
        </PaddingTopBottomDiv>
      </NormalWhiteSpaceDiv>
    </Cell>
  );
};

export default LessonCell;