import styled from 'styled-components';

const BackgroundDiv = styled.div`
  ${props => props.image ? `background-image: url(${props.image})` : ""};
  background-size: 100%;
  background-repeat: no-repeat;
  height: 100vh;
`;

export default BackgroundDiv;