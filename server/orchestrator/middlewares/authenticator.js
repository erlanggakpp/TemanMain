const axios = require("axios");

async function authenticator(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
        response: {
          data: {
            error: "Please login",
          },
          status: 401,
        },
      };
    }
    const { data: user } = await axios({
      method: "GET",
      url: "http://localhost:4001/users/tokenChecker",
      headers: {
        access_token: access_token,
      },
    });
    // console.log(user, "<<<<<<<<<<<<<<<<<<<<<");
    req.user = user;
    next();
  } catch (error) {
    const { status, data } = error.response;
    res.status(status).json(data);
  }
}

module.exports = authenticator;
