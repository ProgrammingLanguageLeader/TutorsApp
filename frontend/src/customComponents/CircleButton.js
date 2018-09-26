import styled from 'styled-components';
import { getClassName, Button } from '@vkontakte/vkui';

const buttonBaseClassName = getClassName('Button');

const CircleButton = styled(Button).attrs({
  className: buttonBaseClassName
})`
  width: 40%;
  padding-top: 10%;
  padding-bottom: 10%;
  border-radius: 20px;
  margin: 5px;
  font-size: 28pt;
`;

export default CircleButton;
