/* eslint-disable */
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function IsLogged() {
  const user = localStorage.getItem('profile')
  // const user = useSelector((state) => state.auth);
  console.log(user)
  return (
    user ? <Outlet /> : <Navigate to="/login" />
  );
}

function LoggedIn() {
  const user = localStorage.getItem('profile')
  // const user = useSelector((state) => state.auth);
  console.log(user)
  return (
    user ? <Navigate to="/" /> : <Outlet />
  );
}

export { IsLogged, LoggedIn };
