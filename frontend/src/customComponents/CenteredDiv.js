import styled from 'styled-components';
import { getClassName, Div } from '@vkontakte/vkui';

const baseClassName = getClassName('Div');

const CenteredDiv = styled(Div).attrs({
  className: baseClassName
})`
  text-align: center;
`;

export default CenteredDiv;