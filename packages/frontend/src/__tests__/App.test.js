import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn();

// Helper to render App with React Query
const renderApp = () => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );
};

beforeEach(() => {
  // Default mock: return empty todos array
  global.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([]),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  renderApp();
  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

// RED PHASE: Test for delete functionality
describe('Delete functionality', () => {
  test('should delete a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    
    // Mock fetch to return a todo
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: '1', title: 'Test Todo', completed: false },
      ]),
    });

    renderApp();

    // Wait for todo to appear
    await screen.findByText('Test Todo');

    // Mock the delete request
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    // Mock the refetch after delete (empty list)
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    // Click delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // Verify DELETE request was made
    await waitFor(() => {
      const deleteCalls = global.fetch.mock.calls.filter(
        call => call[1]?.method === 'DELETE'
      );
      expect(deleteCalls).toHaveLength(1);
    });
    
    expect(global.fetch.mock.calls.find(
      call => call[1]?.method === 'DELETE'
    )[0]).toContain('/api/todos/1');
  });
});

// RED PHASE: Test for stats calculation
describe('Stats calculation', () => {
  test('should display correct count of incomplete and completed todos', async () => {
    // Mock fetch with mixed todos
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: '1', title: 'Todo 1', completed: false },
        { id: '2', title: 'Todo 2', completed: true },
        { id: '3', title: 'Todo 3', completed: false },
        { id: '4', title: 'Todo 4', completed: true },
      ]),
    });

    renderApp();

    // Wait for todos to load and check stats
    await waitFor(() => {
      expect(screen.getByText('2 items left')).toBeInTheDocument();
    });
    
    expect(screen.getByText('2 completed')).toBeInTheDocument();
  });

  test('should show 0 counts when there are no todos', async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByText('0 items left')).toBeInTheDocument();
    });
    
    expect(screen.getByText('0 completed')).toBeInTheDocument();
  });
});

// RED PHASE: Test for empty state message
describe('Empty state', () => {
  test('should display empty state message when there are no todos', async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
    });
  });

  test('should not display empty state message when todos exist', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: '1', title: 'Test Todo', completed: false },
      ]),
    });

    renderApp();

    await screen.findByText('Test Todo');
    expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument();
  });
});

// RED PHASE: Test for error handling
describe('Error handling', () => {
  test('should display error message when fetching todos fails', async () => {
    // Mock fetch to reject
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    renderApp();

    await waitFor(() => {
      expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
    });
  });

  test('should display error message when API returns error status', async () => {
    // Mock fetch to return error status
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Server error' }),
    });

    renderApp();

    await waitFor(() => {
      expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
    });
  });
});
