const axios = require("axios");

class InvitationController {
  static async createInvitation(req, res) {
    try {
      const { id } = req.user;
      const { eventId, magnetId, userId } = req.params;
      const { invitationDescription } = req.body;
      const { data } = await axios({
        method: "POST",
        url: `http://localhost:4002/invitations/event/${eventId}/magnet/${magnetId}/user/${userId}`,
        data: {
          invitationDescription,
        },
        headers: {
          user_id: id,
        },
      });
      res.status(201).json(data);
    } catch (error) {
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }
  static async editInvitation(req, res) {
    try {
      const { invitationId } = req.params;
      const { id } = req.user;
      const { invitationDescription } = req.body;
      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:4002/invitations/${invitationId}`,
        data: {
          invitationDescription,
        },
        headers: {
          user_id: id,
        },
      });
      res.status(201).json(data);
    } catch (error) {
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }
  static async getInvitationByUserId(req, res) {
    try {
      const { id: userId } = req.user;
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:4002/invitations/user`,
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

  static async acceptInvitation(req, res) {
    try {
      const { invitationId } = req.params;
      const { id: userId } = req.user;

      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:4002/invitations/${invitationId}/accept`,
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

  static async removeInvitedParticipant(req, res) {
    try {
      const { invitationId } = req.params;
      const { id: userId } = req.user;

      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:4002/invitations/${invitationId}/reject`,
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
}

module.exports = InvitationController;
