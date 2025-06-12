import e from "express";
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Contact } from "../models/contectShema.js";


export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const {name, email, message} = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const contact = await Contact.create({
    name,
    email,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    contact,
  });
}
);

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Contact.find();

  if (!messages || messages.length === 0) {
    return next(new ErrorHandler("No messages found", 404));
  }

  res.status(200).json({
    success: true,
    messages,
  });
}
);

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const message = await Contact.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message not found", 404));
  }
  await Contact.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
}
);
