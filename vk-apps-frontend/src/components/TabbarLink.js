import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TabbarLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  flex-shrink: 0;
  max-width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default TabbarLink;