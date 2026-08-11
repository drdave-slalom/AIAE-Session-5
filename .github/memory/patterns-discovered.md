# Patterns Discovered

Use this file to capture implementation and workflow patterns that are likely to be reused.

Add new entries over time rather than replacing older ones unless the older guidance is wrong.

## Pattern Template

### Pattern Name

- Name:

### Context

- 

### Problem

- 

### Solution

- 

### Example

```text
Add a small code or workflow example here.
```

### Related Files

- 

## Example Pattern

### Pattern Name

- Name: Service initialization with empty collections

### Context

- In-memory services that manage lists of entities such as todos

### Problem

- Initializing a collection as `null` forces defensive checks throughout the code and increases the chance of runtime failures when routes assume an array interface

### Solution

- Initialize collection state as an empty array and keep downstream logic array-based from the start

### Example

```javascript
const todos = [];
```

This keeps reads, writes, filtering, and length checks consistent without special startup branches.

### Related Files

- packages/backend/src/app.js
- packages/backend/__tests__/app.test.js