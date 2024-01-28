# Kurzarbeiter

[![Build and Test](https://github.com/wzsaz/Kurzarbeiter/actions/workflows/pipeline-build-test.yml/badge.svg)](https://github.com/wzsaz/Kurzarbeiter/actions/workflows/pipeline-build-test.yml)
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

### Angular CLI Server

- `Angular CLI Server`: A configuration to run the Angular CLI server directly from IntelliJ, facilitating an easier development workflow.

To set up these configurations, you may need to import them into IntelliJ IDEA or manually configure them by following the provided structure.

### Running the Application

Once the services are up, you can access:

- The frontend application at `http://localhost:4200`
- The backend API at `http://localhost:8089`

Ensure Docker and Docker Compose are installed on your system to use these configurations for deployment.

## Usage

This project offers flexible options for starting the application, catering to both development and production environments. Below are detailed instructions for each scenario.

The project includes a `docker-compose.yaml` file that orchestrates the setup of three main services:

- **PostgreSQL Database (`db`)**: Configured with volume persistence for data storage.
- **Backend Service (`backend`)**: A Spring Boot application serving the RESTful API.
- **Frontend Service (`frontend`)**: An Angular application built and served using Nginx.


### For Development

#### Running with Docker Compose (Backend + DB + Frontend for Development)

1. To start the backend and database services without building the frontend for production, run the following command in your terminal:

   ```bash
   docker-compose up -d db backend
   ```

2. For frontend development, you can run the Angular CLI development server to benefit from live reloading and faster build times. Either use the IntelliJ configuration named "Angular CLI Server" or run the following command in your terminal:

   ```bash
   ng serve
   ```

   This will start the development server on `http://localhost:4200/`, and your application will automatically reload if you change any of the source files.

#### Using IntelliJ Configurations for Development

- **Backend + DB**: Use the "Backend + DB" Docker deployment configuration within IntelliJ to start the backend and database services.
- **Angular Application Debugging**: Use the "Angular Application Debugging" configuration to run and debug the frontend application via IntelliJ.

### For Production

#### Running with Docker Compose (All Services)

1. To build and run the entire stack, including the frontend built for production, use the following command:

   ```bash
   docker-compose up -d
   ```

   Before running this command for updates, ensure to rebuild the Docker image if there have been changes to the frontend code. You can do this by running:

   ```bash
   docker-compose build frontend
   docker-compose up -d
   ```

2. To ensure that any updates to your frontend are reflected in the Docker container, you must rebuild the frontend image and restart the services. This ensures your production build includes the latest changes.

#### Using IntelliJ Configurations for Production

- For production, you can also utilize the "All" Docker deployment configuration within IntelliJ, which includes all services. Remember to rebuild the Docker image for the frontend service if there have been changes, as IntelliJ does not automatically do this for you.
- **Note**: The frontend is built and served using a multi-stage Dockerfile where the first stage builds the Angular application using Node.js and the second stage serves the built application using Nginx. The Nginx server is configured for performance optimizations and security enhancements, as detailed in the provided `nginx.conf`.

## Screenshots and Demos

Here's a quick look at our application in action:

![Dashboard Screenshot](link-to-screenshot.png)

## Contributing

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
