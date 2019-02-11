import React from 'react';
import moment from 'moment';
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

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : moment(),
    };
  }

  render() {
    const { onChange } = this.props;
    const { value } = this.state;

    return (
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
            max={24}
            step={1}
            value={value.hours()}
            onChange={hour => {
              const newValue = value.set('hour', hour);
              this.setState({
                value: newValue
              });
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
            max={60}
            step={5}
            value={value.minutes()}
            onChange={minute => {
              const newValue = value.set('minute', minute);
              this.setState({
                value: newValue
              });
              onChange(newValue);
            }}
          />
        </PaddingTopBottomDiv>
      </BorderedDiv>
    );
  }
}

export default TimePicker;