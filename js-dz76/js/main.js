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

const createTodoElement = (todo) => {
  const todoElement = document.createElement("li");
  todoElement.classList.add("todo");

  todoElement.dataset.id = todo[todoKeys.id];

  const todoTextElement = document.createElement("div");
  todoTextElement.classList.add("todo-text");
  todoTextElement.textContent = todo[todoKeys.text];

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

  const newTodoElement = createTodoElement(newTodo);

  todosList.append(newTodoElement);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    return;
  }

  handleCreateTodo(todos, text);

  input.value = "";
});

todosList.addEventListener("click", (event) => {
  const target = event.target;

  const todoElement = target.closest(".todo");

  if (!todoElement) {
    return;
  }

  const todoId = Number(todoElement.dataset.id);

  if (target.matches(".button-complete")) {
    completeTodoById(todos, todoId);
    todoElement.classList.toggle("completed");
  }

  if (target.matches(".button-delete")) {
    deleteTodoById(todos, todoId);
    todoElement.remove();
  }
});
