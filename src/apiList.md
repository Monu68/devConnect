
# devConnect APIs

## authRouter
- POST / signup
- POST / login
- POST / logout

## profileRouter
- GET / profile / view
- GET / profile / edit
- GET / profile / password // Forgot password api

## connectionRequestRouter
- POST / request send / interested / :userId
- POST / request send / ignored / :userId
- POST / request-review / accepted / :requestId
- POST / request-review / rejected / :userId

## userRouter
- GET / user / connections
- GET / user / requests / received
- GET / user / feed - gets you the profiles of users on platform


status: ignore, interested, accepted, rejected