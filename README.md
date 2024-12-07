<div align="center">
  <a href="https://iznogohul.github.io/ParchmentTMS/">
    <picture>
      <img src="https://raw.githubusercontent.com/Iznogohul/ParchmentTMS/refs/heads/main/public/parchmenttms-logo.webp" alt="ParchmentTMS Logo" width="128">
    </picture>
  </a>
  <h1>Parchment TMS</h1>
  <h3>A Headless Ticket Management System</h3>
  <p style="max-width: 600px; margin: 20px auto; line-height: 1.5;">
    <strong>This is a toy project</strong> for a headless TMS built with 
    <strong>NestJS</strong> and <strong>MongoDB</strong>, enabling teams to 
    <em>create</em>, <em>manage</em>, and <em>close</em> tickets, 
    track their status and prioritize tasks.
  </p>
  <p align="center">
   <img src="https://raw.githubusercontent.com/Iznogohul/ParchmentTMS/refs/heads/main/docs/images/coverage-badge-documentation.svg" alt="Documentation Coverage Badge">
  </p>
</div>

## 🚀 Getting Started

To get started with this project, you can choose to either run the project natively on your machine, or with Docker.

### 🏠 Running natively

To run the project natively, you will need to have Node.js v22.12.0 or higher and npm v10.9.0 or higher installed on your machine.

1. 🍴 Clone this repository to your local machine.
2. 💻 Run `npm install` to install the necessary dependencies.
3. 🚀 Start a MongoDB instance on your machine by following the instructions provided by MongoDB for your specific operating system. You can download the MongoDB Community Server from [here](https://www.mongodb.com/try/download/community).
4. 📝 Rename .env.example to .env and replace the values with your own MongoDB connection details and desired api port.
5. 🚀 Run `npm start` to start the server.

### 🐳 Running with Docker

To run the project with Docker, you will need to have Docker installed on your machine.

1. 🍴 Clone this repository to your local machine.
2. 📝 Copy the .env.example file and rename it to .env. Open the .env file and specify the desired values for MONGODB_URI and PORT variables.
   For example:
   ```
   # The MongoDB connection string for the TMS database
   MONGODB_URI="mongodb://mongodb/test"
   # The port on which the TMS API will run
   PORT="3000"
   # The seed string to be used for the JwtStrategy
   JWT_SECRET="42"
   ```
3. 🐳 Run `docker compose build` to build the containers.
4. 🐳 Run `docker compose up` to start the containers.
5. 🌍 The API will be available at `http://localhost:3000/`.

## 📖 Usage

Once the server is running, you can use the following endpoints to manage your projects/tickets:

### Authenticate

- `POST /api/v1/register`: Gives the ability to register
- `POST /api/v1/login`: Returns a jwt token for authentication

### Projects

- `GET /api/v1/projects`: Returns a list of all projects
- `POST /api/v1/projects`: Create a new project
- `GET /api/v1/projects/:id`: Returns a specific project by project ID.
- `PATCH /api/v1/projects/:id`: Update a project by ID
- `DELETE /api/v1/projects/:id`: Delete a project by ID

### Tickets

- `GET /api/v1/tickets`: Returns a list of all tickets
- `POST /api/v1/tickets`: Create a new ticket
- `GET /api/v1/tickets/:id`: Returns a specific ticket by ticket ID.
- `PATCH /api/v1/tickets/:id`: Update an existing ticket by ID
- `DELETE /api/v1/tickets:id`: Delete a ticket by ID

### Health
- `GET /heath`: Returns useful system information, such as server uptime and memory usage. This endpoint can be used to monitor the health of the application.

## 🚀 Future Improvements

Here are some potential improvements that could be made to this project:

- [ ] Write Jest tests
- [ ] Add a process manager
- [ ] Add API rate limiting to prevent abuse
- [ ] Introduce automated ticket workflows or rules
- [ ] Create a frontend interface for ticket management.
- [ ] Add support for more auth providers (Auth0, OAuth2, etc)
- [ ] Implement backup and restore mechanism for data recovery
- [ ] Implement real-time ticket updates using WebSockets or SSE
- [ ] Add search and filter functionality for tickets and projects
- [ ] Enable file attachments for tickets (e.g., screenshots, logs)
- [ ] Improve documentation with detailed user guides and API examples
- [ ] Implement audit logs to track changes made to tickets and projects
- [ ] Optimize system performance (database queries, caching, file uploads)
- [ ] Support multiple languages for localization/internationalization (i18n)
- [ ] Add Github Actions to publish image to Docker Hub, Github Registry, etc.
- [ ] Allow customization of ticket fields (priority, labels, custom statuses)
- [ ] Support multiple deployment environments (e.g., dev, staging, production)
- [ ] Enable user profile changes and preferences (e.g., email notifications, themes)
- [ ] Create a reporting feature for ticket data (e.g., total tickets, resolution time)
- [ ] Add User Roles and Permissions for different access levels (admin, manager, developer)

## 🤝 Contributing

Contributions to this project are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## 📝 License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE][LICENSE] file for details.

[LICENSE]: LICENSE
