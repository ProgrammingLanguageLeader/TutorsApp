import styled from 'styled-components';

const BackgroundDiv = styled.div`
  ${props => props.image ? `background-image: url(${props.image})` : ""};
  background-size: contain;
  height: 100vh;
`;

export default BackgroundDiv;