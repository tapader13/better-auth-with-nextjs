# My Web App

This project is a simple web application that includes user authentication features with sign-in and sign-up functionalities, as well as a dashboard for logged-in users.

## Project Structure

```
my-web-app
├── src
│   ├── components
│   │   └── Header.tsx        # Navigation header component
│   ├── pages
│   │   ├── Dashboard.tsx     # Dashboard page component
│   │   ├── SignIn.tsx        # Sign-in page component
│   │   └── SignUp.tsx        # Sign-up page component
│   ├── layouts
│   │   └── MainLayout.tsx     # Main layout component
│   ├── App.tsx               # Main application component
│   └── index.tsx             # Entry point of the application
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                  # Project documentation
```

## Features

- **Sign In**: Users can enter their credentials to log into the application.
- **Sign Up**: New users can create an account by providing necessary information.
- **Dashboard**: A welcome page for users after they log in.

## Getting Started

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd my-web-app
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the application:

   ```
   npm start
   ```

## Technologies Used

- React
- TypeScript
- React Router (for navigation)

## License

This project is licensed under the MIT License.
