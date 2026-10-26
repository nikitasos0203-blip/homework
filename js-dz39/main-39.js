// Задача 1.
// Создайте объект person с несколькими свойствами, содержащими информацию о вас. Затем выведите значения этих свойств в консоль.

let person = {
  name: "Nikita",
  age: 20,
  height: 185,
  citizenship: "Russian Federation",
};

console.log(person);

// Задача 2.
// Создайте функцию isEmpty, которая проверяет является ли переданный объект пустым. Если объект пуст - верните true, в противном случае false.

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

console.log(isEmpty({}));

// Задача 3.
// Создайте объект task с несколькими свойствами: title, description, isCompleted.
// Напишите функцию cloneAndModify(object, modifications), которая с помощью оператора spread создает копию объекта и применяет изменения из объекта modifications.
// Затем с помощью цикла for in выведите все свойства полученного объекта.

let task = {
  title: "Изучить JavaScript",
  description: "Разобраться с объектами",
  isCompleted: false,
};

function cloneAndModify(object, modifications) {
  return {
    ...object,
    ...modifications,
  };
}

let modifications = {
  isCompleted: true,
};

let updatedTask = cloneAndModify(task, modifications);

console.log(updatedTask);

for (let key in updatedTask) {
  console.log(key, updatedTask[key]);
}

// Задача 4.
// Создайте функцию callAllMethods, которая принимает объект и вызывает все его методы.

// Пример использования:
// const myObject = {
//     method1() {
//         console.log('Метод 1 вызван');
//     },
//     method2() {
//         console.log('Метод 2 вызван');
//     },
//     property: 'Это не метод'
// };
// callAllMethods(myObject);

function callAllMethods(object) {
  for (let key in object) {
    if (typeof object[key] === "function") {
      object[key]();
    }
  }
}

const myObject = {
  method1() {
    console.log("Метод 1 вызван");
  },

  method2() {
    console.log("Метод 2 вызван");
  },

  property: "Это не метод",
};

callAllMethods(myObject);
