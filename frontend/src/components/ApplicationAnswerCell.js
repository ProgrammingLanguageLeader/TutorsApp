import React from "react";
import { Button, Div, Avatar, Cell } from "@vkontakte/vkui";

const ApplicationAnswerCell = ({ label, vkProfile, onMarkAsSeen, expandable, onClick }) => {
  return (
    <Cell>
      <Cell
        multiline
        description={label}
        expandable={expandable}
        before={
          <Avatar size={64} src={vkProfile.photo_200}/>
        }
        onClick={onClick}
      >
        { vkProfile.firstName } {vkProfile.lastName}
      </Cell>
      <Div>
        <Button size="l" level="secondary" onClick={onMarkAsSeen}>
          Пометить прочитанным
        </Button>
      </Div>
    </Cell>
  );
};

export default ApplicationAnswerCell;