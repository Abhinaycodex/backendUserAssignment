# User Profile Management API 🚀

This is a **Node.js + Express + MongoDB** REST API for user profile management with **JWT authentication**.

## Features
✅ User Registration (with password hashing)  
✅ Secure JWT Authentication  
✅ Profile Retrieval & Update  
✅ MongoDB for Data Storage  
✅ Protected Routes (Users can only access their own profiles)

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Token)
- **Security**: bcrypt for password hashing

---

## 🚀 Installation & Setup

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/yourusername/user-profile-api.git
cd user-profile-api
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**
Create a `.env` file in the root directory and add the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ **Run the Server**
```sh
npm start
```
The server will start on `http://localhost:5000`.

---

## 📋 Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

---

## 📖 API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user  
- **POST** `/api/auth/login` - Login and receive a JWT  

### User Profile
- **GET** `/api/profile` - Retrieve the logged-in user's profile (Protected)  
- **PUT** `/api/profile` - Update the logged-in user's profile (Protected)  

---

## 🛡 Security
- Passwords are hashed using `bcrypt` before storing in the database.  
- JWT tokens are used for authentication and are required for accessing protected routes.  

---

## 🤝 Contributing
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature-name`).  
3. Commit your changes (`git commit -m 'Add some feature'`).  
4. Push to the branch (`git push origin feature-name`).  
5. Open a pull request.  


---

## 📧 Contact
For any inquiries or issues, please reach out to argupta0904@gmail.com.
