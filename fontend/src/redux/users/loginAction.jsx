export const loginAction = (userName, image) => ({
  type: 'LOGIN_SUCCESS',
  payload: {
    userName,
    image,
  },
});