import styled from 'styled-components';

const CircleButton = styled.button`
  width: 40%;
  padding-top: 20%;
  padding-bottom: 20%;
  border-radius: 50%;
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
