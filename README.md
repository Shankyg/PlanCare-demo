# Car Registration System - Technical Assessment

A full-stack application demonstrating modern .NET architecture, real-time communication, and responsive frontend design.
This project implements a car registration monitoring system that fulfills three core requirements:

1. **REST API:** Retrieve and filter car inventory data.
2. **Live Dashboard:** Real-time updates of registration expiry status.
3. **Background Processing:** Automated background service monitoring vehicle status.

### Built With

* **Backend:** ASP.NET Core 9 (Web API)
* **Frontend:** React 18 + TypeScript + Vite
* **Real-time:** SignalR
* **Styling:** Tailwind CSS (v4)
* **Testing:** xUnit + Moq

### Layer Structure

1. **Core (Domain Layer)**
    * Contains the pure business entities (e.g., `Car`) and interfaces (e.g., `ICarRepository`).
    * *Dependencies:* None. This is the heart of the application.

2. **Infrastructure (Data Access)**
    * Implements the interfaces defined in Core.
    * Contains the `MockCarRepository` which simulates database operations.
    * *Dependencies:* Core.

3. **API (Presentation Layer)**
    * **Controllers:** Handle HTTP requests and input validation.
    * **Hubs:** Manage SignalR WebSocket connections.
    * **Background Services:** Hosted services that run periodic tasks (polling logic).
    * *Dependencies:* Core, Infrastructure.

4. **Client (Frontend)**
    * A standalone Single Page Application (SPA) built with React.
    * Communicates with the API via HTTP and WebSockets.

### Installation & Setup

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd CarRegistrationAssessment
    ```

2. **Start the Backend API**

    ```bash
    cd src/CarRegistration.API
    dotnet run
    ```

    * The API will start (usually on `http://localhost:5xxx`).
    * Note the port number displayed in the terminal.

3. **Start the Frontend Client**
    Open a new terminal window:

    ```bash
    cd src/CarRegistration.Client
    npm install
    npm run dev
    ```

    * The React app will start at `http://localhost:5173`.
Currently the Addresses are hardcoded in backend for this small demo app. ideally I would configure them as environment variable in docker.

Unit tests are implemented using **xUnit** and **Moq** to verify business logic and API controller behavior.

```bash
# From the root directory
dotnet test
```
