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
  }

  async addTodo(title) {
    await this.todoInput.fill(title);
    await this.addButton.click();
    // Wait for the todo to appear in the list
    await this.page.getByText(title).waitFor({ state: 'visible' });
  }

  async getTodoItem(title) {
    return this.page.getByText(title).locator('xpath=ancestor::*[@role="listitem" or contains(@class, "todo")]').first();
  }

  async toggleTodo(title) {
    const todoItem = await this.getTodoItem(title);
    const checkbox = todoItem.getByRole('checkbox');
    await checkbox.click();
  }

  async editTodo(oldTitle, newTitle) {
    const todoItem = await this.getTodoItem(oldTitle);
    const editButton = todoItem.getByRole('button', { name: /edit/i });
    await editButton.click();
    
    // Wait for edit input to appear
    const editInput = todoItem.getByRole('textbox');
    await editInput.waitFor({ state: 'visible' });
    await editInput.clear();
    await editInput.fill(newTitle);
    
    // Save the edit (look for save/confirm button or press Enter)
    const saveButton = todoItem.getByRole('button', { name: /save|confirm/i });
    if (await saveButton.isVisible().catch(() => false)) {
      await saveButton.click();
    } else {
      await editInput.press('Enter');
    }
    
    // Wait for the new title to appear
    await this.page.getByText(newTitle).waitFor({ state: 'visible' });
  }

  async deleteTodo(title) {
    const todoItem = await this.getTodoItem(title);
    const deleteButton = todoItem.getByRole('button', { name: /delete/i });
    await deleteButton.click();
    
    // Wait for the todo to be removed
    await this.page.getByText(title).waitFor({ state: 'hidden' });
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

  async getStatsText() {
    // Look for stats/summary area - adjust selector based on actual implementation
    const stats = this.page.getByText(/active|completed|total/i).first();
    return await stats.textContent();
  }

  async hasEmptyState() {
    // Check if empty state message is visible
    const emptyMessage = this.page.getByText(/no todos|empty|nothing to do/i);
    return await emptyMessage.isVisible().catch(() => false);
  }

  async waitForApiError() {
    // Wait for error message indicating API is unavailable
    const errorMessage = this.page.getByText(/error|failed|unavailable|network/i);
    await errorMessage.waitFor({ state: 'visible', timeout: 5000 });
  }
}

module.exports = { TodoPage };
