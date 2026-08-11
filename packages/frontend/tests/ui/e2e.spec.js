// Critical user journey tests for TODO application
const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('TODO Application - Critical Journeys', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('should create a new todo', async ({ page }) => {
    const todoTitle = 'Buy groceries';
    
    await todoPage.addTodo(todoTitle);
    
    // Verify the todo appears in the list
    await expect(page.getByText(todoTitle)).toBeVisible();
    
    // Verify the todo count increased
    const count = await todoPage.getTodoCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should edit an existing todo', async ({ page }) => {
    const originalTitle = 'Original task';
    const updatedTitle = 'Updated task';
    
    // Create a todo first
    await todoPage.addTodo(originalTitle);
    
    // Edit the todo
    await todoPage.editTodo(originalTitle, updatedTitle);
    
    // Verify the updated title is visible
    await expect(page.getByText(updatedTitle)).toBeVisible();
    
    // Verify the original title is no longer visible
    await expect(page.getByText(originalTitle)).not.toBeVisible();
  });

  test('should toggle todo completion status', async ({ page }) => {
    const todoTitle = 'Task to complete';
    
    // Create a todo
    await todoPage.addTodo(todoTitle);
    
    // Initially should not be completed
    let isCompleted = await todoPage.isTodoCompleted(todoTitle);
    expect(isCompleted).toBe(false);
    
    // Toggle to completed
    await todoPage.toggleTodo(todoTitle);
    
    // Verify it's now completed
    isCompleted = await todoPage.isTodoCompleted(todoTitle);
    expect(isCompleted).toBe(true);
    
    // Toggle back to incomplete
    await todoPage.toggleTodo(todoTitle);
    
    // Verify it's incomplete again
    isCompleted = await todoPage.isTodoCompleted(todoTitle);
    expect(isCompleted).toBe(false);
  });

  test('should delete a todo', async ({ page }) => {
    const todoTitle = 'Task to delete';
    
    // Create a todo
    await todoPage.addTodo(todoTitle);
    
    // Verify it exists
    await expect(page.getByText(todoTitle)).toBeVisible();
    
    const countBefore = await todoPage.getTodoCount();
    
    // Delete the todo
    await todoPage.deleteTodo(todoTitle);
    
    // Verify it's no longer visible
    await expect(page.getByText(todoTitle)).not.toBeVisible();
    
    // Verify the count decreased
    const countAfter = await todoPage.getTodoCount();
    expect(countAfter).toBe(countBefore - 1);
  });

  test('should handle API unavailable gracefully', async ({ page, context }) => {
    // Block API requests to simulate backend being down
    await context.route('**/api/todos**', route => route.abort());
    
    // Navigate to the page - error should appear immediately
    await todoPage.goto();
    
    // Verify error state is shown
    await todoPage.waitForApiError();
    
    // Verify the add form is still visible (UI should remain functional)
    await expect(todoPage.todoInput).toBeVisible();
    await expect(todoPage.addButton).toBeVisible();
  });
});