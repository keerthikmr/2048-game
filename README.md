# **2048 Game**

A web-based implementation of the classic **2048 game** built with **React** for the frontend and **FastAPI** for the backend.

---

## **Installation**

### **Prerequisites**

1. Ensure you have the following installed:  
   * **Node.js** (Developed on v24.10.0)  
   * **Python** (v3.13.1)  
   * **Docker** (optional)
2. Clone the repository:  
`git clone https://github.comkeerthikmr/2048-game.git`  
`cd 2048-game`

---

### **Frontend Setup**

1. Navigate to the `frontend` directory:  
`cd frontend`
2. Install dependencies:  
`npm install`
3. Start the development server:  
`npm run dev`
4. Open your browser and navigate to:  
`http://localhost:5173`

---

### **Backend Setup**

1. Navigate to the `backend` directory:  
`cd backend`
2. Create a virtual environment (optional):  
`python \-m venv venv`
`.\.venv\Scripts\activate`
3. Install dependencies:  
`pip install -r requirements.txt`
4. Start the FastAPI server:  
`uvicorn app.main:app \--host 0.0.0.0 \--port 8000`
5. The backend will be available at:  
`http://localhost:8000`

---

### **Docker Setup (Optional)**

1. Build the Docker images:  
`docker-compose build`
2. Start the containers:  
`docker-compose up`
3. Access the game:  
   * Frontend: `http://localhost`  
   * Backend: `http://localhost:8000`

---

## **Running the Game**

1. Start both the **frontend** and **backend** servers as described above.
2. Open the frontend in browser (`http://localhost:5173`).
3. Play the game!

---

## **Gameplay Instructions**

### **Objective**

Combine tiles with the same number to reach the **2048 tile**.

### **Controls**

* **Keyboard**:  
   * Use the **Arrow Keys** or **WASD** to move tiles.
* **Touchscreen**:  
   * Swipe in any direction to move tiles.
* **D-Pad**:  
   * Use the on-screen D-Pad for movement.

### **Options**
Click on the options button at the top right of the window.
* **Restart**: Restart the game with the current board size.
* **Change Board Configuration**: Input the board size (2 to 10) and click "Change board configuration" *will restart the game*.

---

## **Implementation Details**

### **Frontend**

* **Framework**: React with TypeScript.
* **Styling**: Tailwind CSS for responsive and modern UI.
* **Features**:  
   * Dynamic board size (2x2 to 10x10).  
   * Swipe gestures for mobile devices.  
   * D-Pad for on-screen controls.  
   * Options menu for restarting or changing board size.

### **Backend**

* **Framework**: FastAPI.
* **Game Logic**:  
   * Handles tile movement, merging, and random tile generation.  
   * Validates game-over and game-won conditions.
* **Endpoints**:  
   * `/start`: Initializes a new game board.  
   * `/move`: Processes a move and returns the updated board.

### **Communication**

* The frontend communicates with the backend via REST API calls using `fetch`.

---

## **Technologies Used**

### **Frontend**

* **React**: Component-based UI development.
* **TypeScript**: Type-safe JavaScript.
* **Tailwind CSS**: Utility-first CSS framework.
* **Vite**: Fast development server and build tool.

### **Backend**

* **FastAPI**: High-performance Python web framework.
* **Uvicorn**: ASGI server for running FastAPI.
* **Python**: Core programming language.

### **Deployment**

* **Render**: Backend hosting.
* **Vercel**: Frontend hosting.
* **Docker**: Containerized deployment.

---
