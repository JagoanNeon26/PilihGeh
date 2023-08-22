const authHeader = () => {
  const Token = localStorage.getItem('auth-token');

  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Token: Token,
  };
};

export default authHeader;
