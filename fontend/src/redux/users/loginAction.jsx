export const loginAction = (userName, image, accessToken) => ({
  type: 'LOGIN_SUCCESS',
  payload: {
    userName,
    image,
    accessToken,
  },
});