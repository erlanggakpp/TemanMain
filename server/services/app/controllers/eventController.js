const { Event, Category, Magnet } = require("../models");

class EventController {
  static async getAllEvents(req, res, next) {
    try {
      const events = await Event.findAll({
        include: {
          model: Category,
        },
      });
      //   console.log(events);
      return res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async findOneEvent(req, res, next) {
    try {
      const { eventId } = req.params;
      const targetEvent = await Event.findOne({
        where: {
          id: eventId,
        },
        include: [
          {
            model: Category,
          },
          {
            model: Magnet,
          },
        ],
      });
      res.status(200).json(targetEvent);
    } catch (error) {
      next(error);
    }
  }
  static async createEvent(req, res, next) {
    try {
      const {
        CategoryId,
        name,
        location,
        description,
        eventDate,
        eventHomepageLink,
        eventDuration,
        image,
        ticketPrice,
        User,
      } = req.body;
      const createdEvent = await Event.create({
        CategoryId,
        name,
        location,
        description,
        eventDate,
        eventHomepageLink,
        eventDuration,
        image,
        ticketPrice,
        AdminId: User,
      });
      res.status(201).json({ message: "Successfully created new event" });
    } catch (error) {
      next(error);
    }
  }

  static async editEvent(req, res, next) {
    try {
      const { eventId } = req.params;
      const {
        CategoryId,
        name,
        location,
        description,
        eventDate,
        eventHomepageLink,
        eventDuration,
        image,
        ticketPrice,
      } = req.body;
      const editedEvent = await Event.update(
        {
          CategoryId,
          name,
          location,
          description,
          eventDate,
          eventHomepageLink,
          eventDuration,
          image,
          ticketPrice,
        },
        {
          where: {
            id: eventId,
          },
        }
      );
      res.status(200).json({ message: "Successfully edited event" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteEvent(req, res, next) {
    try {
      const { eventId } = req.params;
      const deleteEvent = await Event.destroy({
        where: {
          id: eventId,
        },
      });
      res.status(200).json({ message: "Successfully deleted event" });
    } catch (error) {
      next(error);
    }
  }

  static async findEventsByCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const events = await Event.findAll({
        include: {
          model: Category,
        },
        where: {
          CategoryId: categoryId,
        },
      });
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = EventController;
