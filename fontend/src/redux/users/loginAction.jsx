export const loginAction = (userName) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
      userName,
    }
  });