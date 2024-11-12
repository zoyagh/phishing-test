# Full Stack Phishing Simulation Application

## Overview
This is a fully-featured phishing simulation and management application that employs **NestJS** as the backend framework, **React** for the frontend interface, and **MongoDB** as the database. The entire application is containerized with Docker, enabling streamlined setup and deployment.

## Tech Stack
- **Backend**: [NestJS](https://nestjs.com/) - Provides API endpoints and manages phishing simulation and attempts.
- **Frontend**: [React](https://reactjs.org/) - Offers an intuitive user interface for managing phishing simulation data.
- **Database**: [MongoDB](https://www.mongodb.com/) - Stores user and phishing attempt information with persistence.
- **Containerization**: [Docker](https://www.docker.com/) - Ensures consistent environment configuration across development and production.

## Project Structure
```plaintext
project-root/
├── backend/              # NestJS backend application
├── frontend/             # React frontend application
├── docker-compose.yml    # Docker Compose file for multi-container setup
└── db_data/              # MongoDB data volume for persistent storage
```
## How to Run

 Clone the repository and navigate to the project folder:
   ```bash
git clone <repository_url>
cd phishing
```

Run the application using Docker Compose:
```bash
docker compose up -d
   ```

### Access the Application
Frontend API: <http://localhost:3000>
Backend API: <http://localhost:3001>
MongoDB: localhost:27017

### Stopping the Application

To stop and remove containers
```bash
docker-compose down
   ```

