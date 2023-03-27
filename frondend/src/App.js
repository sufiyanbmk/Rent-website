import './App.css';
import Layout from './components/Layout';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  if (user?.data?.blocked === true) {
    return <div>Your account has been blocked by an admin.</div>;
  }
  return <Layout />;
}

export default App;
