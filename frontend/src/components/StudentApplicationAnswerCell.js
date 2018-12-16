import React from "react";
import { Button, Div, Avatar, Cell } from "@vkontakte/vkui";

const StudentApplicationAnswerCell = ({ label, tutorVkProfile, onMarkAsSeen }) => {
  return (
    <div>
      <Cell
        multiline
        description={label}
        before={
          <Avatar size={64} src={tutorVkProfile.photo_200}/>
        }
      >
        { tutorVkProfile.firstName } {tutorVkProfile.lastName}
      </Cell>
      <Div>
        <Button size="l" level="secondary" onClick={onMarkAsSeen}>
          Пометить прочитанным
        </Button>
      </Div>
    </div>
  );
};

export default StudentApplicationAnswerCell;