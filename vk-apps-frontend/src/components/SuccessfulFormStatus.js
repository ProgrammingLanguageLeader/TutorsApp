import React from 'react';
import styled from 'styled-components';

const SuccessfulDiv = styled.div`
  border-radius: 10px;
  padding: 12px;
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  margin-left: 12px;
  margin-right: 12px;
`;

const SuccessfulFormStatus = ({ title }) => (
  <SuccessfulDiv>
    {title}
  </SuccessfulDiv>
);

export default SuccessfulFormStatus;