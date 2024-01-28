const { ObjectId } = require("mongodb");
const Order = require("../models/order");
// const { auth, isUser, isAdmin } = require("../middleware/auth");

const router = require("express").Router();

// CREATE
router.post("/", async (req, res) => {
  const orderData = req.body;
  const newOrder = new Order(orderData);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).send(savedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

// // UPDATE
// router.put("/:id", isAdmin, async (req, res) => {
//   const orderId = req.params.id;
//   const updatedData = req.body;

//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { $set: updatedData },
//       { new: true }
//     );
//     res.status(200).send(updatedOrder);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // DELETE
// router.delete("/:id", isAdmin, async (req, res) => {
//   const orderId = req.params.id;

//   try {
//     await Order.findByIdAndDelete(orderId);
//     res.status(200).send("Order has been deleted...");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // GET USER ORDERS
// router.get("/find/:userId", isUser, async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const orders = await Order.find({ userId: userId });
//     res.status(200).send(orders);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // GET ALL ORDERS
// router.get("/", isAdmin, async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).send(orders);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // GET MONTHLY INCOME
// router.get("/income", isAdmin, async (req, res) => {
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       { $match: { createdAt: { $gte: previousMonth } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).send(income);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = router;