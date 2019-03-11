import React from 'react';
import styled from 'styled-components';

import Slider from '@vkontakte/vkui/dist/components/Slider/Slider';

const PaddingTopBottomDiv = styled.div`
  padding: 8px 0;
`;

const MarginLeftRightDiv = styled.div`
  margin: 0 18px;
`;

const BorderedDiv = styled.div`
  border: 1px solid var(--field_border);
  border-radius: 10px;
  padding: 5px;
`;

const TimeDiv = styled.div`
  font-size: 32px;
  padding: 10px;
  text-align: center;
`;

const TimePicker = ({ value, onChange }) => (
  <BorderedDiv>
    <TimeDiv>
      {value.format("HH:mm")}
    </TimeDiv>

    <PaddingTopBottomDiv>
      <MarginLeftRightDiv>
        Часы
      </MarginLeftRightDiv>
      <Slider
        min={0}
        max={23}
        step={1}
        value={value.hours()}
        onChange={hour => {
          const newValue = value.set('hour', hour);
          onChange(newValue);
        }}
      />
    </PaddingTopBottomDiv>

    <PaddingTopBottomDiv>
      <MarginLeftRightDiv>
        Минуты
      </MarginLeftRightDiv>
      <Slider
        top="Минуты"
        min={0}
        max={55}
        step={5}
        value={value.minutes()}
        onChange={minute => {
          const newValue = value.set('minute', minute);
          onChange(newValue);
        }}
      />
    </PaddingTopBottomDiv>
  </BorderedDiv>
);

export default TimePicker;