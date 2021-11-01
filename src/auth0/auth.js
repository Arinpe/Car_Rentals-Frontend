import auth0 from 'auth0-js';

export default function Auth(historyValue) {
  const history = historyValue;
  let userProfile = null;
  const auth = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  const login = () => auth.authorize();

  const setSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime(),
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  const handleAuthentication = () => {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        // history.push('/');
      } else if (err) {
        console.log(err);
        history.push('/error');
        throw new Error(err);
      }
    });
  };

  const isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    auth.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: process.env.REACT_APP_API_URL,
    });
  };

  const getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found.');
    }
    return accessToken;
  };

  const getProfile = cb => {
    if (userProfile) return cb(userProfile);
    return auth.client.userInfo(getAccessToken(), (err, profile) => {
      if (profile) userProfile = profile;
      cb(profile, err);
    });
  };

  return {
    login,
    isAuthenticated,
    logout,
    handleAuthentication,
    getAccessToken,
    getProfile,
  };
}
