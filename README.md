# Nextjs OTP authentication example

1) Start redis+SMTP server `docker compose up`
2) Start nextjs `yarn dev`
3) Try to login with email, check SMTP server logs (`docker logs -f mailhog`) or [mail server webui](http://localhost:8025/) for OTP to enter into login form
4) You should be redirected to admin page

Redis stores OTP for [5 minutes](./src/auth/constants.ts) and session ID associated with email for [24 hours](./src/auth/constants.ts).
