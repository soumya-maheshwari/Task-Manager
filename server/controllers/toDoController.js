const errorHandler = require("../middleware/errorHandler");
const { ErrorHandler } = require("../middleware/errorHandler");
const Todo = require("../models/toDoModel");

const addTodo = async (req, res, next) => {
  try {
    let { todoData } = req.body;
    console.log(todoData);

    if (!todoData) {
      next(new ErrorHandler(400, "Enter something to create a todo"));
    }
    const newTodo = await Todo.create({
      todoData,
    });

    return res.status(200).json({
      todoData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });

    console.log(todos);

    return res.status(200).json({
      todos,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getATodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the TODO item by ID
    const todo = await Todo.findById(id);

    if (!todo) {
      next(new ErrorHandler(400, "to do not found"));
    }
    return res.status(200).json({
      todo,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const todoCompleted = async (req, res, next) => {
  try {
    let { todoID } = req.body;

    if (!todoID) {
      next(new ErrorHandler(400, "to do with this id does not exists"));
    }
    console.log(todoID);
    const todoDB = await Todo.findById(todoID);
    if (!todoDB) {
      next(new ErrorHandler(404, "To-do not found."));
    }

    console.log(todoDB);

    todoDB.completed = !todoDB.completed;
    await todoDB.save();
    console.log(todoDB);
    res.status(200).json({
      todoDB,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateATodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { todoData, completed } = req.body;
    // Find the TODO item by ID
    const todo = await Todo.findById(id);

    if (!todo) {
      next(new ErrorHandler(400, "To do not found"));
    }
    if (todoData) {
      todo.todoData = todoData;
    }
    if (completed !== undefined) {
      todo.completed = completed;
    }
    const updatedTodo = await todo.save();
    console.log(updatedTodo);

    return res.status(200).json({
      updatedTodo,
      success: true,
      msg: "to do updated",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteATodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      next(new ErrorHandler(400, "To do not found"));
    }
    await todo.deleteOne();

    res.status(200).json({
      success: true,
      msg: "TODO deleted.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const searchTodo = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      next(new errorHandler(400, "Search query is missing"));
    }
    const searchResults = await Todo.find({
      $or: [
        { todoData: { $regex: new RegExp(q, "i") } },
        // You can add more fields to search by, such as 'title', 'description', etc.
      ],
    });

    return res.status(200).json({
      searchResults,
      msg: "search successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = {
  addTodo,
  getAllTodos,
  todoCompleted,
  getATodo,
  updateATodo,
  deleteATodo,
  searchTodo,
};
