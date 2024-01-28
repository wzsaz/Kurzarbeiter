# Kurzarbeiter

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## About The Project

Kurzarbeiter is an Angular-based web application designed to streamline [short description of what your project does]. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3, leveraging the latest web technologies to deliver a high-quality user experience.

## Built With

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)
- [Keycloak](https://www.keycloak.org/)

## Prerequisites

To ensure a smooth setup, make sure you have the following installed:

- Node.js (v14.0 or higher)
- Angular CLI (v17.0.3 or higher)
- Docker and Docker Compose (latest version recommended for compatibility)
- IntelliJ IDEA (2021.2 or newer)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your_username_/kurzarbeiter.git
   ```

2. Navigate into the project directory and install NPM packages:

   ```sh
   cd kurzarbeiter && npm install
   ```

## IntelliJ IDEA Run Configurations

To simplify the development and testing process, predefined run configurations for IntelliJ IDEA are included. Here's how to use them:

### Docker Deployment

- `All`: Deploys the entire stack using Docker Compose.
- `Backend + DB`: Specifically targets the backend and database services.
- `Frontend`: Deploys only the frontend service.

To use these configurations, navigate to `Run` -> `Edit Configurations` in IntelliJ, then select the Docker deployment configuration you wish to use.

### Angular Application Debugging

- Debug configuration for the Angular application is set up to launch the app and attach the debugger to `http://localhost:4200`.

### Angular CLI Server

- A configuration to run the Angular CLI server directly from IntelliJ, facilitating an easier development workflow.

To set up these configurations, you may need to import them into IntelliJ IDEA or manually configure them by following the provided structure.

## Deployment with Docker

This project is configured for easy deployment using Docker and Docker Compose. Below are the steps and explanations for the deployment process.

### Docker Compose

The project includes a `docker-compose.yaml` file that orchestrates the setup of three main services:

- **PostgreSQL Database (`db`)**: Configured with volume persistence for data storage.
- **Backend Service (`backend`)**: A Spring Boot application serving the RESTful API.
- **Frontend Service (`frontend`)**: An Angular application built and served using Nginx.

To deploy these services, run:

```bash
docker-compose up -d
```

This command will start all services in detached mode.

### Building the Frontend

The frontend is built and served using a multi-stage Dockerfile:

1. The first stage builds the Angular application using Node.js.
2. The second stage serves the built application using Nginx.

The Nginx server is configured for performance optimizations and security enhancements, as detailed in the provided `nginx.conf`.

### Running the Application

Once the services are up, you can access:

- The frontend application at `http://localhost:4200`
- The backend API at `http://localhost:8089`

Ensure Docker and Docker Compose are installed on your system to use these configurations for deployment.

## Usage

To start the development server:

```sh
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Building

To build the project:

```sh
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Screenshots and Demos

Here's a quick look at our application in action:

![Dashboard Screenshot](link-to-screenshot.png)

We welcome contributions of all kinds, from bug fixes to feature additions. Here's how you can contribute:

- **Reporting Issues**: Use the GitHub Issues tab to report bugs or suggest enhancements - [GitHub Issues](https://github.com/wzsaz/kurzarbeiter/issues).
- **Pull Requests**: Submit PRs for bug fixes or feature additions. Please adhere to our coding standards and commit message conventions.

For more detailed instructions, please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) document.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/your_username_/kurzarbeiter/blob/main/LICENSE) file for details.

## Acknowledgments

- [Angular CLI](https://github.com/angular/angular-cli)
- [Angular Material](https://material.angular.io/)
- [Keycloak](https://www.keycloak.org/)
