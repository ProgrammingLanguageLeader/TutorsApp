import React from "react";
import { Div, Cell, Avatar, Button } from "@vkontakte/vkui";

const StudentApplicationCell = ({ studentVkProfile, onClick, onAccept, onReject, label }) => {
  return (
    <Cell>
      <Cell
        multiline
        expandable
        onClick={onClick}
        description={label}
        before={
          <Avatar size={64} src={studentVkProfile.photo_200}/>
        }
      >
        { studentVkProfile.firstName } { studentVkProfile.lastName }
      </Cell>
      <Div>
        <Button size="l" onClick={onAccept}>
          Принять
        </Button>
        <Button size="l" style={{ marginLeft: 8, background: "#E64646" }} onClick={onReject}>
          Отклонить
        </Button>
      </Div>
    </Cell>
  );
};

export default StudentApplicationCell;