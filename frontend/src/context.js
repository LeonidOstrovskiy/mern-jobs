import React from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);

  const [userInfo, setUserInfo] = React.useState(
    localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null
  );

  return (
    <AppContext.Provider value={{ userInfo, setUserInfo, loading, setLoading }}>
      {' '}
      {children}{' '}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { AppProvider, useGlobalContext };
