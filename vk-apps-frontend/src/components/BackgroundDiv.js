import styled from 'styled-components';

const BackgroundDiv = styled.div`
  ${props => props.image ? `background-image: url(${props.image})` : ""};
  background-size: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100vh - 56px - 48px);
`;

export default BackgroundDiv;