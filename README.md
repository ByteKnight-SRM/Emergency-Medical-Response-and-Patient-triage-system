# Medical Response and Triage System 🚑

This full-stack application is designed to streamline medical response and triage, providing real-time updates, severity prediction, and route optimization for healthcare providers. Built using **Node.js**, **MongoDB**, **React**, and **Flask**, the system integrates **Socket.IO** for real-time communication, **TensorFlow** for severity prediction, and **Google Maps API** for route optimization.

## Table of Contents 📚

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup](#setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview 🌟

The **Medical Response and Triage System** is designed to assist healthcare providers in managing medical emergencies efficiently. The system tracks patients' conditions, predicts the severity of their symptoms, and optimizes routes for medical teams to reach patients faster. 

Key features include:
- Real-time updates on patient conditions via **Socket.IO**.
- **TensorFlow** and **Scikit-learn** integration for predicting the severity of conditions.
- **Google Maps API** for route optimization, helping medical teams navigate to patients quickly.

## Tech Stack 🛠️

- **Frontend**: React, Socket.IO
- **Backend**: Node.js, Express, Flask
- **Database**: MongoDB
- **AI/ML**: TensorFlow, Scikit-learn
- **Real-time Communication**: Socket.IO
- **Route Optimization**: Google Maps API

## Features 🎉

- **Real-Time Updates**: Communicates patient updates in real time using **Socket.IO**.
- **Severity Prediction**: Uses **TensorFlow** and **Scikit-learn** to predict the severity of patient symptoms based on input data.
- **Route Optimization**: **Google Maps API** integration for optimized routing of medical teams to patients' locations.
- **User Interface**: Built with **React** for an intuitive and responsive UI for healthcare providers.
  
## Setup ⚙️

To set up and run the project locally, follow these steps:

### Backend Setup ⚡

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/medical-triage-system.git
   cd medical-triage-system
   ```

2. Navigate to the `backend` folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables for your **MongoDB** connection and any other required credentials. (Refer to `.env.sample` for more details.)

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup 🖥️

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

4. Visit `http://localhost:3000` in your browser to see the app in action. 🌍

---

## API Endpoints 📡

- **POST /api/triage**: Submit patient data for triage and severity prediction.
- **GET /api/patient-status**: Retrieve real-time updates on patient conditions.
- **POST /api/route-optimization**: Optimize the route for medical teams using **Google Maps API**.

---

## Usage 🔧

Once the app is running, healthcare providers can:
- Submit patient data for triage and severity prediction.
- Monitor patient conditions in real time.
- Use optimized routing to reach patients efficiently.

---

## Contributing 🤝

We welcome contributions! Feel free to fork the repository and submit a pull request with any improvements, bug fixes, or new features. Please follow the standard GitHub workflow for contributions.

---

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
