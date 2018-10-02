import styled from 'styled-components';

const CircleButton = styled.button`
  width: 36vw;
  padding-top: 18vw;
  padding-bottom: 18vw;
  border-radius: 5%;
  margin: 5px;
  border: none;
  color: #ffffff;
  background-color: #5181b8;
  outline: none;

  &:active {
    background-color: #4872a3;
  }
`;

export default CircleButton;
