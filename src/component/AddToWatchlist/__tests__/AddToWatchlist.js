import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import reducer from '../../../../__mocks__/reducer';
import { Provider } from 'react-redux';
import AddToWatchlist from '../AddToWatchlist';
import { render } from '../../../utils/testWrapper';
import TextInputCustom from '../../TextInputCustom/TextInputCustom';
const store = createStore(reducer);

let tree;
let title = 'AddToWatchlist';
beforeEach(() => {
  tree = shallow(
    <Provider store={store}>
      <AddToWatchlist />
    </Provider>,
  );
});

test(`${title} - renders correctly`, () => {
  expect(tree).toMatchSnapshot();
});

it(`${title} - loading test`, () => {
  const screen = render(<AddToWatchlist />);
  screen.getByTestId('Add portfolio to watchlist');
  // expect(tree.find(TextInputCustom));
});

it(`${title} - not loading test`, () => {
  const screen = render(<AddToWatchlist twitterWebURL={'test'} />);
  screen.getByTestId('WebView');
});
