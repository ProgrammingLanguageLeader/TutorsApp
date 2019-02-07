import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import { Provider } from 'react-redux';

import App from 'vk-apps-frontend/App';
import store from 'vk-apps-frontend/store/store';

configure({
  adapter: new Adapter()
});

describe('>>> APP testing', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});