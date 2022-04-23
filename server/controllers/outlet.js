const { Outlet, User } = require("../models");

class OutletController {
  static async getOutlet(req, res, next) {
    try {
      const isAdmin = await User.findOne({
        where: { id: req.loggedInUser.id }
      })
      console.log(isAdmin, "jalan")
      const cart = await Outlet.findAll({
        where: isAdmin.role === "admin" ? null : { UserId: req.loggedInUser.id },
        order: [["id", "DESC"]],
      });
      res.status(200).json(cart);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async postOutlet(req, res, next) {
    const data = {
      UserId: req.loggedInUser.id,
      name: req.body.name,
      phone_number: req.body.phone_number,
      address: req.body.address,
      image_url: req.body.image_url,
    };
    console.log(data, "datasssssssssssssssss")
    try {
      const outlet = await Outlet.create(data);
      res.status(201).json(outlet);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = OutletController;
