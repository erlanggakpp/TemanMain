const axios = require("axios");

async function authenticator(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "NoToken" };
    }
    // const { data: user } = await axios.get(
    //   "http://localhost:4001/users/log-in",
    //   {
    //     headers: {
    //       access_token,
    //     },
    //   }
    // );
    const { data: user } = await axios({
      method: "GET",
      url: "http://localhost:4001/users/tokenChecker",
      headers: {
        access_token: access_token,
      },
    });
    next();
  } catch (error) {
    console.log(error, "AUTHENTICATOR");
    next(error);
  }
}

module.exports = authenticator;
