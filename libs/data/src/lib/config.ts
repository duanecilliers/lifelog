export const configuration = () => ({
  environment: process.env.NODE_ENV,
  post: parseInt(process.env.PORT || '3000', 10),
  admin: {
    email: process.env.NX_ADMIN_EMAIL,
    password: process.env.NX_ADMIN_PASSWORD,
  },
});
