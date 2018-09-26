import styled from 'styled-components';
import { getClassName, Button } from '@vkontakte/vkui';

const buttonBaseClassName = getClassName('Button');

const CircleButton = styled(Button).attrs({
  className: buttonBaseClassName
})`
  width: 40%;
  padding-top: 20%;
  padding-bottom: 20%;
  border-radius: 50%;
  margin: 5px;
`;

export default CircleButton;
