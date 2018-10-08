import styled from 'styled-components';
import { getClassName, Div } from '@vkontakte/vkui';

const baseClassName = getClassName('Div');

const FlexDiv = styled(Div).attrs({
  className: baseClassName
})`
  display: flex;
`;

export default FlexDiv;