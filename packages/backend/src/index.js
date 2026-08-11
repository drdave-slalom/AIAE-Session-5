const app = require('./app');

const PORT = process.env.PORT || 3001;

// INTENTIONAL ISSUE: Missing error handling for server startup
app.listen(PORT, () => {
  // eslint-disable-next-line no-console -- Server startup logging is acceptable
  console.log(`Server running on port ${PORT}`);
});
