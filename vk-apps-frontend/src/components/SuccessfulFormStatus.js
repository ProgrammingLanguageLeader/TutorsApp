import React from 'react';
import styled from 'styled-components';

import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';

const SuccessfulDiv = styled.div`
  border-radius: 10px;
  padding: 12px;
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
`;

const SuccessfulFormStatus = ({ title }) => (
  <SuccessfulDiv>
    {title}
  </SuccessfulDiv>
);

export default SuccessfulFormStatus;