Jewelry eCommerce Website
A simple jewelry eCommerce website built with the MERN stack (MongoDB, Express, React, Node.js). The platform allows users to view featured products, create an account, and purchase items.

Features
Featured Products: A page displaying highlighted jewelry items.

User Account: Create an account to track orders and make purchases.

Responsive Design: Optimized for both desktop and mobile views.

Installation
Clone the repository.

bash
Copy
Edit
git clone <repository-url>
cd <project-folder>
Install dependencies for both the client and server.

bash
Copy
Edit
# For the client
cd client
npm install

# For the server
cd ../server
npm install
Set up environment variables in the .env file for the backend (e.g., MongoDB URI, JWT secret).

Start both the client and server.

bash
Copy
Edit
# For the server
cd server
npm start

# For the client
cd client
npm start
Folder Structure
bash
Copy
Edit
/client
  /src
    /components      # React components like ProductCard, Navbar, etc.
    /pages           # Pages like Home, ProductDetail, Account
    /assets          # Images, CSS files
    /App.js          # Main React app component
    /index.js        # React entry point

/server
  /controllers      # Logic for handling routes (e.g., user, products)
  /models           # Mongoose models (e.g., User, Product)
  /routes           # Express routes for authentication, products
  /middleware       # Authentication middleware (JWT)
  /server.js        # Main Node server file
  /config           # Configuration files like database connection
  .env              # Environment variables (e.g., JWT_SECRET, DB_URI)
Technologies Used
Frontend: React, Bootstrap

Backend: Node.js, Express, MongoDB

Authentication: JWT

If you want to check out the final work please click below :)
Wesite Link - https://nomads-jewelry-shopping-website-front.vercel.app/
Demo Video - https://www.youtube.com/watch?v=yXJAPIbcyFQ
