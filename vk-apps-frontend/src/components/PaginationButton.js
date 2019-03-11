import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 2px;
`;

const StyledActiveButton = styled(StyledButton)`
  color: #fff;
  background-color: var(--button_primary_background);
`;

export default ({ active, ...props }) => {
  return active
    ? <StyledActiveButton {...props} />
    : <StyledButton {...props} />
};