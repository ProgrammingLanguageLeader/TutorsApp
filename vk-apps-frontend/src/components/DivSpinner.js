import React from 'react';

import { Spinner } from '@vkontakte/vkui';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <Spinner size="large" style={{ marginTop: 20 }} />
  </div>
);