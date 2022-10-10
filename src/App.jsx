import React from 'react';
import RoutesApp from './route'
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <RoutesApp />
    </Provider>
  );
};

export default App;
