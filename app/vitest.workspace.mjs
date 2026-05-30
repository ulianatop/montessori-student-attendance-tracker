import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // vitest sould go look inside these folders and use their local setups
  './client/react/attendance',
  './server'
]);