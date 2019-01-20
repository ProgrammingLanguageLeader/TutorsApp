import React from "react";
import { Div, Cell, Avatar, Button } from "@vkontakte/vkui";

const ApplicationCreationCell = ({ vkProfile, onClick, onAccept, onReject, label }) => {
  return (
    <Cell>
      <Cell
        multiline
        expandable
        onClick={onClick}
        description={label}
        before={
          <Avatar size={64} src={vkProfile.photo_200}/>
        }
      >
        { vkProfile.firstName } { vkProfile.lastName }
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

export default ApplicationCreationCell;