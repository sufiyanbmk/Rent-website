# Rent-website

Rent App
This repository contains a Rent App project built using the MERN stack (MongoDB, Express, React, Node.js). The app allows users to list and rent products by following a simple workflow. Here are some key features of the project:

Features

User Authentication: Users can create an account, log in, and verify their email address. Additionally, the app supports Google login and OTP login for convenience and security.

Product Listing: Once logged in, users can easily list their products by filling out a form. They can provide details such as category, state, location, and price to help potential renters find their products.

Product Filtering: Users can filter products based on various criteria, including category, state, place, and price. This makes it easy for renters to find the products that match their requirements.

Messaging System: The app provides a messaging system that leverages Socket.IO, allowing users to communicate with each other. Additionally, users can make voice or video calls using WebRTC technology.

Ad Boosting: To increase visibility, the app offers an ad boosting feature. Users can choose to boost their product listings, and a payment system powered by Stripe enables secure transactions.

Reporting System: Users have the option to report inappropriate or suspicious products. The admin side of the app includes functionality to review reports, block users, and delete reported products if necessary.

Technology Stack


Frontend: The frontend of this project is built using React. The user interface utilizes the Tailwind CSS framework to create a visually appealing and responsive design.

Backend: The backend is developed with TypeScript and follows a clean architecture approach. It is powered by Node.js and Express, providing a robust and scalable foundation for the app.

Database: MongoDB is used as the database management system to store and retrieve product and user data efficiently.

Admin Interface: The admin side of the app utilizes Material UI to create a user-friendly interface. Admins can manage users, review reports, and take appropriate actions.

Getting Started


To set up the project locally, please follow these steps:

Clone the repository: git clone https://github.com/sufiyanbmk/Rent-website.git
Install the required dependencies for both frontend and backend: npm install
Configure the environment variables for the backend, such as database connection details and Stripe API keys.
Run the backend server: npm run start:server
Run the frontend development server: npm run start:client
Make sure you have MongoDB installed and running before starting the backend server.

Contributing


If you would like to contribute to this project, please follow these guidelines:

Fork the repository and create a new branch for your feature or bug fix.
Commit your changes and push the branch to your forked repository.
Submit a pull request, explaining the changes you made and their purpose.


Contact


If you have any questions or suggestions regarding this project, please feel free to reach out to the project maintainer(s) at [sufiyanbmk@gmail.com].
