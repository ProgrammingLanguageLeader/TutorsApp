import React from 'react';
import styled from 'styled-components';

import Spinner from '@vkontakte/vkui/dist/components/Spinner/Spinner';

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;

export default () => (
  <SpinnerWrapper>
    <Spinner size="large" />
  </SpinnerWrapper>
);