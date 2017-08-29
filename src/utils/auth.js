import decode from 'jwt-decode';

const ID_TOKEN_KEY = 'ID_TOKEN';

export function logout() {
  clearIdToken();
  // router.go('/');
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

// Get and store id_token in local storage
export function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN_KEY, idToken || '');
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function getUserFromToken() {
  const idToken = getIdToken();
  var user = null;
  try {
    const token = decode(idToken);
    user = {
      username: token.username,
      id: token.id
    };
  }
  catch(ex) {
  }
  return user;
}
