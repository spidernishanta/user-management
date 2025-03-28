#🚀 User Management API \n
A RESTful API for managing users, built with Node.js, Express, and MongoDB.

✨ Features
• CRUD Operations: Create, Read, Update, Delete users
• JSON Responses: Consistent and machine-readable output
• Validation: Input validation for required fields
• Error Handling: Meaningful error messages and HTTP status codes
• Security: Basic security practices and CORS configuration

🛠️ Technologies
• Backend: Node.js, Express, MongoDB
• Frontend: Next.js, Tailwind CSS
• Tools: Postman

🚦 Getting Started
Prerequisites
• Node.js v18+
• MongoDB (local instance or MongoDB Atlas)
• Postman or curl for API testing

🔧 Installation 
1. Clone the repository:
git clone https://github.com/spidernishanta/user-management.git
2. Install backend dependencies:
cd backend
npm install
3. Configure environment variables:
Create a .env file in the backend/ directory:
NODE_ENV=development
PORT=3001
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DATABASE>?retryWrites=true&w=majority

Note: Replace <USERNAME>, <PASSWORD>, <CLUSTER>, and <DATABASE> with your MongoDB credentials before running the project.

4. Start the server:
npm start

📡 API Endpoints
Method Endpoint Description
POST /api/users/create Create a new user
GET /api/users Retrieve all users
GET /api/users/:id Get a single user by ID
PUT /api/users/:id Update a user by ID
DELETE /api/users/:id Delete a user by ID

🧪 Sample Requests
Create User
curl -X POST http://localhost:3001/api/users/create \
 -H "Content-Type: application/json" \
 -d '{"name": "Nishanta Kakati", "email": "nishantann@gmail.com", "age": 23}'
Success Response (201):
{
"\_id": "67e6f26d3ffc4e28259f7cae",
"name": "Nishanta Kakati",
"email": "nishantann@gmail.com",
"age": 23
}
Error Response (400):
{
"message": "Validation failed",
"errors": [
{ "msg": "Invalid email format" }
]
}

🚨 Error Handling
Status Code Description
400 Bad Request (Invalid input)
404 Not Found (User not found)
500 Internal Server Error

🔒 Security Features
• ✅ Input validation for required fields (name, email)
• ✅ MongoDB query sanitization
• ✅ CORS configured for frontend (port 3000)
• ✅ Environment variable protection

💻 Frontend Setup 
1. Navigate to the frontend directory:
cd frontend
2. Install dependencies:
npm install
3. Start the development server:
npm run dev
4. Access at:
👉 http://localhost:3000
