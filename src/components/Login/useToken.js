import { useState } from 'react';

export default function useToken() {

  const getUserToken = () => {
    const storedUserToken = localStorage.getItem('userToken');
    return storedUserToken ? JSON.parse(storedUserToken) : null;
  };

  const getToken = () => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? storedToken : null;
  }

  const [tokenStorage, setTokenStorage] = useState(getUserToken());
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    const userTokenString = JSON.stringify({
      accessToken: userToken.data.accessToken,
      refreshToken: userToken.data.refreshToken
    });

    setToken(userToken.data.accessToken);
    setTokenStorage(userTokenString);

    localStorage.setItem('tokenStorage', userTokenString);
    localStorage.setItem('token', JSON.stringify(userToken.data.accessToken));
  };

  return {
    setToken: saveToken,
    tokenStorage,
    token
  };
}
