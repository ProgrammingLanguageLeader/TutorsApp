import React from 'react';
import { platform, IOS } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const BackButton = () => {
  const osname = platform();
  if (osname === IOS) {
    return <Icon28ChevronBack />;
  }
  return <Icon24Back />;
};

export default BackButton;