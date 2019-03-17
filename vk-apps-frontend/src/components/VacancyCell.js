import React from 'react';
import styled from 'styled-components';

import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const NormalWhiteSpaceDiv = styled.div`
  white-space: normal;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarFlexDiv = styled.div`
  display: flex;
  flex: 0 0 64px;
`;

const PaddingTopBottomDiv = styled.div`
  padding: 8px 0;
`;

const PaddingLeftDiv = styled.div`
  padding: 0 8px;
`;

const GraySmallTextDiv = styled.div`
  color: var(--text_secondary);
  font-size: 14px;
`;

const VacancyCell = ({ vacancy, onClick }) => {
  return (
    <Cell multiline onClick={onClick}>
      <FlexDiv>
        <AvatarFlexDiv>
          <Avatar size={64} src={ROOT_URL + vacancy.owner.avatar} />
        </AvatarFlexDiv>
        <NormalWhiteSpaceDiv>
          <PaddingLeftDiv>
            {vacancy.owner.first_name} {vacancy.owner.last_name}
          </PaddingLeftDiv>
        </NormalWhiteSpaceDiv>
      </FlexDiv>
      <NormalWhiteSpaceDiv>
        <PaddingTopBottomDiv>
          <GraySmallTextDiv>
            <GraySmallTextDiv>
              <div>Предмет - {vacancy.subject}</div>
              <div>Город - {vacancy.owner.city}</div>
              <div>Цена - {vacancy.price} рублей/час</div>
            </GraySmallTextDiv>
          </GraySmallTextDiv>
        </PaddingTopBottomDiv>
      </NormalWhiteSpaceDiv>
    </Cell>
  );
};

export default VacancyCell;