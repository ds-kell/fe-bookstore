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
      accessToken: JSON.stringify(userToken.data.accessToken),
      refreshToken: JSON.stringify(userToken.data.refreshToken)
    });

    setToken(userToken.data.accessToken);
    setTokenStorage(userTokenString);

    sessionStorage.setItem('userToken', userTokenString);
    sessionStorage.setItem('token', userToken.data.accessToken);
  };

  return {
    setToken: saveToken,
    tokenStorage,
    token
  };
}
