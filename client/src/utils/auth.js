export const isBrowser = () => typeof window !== 'undefined';
export const getUser = () =>
  isBrowser() && window.localStorage.getItem('user')
    ? JSON.parse(window.localStorage.getItem('user'))
    : null;

export const setUser = user =>
  window.localStorage.setItem('user', JSON.stringify(user));
export const removeUser = () => window.localStorage.removeItem('user');
export const isLoggedIn = () => {
  if (!isBrowser()) return false;
  const token = window.localStorage.getItem('jwtToken');
  return !!token;
};
