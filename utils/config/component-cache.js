export const ComponentCache = {
  max:    (process.env.NODE_ENV === 'production') ? 10000 : 0,
  maxAge: (process.env.NODE_ENV === 'production') ? 1000 * 60 * 60 : 0
}
