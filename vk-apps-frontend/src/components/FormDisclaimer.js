import React from 'react';
import styled from 'styled-components';

import Div from '@vkontakte/vkui/dist/components/Div/Div';

const GraySmallTextDiv = styled(Div)`
  color: var(--text_secondary);
  font-size: 14px;
`;

export default () => (
  <GraySmallTextDiv>
    Пожалуйста, указывайте реальные данные. В случае, если они будут
    содержать нецензурную брань, оскорбление кого-либо и тому подобное,
    учётная запись может быть заблокирована
  </GraySmallTextDiv>
);