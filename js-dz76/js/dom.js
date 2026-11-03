import { todoKeys } from "./constants.js";
import { createTodo, completeTodoById, deleteTodoById } from "./service.js";
import { setTodosToLocalStorage } from "./storage.js";

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

export const renderTodos = (todos) => {
  todosList.innerHTML = "";

  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);

    if (todo[todoKeys.is_completed]) {
      todoElement.classList.add("completed");
    }

    todosList.prepend(todoElement);
  });
};

const handleCreateTodo = (todos, text) => {
  const newTodo = createTodo(todos, text);

  const newTodoElement = createTodoElement(newTodo);

  setTodosToLocalStorage(todos);

  todosList.append(newTodoElement);
};

export const initTodoHandlers = (todos) => {
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
      setTodosToLocalStorage(todos);
      todoElement.classList.toggle("completed");
    }

    if (target.matches(".button-delete")) {
      deleteTodoById(todos, todoId);
      setTodosToLocalStorage(todos);
      todoElement.remove();
    }
  });
};
