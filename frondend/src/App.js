/* eslint-disable import/no-extraneous-dependencies */
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import Layout from './components/Layout';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  if (user?.data?.blocked === true) {
    return <div>Your account has been blocked by an admin.</div>;
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout />
      </PersistGate>
    </Provider>
  );
}

export default App;
