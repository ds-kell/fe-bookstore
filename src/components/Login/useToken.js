import { useState } from 'react';

export default function useToken() {

  const getUserToken = () => {
    const storedUserToken = sessionStorage.getItem('userToken');
    return storedUserToken ? JSON.parse(storedUserToken) : null;
  };

  const getToken = () => {
    const storedToken = sessionStorage.getItem('token');
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

    sessionStorage.setItem('tokenStorage', userTokenString);
    sessionStorage.setItem('token', JSON.stringify(userToken.data.accessToken));
  };

  return {
    setToken: saveToken,
    tokenStorage,
    token
  };
}
