# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Building the Application

To clean previous builds and create a new one:

```
npm run build
```

## Running the Application

To run the application in different environments:

- **Development Mode**:

  ```
  npm run start:dev
  ```

- **Debug Mode**:

  ```
  npm run start:debug
  ```

- **Production Mode**:
  ```
  npm run start:prod
  ```

After starting the app (port 4000 by default), you can access the OpenAPI documentation in your browser at [http://localhost:4000/doc/](http://localhost:4000/doc/). For more information about OpenAPI/Swagger, please visit [Swagger's official website](https://swagger.io/).

## Testing

To run tests for the application, open a new terminal and enter one of the following commands:

- **Run All Tests Without Authorization**:

  ```
  npm run test
  ```

- **Run Only a Specific Test Suite**:

  ```
  npm run test -- <path to suite>
  ```

- **Run All Tests With Authorization**:

  ```
  npm run test:auth
  ```

- **Run Only a Specific Test Suite With Authorization**:

  ```
  npm run test:auth -- <path to suite>
  ```

- **Run Tests Continuously**:

  ```
  npm run test:watch
  ```

- **Run Tests With Coverage Report**:

  ```
  npm run test:cov
  ```

- **Debug Tests**:
  ```
  npm run test:debug
  ```

## Database Migrations

Use TypeORM CLI commands to handle database migrations:

- **Create a New Migration**:

  ```
  npm run migration:create -- <migration-name>
  ```

- **Run Migrations**:

  ```
  npm run migration:run
  ```

- **Revert the Last Migration**:
  ```
  npm run migration:revert
  ```

## Linting and Formatting

- **Lint and Fix Code**:

  ```
  npm run lint
  ```

- **Auto-Fix and Format Code**:
  ```
  npm run format
  ```

## Security Vulnerability Scan

To check for any security vulnerabilities in the dependencies, run:

```
npm run scan:vuln
```

## Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
