const { editTaskDescription, updateTaskCompletion, clearCompleted } = require('./taskFunctions');
const { storageMock } = require('./storageMock');

describe('Task Functions', () => {
  // Mock the localStorage object
  beforeEach(() => {
    global.localStorage = storageMock();
  });

  // Group tests for the editTaskDescription function
  describe('editTaskDescription', () => {
    test('should update the task description in localStorage', () => {
      // Set up initial state in localStorage
      localStorage.setItem('tasks', JSON.stringify([{ id: 1, description: 'Task 1', completed: false }]));

      // Call the editTaskDescription function with the new description
      editTaskDescription(1, 'Updated Task 1');

      // Check that the task description was updated in localStorage
      expect(JSON.parse(localStorage.getItem('tasks'))[0].description).toBe('Updated Task 1');
    });
  });

  // Group tests for the updateTaskCompletion function
  describe('updateTaskCompletion', () => {
    test('should update the task completion status in localStorage', () => {
      // Set up initial state in localStorage
      localStorage.setItem('tasks', JSON.stringify([{ id: 1, description: 'Task 1', completed: false }]));

      // Call the updateTaskCompletion function with the task ID and new completion status
      updateTaskCompletion(1, true);

      // Check that the task completion status was updated in localStorage
      expect(JSON.parse(localStorage.getItem('tasks'))[0].completed).toBe(true);
    });
  });

  // Group tests for the clearCompleted function
  describe('clearCompleted', () => {
    test('should remove completed tasks from localStorage', () => {
      // Set up initial state in localStorage
      localStorage.setItem('tasks', JSON.stringify([
        { id: 1, description: 'Task 1', completed: true },
        { id: 2, description: 'Task 2', completed: false },
      ]));

      // Call the clearCompleted function
      clearCompleted();

      // Check that the completed task was removed from localStorage
      expect(JSON.parse(localStorage.getItem('tasks'))).toEqual([{ id: 2, description: 'Task 2', completed: false }]);
    });
  });
});
