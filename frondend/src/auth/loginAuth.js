/* eslint-disable */
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function IsLogged() {
  const user = localStorage.getItem('access_token')
  return (
    user ? <Outlet /> : <Navigate to="/login" />
  );
}

function LoggedIn() {
  const user = localStorage.getItem('access_token')
  return (
    user ? <Navigate to="/" /> : <Outlet />
  );
}

export { IsLogged, LoggedIn };
