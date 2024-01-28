# Kurzarbeiter

[![Build and Test](https://github.com/wzsaz/Kurzarbeiter/actions/workflows/pipeline-build-test.yml/badge.svg)](https://github.com/wzsaz/Kurzarbeiter/actions/workflows/pipeline-build-test.yml)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## About The Project

Kurzarbeiter emerges as a pivotal solution designed to enrich the backoffice operations of organizations by providing a sophisticated, Angular-based frontend to the Employee Management Service (EMS). This initiative is aimed at encapsulating a wide array of functionalities into a single, cohesive web application that anticipates future expansion into mobile platforms.

### Core Objectives:

- **Unified Interface**: Develop a central hub for accessing and managing employee data and project assignments, leveraging the EMS's comprehensive API endpoints (https://employee.szut.dev/swagger).
- **Advanced Data Management**: Implement advanced filtering capabilities to streamline the visualization and handling of employee information and qualifications, enhancing decision-making processes.
- **Seamless Authentication**: Integrate with Keycloak's Single Sign-On (SSO) service to provide secure, seamless access across multiple backoffice applications, bolstering the infrastructure's security and usability.
- **Design and Usability**: Tasked with designing the frontend from the ground up, the project underscores the importance of a user-centric approach, focusing on intuitive navigation and responsiveness to accommodate diverse operational needs.

This Project is constructed with the latest Angular technologies, ensuring a robust, maintainable, and scalable solution. It represents a forward-thinking approach to addressing the dynamic requirements of modern backoffice operations, setting a foundation for future enhancements and cross-platform accessibility.

## Built With

- [Angular](https://angular.dev/)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)
- [Keycloak](https://www.keycloak.org/)

## Prerequisites

To ensure a smooth setup, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download) (v20.11.0 or higher)
- [Angular CLI](https://angular.io/cli) (v17.1.1 or higher)
- [Docker](https://docs.docker.com/get-docker/) (latest version recommended for compatibility)
- [Docker Compose](https://docs.docker.com/compose/install/) (latest version recommended for compatibility)
- [IntelliJ IDEA](https://www.jetbrains.com/de-de/idea/download/?section=windows) (2023.3 or newer)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/wzsaz/kurzarbeiter.git
   ```

2. **Navigate into the project directory (`cd kurzarbeiter`)** and install NPM packages:

    ```bash
   npm install
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

1. To start the backend and database services without building the frontend for production **navigate into the docker folder (`cd docker`)** and run the following command in your terminal:

   ```bash
   docker-compose up -d db backend
   ```

2. For frontend development, you can run the Angular CLI development server to benefit from live reloading and faster build times. Either use the IntelliJ configuration named "Angular CLI Server" or run the following command in your terminal, after **navigating back into the root folder (`cd ..`)**:

   ```bash
   npm start
   ```

   This will start the development server on `http://localhost:4200/`, and your application will automatically reload if you change any of the source files.

#### Using IntelliJ Configurations for Development

- **Backend + DB**: Use the "Backend + DB" Docker deployment configuration within IntelliJ to start the backend and database services.
- **Angular Application Debugging**: Use the "Angular Application Debugging" configuration to run and debug the frontend application via IntelliJ.

### For Production

#### Running with Docker Compose (All Services)

To build and run the entire stack, including the frontend built for production, **navigate into the docker folder (`cd docker`)** and use the following command:

```bash
docker-compose up -d
```

If there have been updates to the frontend, ensure to rebuild its Docker image to incorporate these changes. To do so, run the following command and then **restart the services (`docker-compose up -d`)**:

```bash
docker-compose build frontend
```

This approach rebuilds the frontend image and restarts the services, guaranteeing that the Docker containers utilize the latest application version. You can also use the `--no-deps` flag to rebuild the frontend image without restarting the other services.

#### Using IntelliJ Configurations for Production

- For production, you can also utilize the "All" Docker deployment configuration within IntelliJ, which includes all services. Remember to rebuild the Docker image for the frontend service if there have been changes, as IntelliJ does not automatically do this for you.
- **Note**: The frontend is built and served using a multi-stage Dockerfile where the first stage builds the Angular application using Node.js and the second stage serves the built application using Nginx. The Nginx server is configured for performance optimizations and security enhancements, as detailed in the provided `nginx.conf`.

## Screenshots and Demos

Here's a quick look at our application in action:

![Dashboard Screenshot](/.github/assets/keycloak.png)
![Dashboard Screenshot](/.github/assets/employees.png)
![Dashboard Screenshot](/.github/assets/editor.png)
![Dashboard Screenshot](/.github/assets/filter.png)

## Contributing

We welcome contributions of all kinds, from bug fixes to feature additions. Here's how you can contribute:

- **Reporting Issues**: Use the GitHub Issues tab to report bugs or suggest enhancements - [GitHub Issues](https://github.com/wzsaz/kurzarbeiter/issues).
- **Pull Requests**: Submit PRs for bug fixes or feature additions. Please adhere to our coding standards and commit message conventions.

For more detailed instructions, please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) document.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/wzsaz/kurzarbeiter/blob/main/LICENSE) file for details.

## Acknowledgments

- [Angular CLI](https://github.com/angular/angular-cli)
- [Angular Material](https://material.angular.io/)
- [Keycloak](https://www.keycloak.org/)
