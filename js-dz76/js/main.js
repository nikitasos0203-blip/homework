"use strict";

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

const todos = [];

const errTodoNotFound = (todoId) => `Todo with id ${todoId} not found`;

const getNewTodoId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};

// При помощи метода querySelector получаем элементы .form, .input и .todos
// Создаем функцию createTodoElement(text), которая будет создавать todo в виде разметки
// Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const todosList = document.querySelector(".todos");

const createTodoElement = (text) => {
  const todoElement = document.createElement("li");
  todoElement.classList.add("todo");
  const todoTextElement = document.createElement("div");
  todoTextElement.classList.add("todo-text");
  todoTextElement.textContent = text;
  todoElement.append(todoTextElement);
  const todoActionsElement = document.createElement("div");
  todoActionsElement.classList.add("todo-actions");

  const completeButton = document.createElement("button");
  completeButton.classList.add("button-complete", "button");
  completeButton.textContent = "✔";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button-delete", "button");
  deleteButton.textContent = "✖";

  todoActionsElement.append(completeButton, deleteButton);
  todoElement.append(todoActionsElement);

  return todoElement;
};

const handleCreateTodo = (todos, text) => {
  const newTodo = createTodo(todos, text);

  const newTodoElement = createTodoElement(newTodo[todoKeys.text]);

  todosList.append(newTodoElement);
};
