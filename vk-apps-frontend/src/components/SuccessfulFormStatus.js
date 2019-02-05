import React from 'react';
import styled from 'styled-components';

import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';

const SuccessfulFormStatus = styled(FormStatus).attrs({
  state: "default"
})`
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
`;

export default SuccessfulFormStatus;