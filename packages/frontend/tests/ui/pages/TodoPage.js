// Page Object Model for TODO application
class TodoPage {
  constructor(page) {
    this.page = page;
    
    // Selectors - prefer stable, semantic queries
    this.todoInput = page.getByPlaceholder(/what needs to be done/i);
    this.addButton = page.getByRole('button', { name: /add/i });
    this.todoList = page.getByRole('list');
  }

  async goto() {
    await this.page.goto('/');
    // Wait for the app to load
    await this.page.getByText('TODO App').waitFor({ state: 'visible' });
  }

  async addTodo(title) {
    await this.todoInput.fill(title);
    await this.addButton.click();
    // Wait for the todo to appear in the list
    await this.page.getByText(title).waitFor({ state: 'visible', timeout: 3000 });
  }

  async getTodoItem(title) {
    // Find the list item containing the todo text
    // Material-UI renders each todo in a listitem element
    const listItems = await this.todoList.getByRole('listitem').all();
    for (const item of listItems) {
      const text = await item.textContent();
      if (text.includes(title)) {
        return item;
      }
    }
    throw new Error(`Todo item with title "${title}" not found`);
  }

  async toggleTodo(title) {
    const todoItem = await this.getTodoItem(title);
    const checkbox = todoItem.getByRole('checkbox');
    await checkbox.click();
    // Wait a bit for the state to update
    await this.page.waitForTimeout(200);
  }

  async editTodo(oldTitle, newTitle) {
    const todoItem = await this.getTodoItem(oldTitle);
    
    // Click the edit button (has aria-label="edit todo")
    const editButton = todoItem.getByLabel('edit todo');
    await editButton.click();
    
    // Wait for edit input to appear
    const editInput = todoItem.getByRole('textbox');
    await editInput.waitFor({ state: 'visible' });
    
    // Clear and fill new title
    await editInput.clear();
    await editInput.fill(newTitle);
    
    // Click the Save button
    const saveButton = todoItem.getByRole('button', { name: /save/i });
    await saveButton.click();
    
    // Wait for the new title to appear and edit mode to close
    await this.page.getByText(newTitle).waitFor({ state: 'visible' });
    await saveButton.waitFor({ state: 'hidden' });
  }

  async deleteTodo(title) {
    const todoItem = await this.getTodoItem(title);
    
    // Click the delete button (has aria-label="delete todo")
    const deleteButton = todoItem.getByLabel('delete todo');
    await deleteButton.click();
    
    // Wait for the todo to be removed
    await this.page.getByText(title).waitFor({ state: 'hidden', timeout: 3000 });
  }

  async getTodoCount() {
    const items = await this.todoList.getByRole('listitem').all();
    return items.length;
  }

  async isTodoCompleted(title) {
    const todoItem = await this.getTodoItem(title);
    const checkbox = todoItem.getByRole('checkbox');
    return await checkbox.isChecked();
  }

  async getIncompleteCount() {
    // Get the "X items left" chip text
    const itemsLeftChip = this.page.getByText(/\d+ items left/);
    const text = await itemsLeftChip.textContent();
    const match = text.match(/(\d+) items left/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getCompletedCount() {
    // Get the "X completed" chip text
    const completedChip = this.page.getByText(/\d+ completed/);
    const text = await completedChip.textContent();
    const match = text.match(/(\d+) completed/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async hasEmptyState() {
    // Check if empty state message is visible
    const emptyMessage = this.page.getByText(/no todos yet/i);
    return await emptyMessage.isVisible().catch(() => false);
  }

  async waitForApiError() {
    // Wait for error message indicating API is unavailable
    // Actual error message: "Error loading todos. Please check your connection and try again."
    const errorMessage = this.page.getByText(/error loading todos/i);
    await errorMessage.waitFor({ state: 'visible', timeout: 5000 });
  }
}

module.exports = { TodoPage };
