import React from 'react';
import styled from 'styled-components';

import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import CellHeaderDiv from 'vk-apps-frontend/components/CellHeaderDiv';
import AvatarFlexDiv from 'vk-apps-frontend/components/AvatarFlexDiv';

import { ROOT_URL } from 'vk-apps-frontend/constants';

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

const HiddenOverflowDiv = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const VacancyCell = ({ vacancy, onClick }) => {
  return (
    <Cell expandable multiline onClick={onClick}>
      <FlexDiv>
        <AvatarFlexDiv>
          <Avatar size={64} src={ROOT_URL + vacancy.owner.avatar} />
        </AvatarFlexDiv>
        <CellHeaderDiv>
          {vacancy.owner.first_name} {vacancy.owner.last_name}
        </CellHeaderDiv>
      </FlexDiv>
      <PaddingTopBottomDiv>
        <GraySmallTextDiv>
          <HiddenOverflowDiv>
            Предмет - {vacancy.subject}
          </HiddenOverflowDiv>
          {vacancy.owner.city && (
            <HiddenOverflowDiv>
              Город - {vacancy.owner.city}
            </HiddenOverflowDiv>
          )}
          <HiddenOverflowDiv>
            Цена - {vacancy.price} рублей/час
          </HiddenOverflowDiv>
        </GraySmallTextDiv>
      </PaddingTopBottomDiv>
    </Cell>
  );
};

export default VacancyCell;