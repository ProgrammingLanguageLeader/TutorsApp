import React from 'react';

import Alert from '@vkontakte/vkui/dist/components/Alert/Alert';

const ConfirmationPrompt = ({
  onConfirm,
  onCancel = () => {},
  onClose = () => {},
  label,
  header = "Подтверждение"
}) => (
  <div className="View__popout">
    <Alert
      actions={[{
        action: onConfirm,
        title: 'Да',
        autoclose: true,
        style: 'destructive'
      }, {
        action: onCancel,
        title: 'Нет',
        autoclose: true,
        style: 'cancel'
      }]}
      onClose={onClose}
    >
      <h2>{header}</h2>
      <p>{label}</p>
    </Alert>
  </div>
);

export default ConfirmationPrompt;