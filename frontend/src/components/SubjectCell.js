import React from "react";
import { Cell } from "@vkontakte/vkui";
import Icon24Done from "@vkontakte/icons/dist/24/done";

const SubjectCell = ({ subject, onClick, selected }) => {
  return (
    <Cell
      onClick={onClick}
      asideContent={
        selected
          ? <Icon24Done />
          : null
      }
    >
      { subject }
    </Cell>
  );
};

export default SubjectCell;