export const loginAction = (userName, image, accessToken, dataUser) => ({
  type: 'LOGIN_SUCCESS',
  payload: {
    userName,
    image,
    accessToken,
    dataUser
  },
});