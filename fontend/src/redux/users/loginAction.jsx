export const loginAction = (userName, image, accessToken, role, fullName, dataUser) => ({
  type: 'LOGIN_SUCCESS',
  payload: {
    userName,
    image,
    accessToken,
    role,
    fullName,
    dataUser
  },
});