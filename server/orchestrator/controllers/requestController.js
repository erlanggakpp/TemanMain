const axios = require("axios");

class RequestController {
  static async createRequest(req, res) {
    try {
      const { eventId, magnetId } = req.params;
      const { id: user_id } = req.user;
      const { requestDescription } = req.body;
      const { data } = await axios({
        method: "POST",
        url: `http://localhost:4002/requests/event/${eventId}/magnet/${magnetId}`,
        data: {
          requestDescription,
        },
        headers: {
          user_id: user_id,
        },
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      //   const { status, data } = error.response;

      //   res.status(status).json(data);
    }
  }
  static async editRequest(req, res) {
    try {
      const { requestId } = req.params;
      const { id: user_id } = req.user;
      const { requestDescription } = req.body;
      console.log(requestDescription);
      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:4002/requests/${requestId}`,
        data: {
          requestDescription,
        },
        headers: {
          user_id: user_id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }

  static async getRequestByUserId(req, res) {
    try {
      const { id: userId } = req.user;
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:4002/requests/user`,
        headers: {
          user_id: userId,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }
  static async acceptRequest(req, res) {
    try {
      const { requestId } = req.params;
      const { id: user_id } = req.user;
      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:4002/requests/${requestId}/accept`,
        headers: {
          user_id: user_id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }
  static async removeRequested(req, res) {
    try {
      const { requestId } = req.params;
      const { id: user_id } = req.user;
      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:4002/requests/${requestId}/reject`,
        headers: {
          user_id: user_id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }
}

module.exports = RequestController;
