// Задача 1.
// Создайте переменные с корректными именами, чтобы сохранить следующую информацию:
// 1. firstName – имя (строка)
// 2. lastName – фамилия (строка)
// 3. isStudent – является ли учеником курса (булево значение)

const firstName = "Nikita";
const lastName = "Krasavin";
const isStudent = true;

console.log(firstName, lastName, isStudent);

// Задача 2.
// 1. Объявите переменную age с числовым значением возраста студента.
// 2. Объявите переменную currentYear и присвойте ей значение текущего года (например, 2025).
// 3. Используя age и currentYear вычислите год рождения студента, запишите результат в переменную birthYear.

const age = 20;
console.log(age);

const currentYear = 2026;
console.log(currentYear);

console.log(currentYear - age);

// Задача 3.
// Выведите в консоли сообщение в таком формате:
// Меня зовут [firstName] [lastName], мне [age] лет. Я ученик/ученица курса: [isStudent].

const str = `Меня зовут ${firstName} ${lastName}, мне ${age} лет. Я ученик курса: ${isStudent}`;
console.log(str);

// Задача 4.
// Какое значение будет у переменной result?
// let a = '123';
// let b = +'456';
// let c = Number('789');
// let d = Boolean(0);
// let e = Boolean(' ');
// let result = a + b + c + d + e;

let result = "123" + "456" + Number("789") + Boolean(0) + Boolean(" ");
console.log(result);
