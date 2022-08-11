import React from 'react';
import { NavDropdown } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

const Navbar = () => {
  const styles = {
    textDecoration: 'none',
    color: 'hsl(var(--clr-light))',
  };

  const { userInfo, setUserInfo } = useGlobalContext();

  const signoutHandler = () => {
    setUserInfo(null);

    localStorage.removeItem('userInfo');
  };
  return (
    <div className="div-navbar flex fs-400 text-white ">
      <ul className="nav-list">
        <li>
          {' '}
          {!userInfo && (
            <Link style={styles} to="/getjobs">
              {' '}
              Find your employee{' '}
            </Link>
          )}{' '}
        </li>{' '}
        <li>
          {' '}
          {userInfo ? (
            <NavDropdown
              id="basic-nav-dropdown"
              title="Your Data"
              style={styles}
            >
              <ul className="dropdown-container">
                <li className="dropdown-list">
                  <Link
                    className="dropdown-item"
                    to="/users/joblist"
                    style={styles}
                  >
                    {' '}
                    Job List{' '}
                  </Link>{' '}
                </li>{' '}
                <li className="dropdown-list">
                  {' '}
                  <Link
                    to="/users/postjob"
                    className="dropdown-item"
                    style={styles}
                  >
                    Post Job{' '}
                  </Link>{' '}
                </li>{' '}
              </ul>{' '}
            </NavDropdown>
          ) : (
            <Link to="/users/login" style={styles}>
              Login{' '}
            </Link>
          )}{' '}
        </li>{' '}
        <li>
          <Link to="/" style={styles}>
            Home{' '}
          </Link>{' '}
        </li>
        {userInfo && (
          <li>
            <Link to="/" style={styles} onClick={signoutHandler}>
              Sign Out{' '}
            </Link>{' '}
          </li>
        )}
        {userInfo ? (
          <li className="user-name">
            {' '}
            <p> Welcome to your personal job service </p>{' '}
            <span>
              <strong> {userInfo.name} </strong>{' '}
            </span>{' '}
          </li>
        ) : (
          <li>
            <Link style={styles} to="/users/signup">
              Sign Up{' '}
            </Link>{' '}
          </li>
        )}{' '}
      </ul>{' '}
    </div>
  );
};

export default Navbar;
