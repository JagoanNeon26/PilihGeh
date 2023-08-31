export default function authHeaderFile() {
  const Token = localStorage.getItem('auth-token');

  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Token,
  };
}
