const { ObjectId } = require("mongodb");
const db = require("../data/database");

class Order {
  constructor(orderData) {
    this.userId = orderData.userId;
    this.products = orderData.products;
    this.subtotal = orderData.subtotal;
    this.total = orderData.total;
    this.shipping = orderData.shipping;
    this.delivery_status = orderData.delivery_status || "pending";
    this.payment_status = orderData.payment_status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    if (orderData._id) {
      this._id = new ObjectId(orderData._id);
    }
  }

  static async findById(orderId) {
    try {
      const order = await db
        .getDb()
        .collection("orders")
        .findOne({ _id: new ObjectId(orderId) });

      if (!order) {
        const error = new Error("Could not find order with provided id.");
        error.code = 404;
        throw error;
      }

      return new Order(order);
    } catch (error) {
      error.code = 404;
      throw error;
    }
  }

  static async findAll() {
    const orders = await db
      .getDb()
      .collection("orders")
      .find()
      .toArray();

    return orders.map((order) => new Order(order));
  }

  async save() {
    const orderData = {
      userId: this.userId,
      products: this.products,
      subtotal: this.subtotal,
      total: this.total,
      shipping: this.shipping,
      delivery_status: this.delivery_status,
      payment_status: this.payment_status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    if (this._id) {
      return await db
        .getDb()
        .collection("orders")
        .updateOne({ _id: this._id }, { $set: orderData });
    } else {
      const result = await db
        .getDb()
        .collection("orders")
        .insertOne(orderData);
      this._id = result.insertedId;
      return result;
    }
  }

  async remove() {
    if (!this._id) {
      return;
    }

    return await db
      .getDb()
      .collection("orders")
      .deleteOne({ _id: this._id });
  }
}

module.exports = Order;