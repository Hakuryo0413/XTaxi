const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["urgent", "info", "warning"],
      required: true,
    },
    noti_content: {
      type: Object, // Chứa nội dung chi tiết của thông báo
      required: true,
    },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread", // Mặc định là chưa đọc
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
