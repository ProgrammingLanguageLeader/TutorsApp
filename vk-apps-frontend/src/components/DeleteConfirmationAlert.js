import React from 'react';

import Alert from '@vkontakte/vkui/dist/components/Alert/Alert';

const DeleteConfirmationAlert = ({ onConfirm, onClose, label }) => (
  <Alert
    actions={[{
      action: onConfirm,
      title: 'Да',
      autoclose: true,
      style: 'destructive'
    }, {
      title: 'Нет',
      autoclose: true,
      style: 'cancel'
    }]}
    onClose={onClose}
  >
    <h2>Подтверждение</h2>
    <p>{label}</p>
  </Alert>
);

export default DeleteConfirmationAlert;