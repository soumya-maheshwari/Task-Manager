const express = require("express");
const { toDoController } = require("../controllers");
const Todo = require("../models/toDoModel");
const router = express.Router();

router.post("/addTodo", toDoController.addTodo);
router.get("/allTodos", toDoController.getAllTodos);
router.get("/rodo/:id", toDoController.getATodo);
router.patch("/todo/", toDoController.todoCompleted);
router.patch("/todo/:id", toDoController.updateATodo);
router.delete("/todo/:id", toDoController.deleteATodo);
router.get("/todo/", toDoController.searchTodo);

module.exports = router;
