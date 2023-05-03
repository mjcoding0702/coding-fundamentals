const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.document = dom.window.document;
const { addTodo } = require('./script');



// Unit tests for the addTodo function
describe('addTodo function', () => {
  // create a mock local storage object
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: key => store[key],
      setItem: (key, value) => store[key] = value.toString(),
      clear: () => store = {}
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  // reset local storage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  test('should add a new todo item to local storage', () => {
    const newTodoItem = {
      id: 1,
      item: 'Test todo item'
    };

    addTodo(newTodoItem);
    expect(localStorage.getItem('todoItems')).toBe(JSON.stringify([newTodoItem]));
  });

  test('should add multiple todo items to local storage', () => {
    const todoItem1 = {
      id: 1,
      item: 'Test todo item 1'
    };
    const todoItem2 = {
      id: 2,
      item: 'Test todo item 2'
    };

    addTodo(todoItem1);
    addTodo(todoItem2);
    expect(localStorage.getItem('todoItems')).toBe(JSON.stringify([todoItem1, todoItem2]));
  });
});

