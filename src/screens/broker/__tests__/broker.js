import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '../../../utils/testWrapper';
import { render as renderLibrary } from '@testing-library/react-native';
import reducer from '../../../../__mocks__/reducer';
import BrokerView from '../broker';
const store = createStore(reducer);

let tree;
let title = 'Testing';
beforeEach(() => {
  tree = render(
    <Provider store={store}>
      <BrokerView />
    </Provider>,
  );
});

test(`${title} - renders correctly`, () => {
  expect(tree).toMatchSnapshot();
});

it(`${title} - loading test`, () => {
  const screen = render(<BrokerView />);
  screen.getByTestId('activity');
});

it(`${title} - not loading test`, () => {
  const screen = render(<BrokerView angelURL={'https://www.google.com'} />);
  screen.getByTestId('WebView');
});
