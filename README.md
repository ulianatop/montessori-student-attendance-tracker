Running the project
1. Start the Apache and SQL servers in XAMMP
2. install dependencies (enter "npm install" in /app, /app/server, /app/client/react/attendance directories)
4. in /app enter `npm run dev`
5. navigate to the vite server http://localhost:5173

OR

run start.bat to automatically launch the app and page.

Running Tests

This project uses a Vitest Workspace to separate frontend and backend tests. Run these commands from the root app/ folder:

1. Run sample test `npx vitest App.test.jsx`
2. Run all tests: `npm test`

Note: Backend tests require a local `montessori_attendance_test` database schema.
