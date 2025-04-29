// Importing necessary libraries
import { StrictMode } from "react"; // StrictMode enables additional checks for potential issues during development.
import { createRoot } from "react-dom/client"; // For rendering the React app in the DOM
import "./index.css"; // Global CSS file for the app
import App from "./App.jsx"; // Main App component
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom"; // React Router for managing routes
import CreateTrip from "./components/ui/createTrip"; // CreateTrip component for the trip creation page
import Header from "./components/ui/custom/Header"; // Custom Header component
import { Toaster } from "./components/ui/sonner"; // Toaster notification component (for notifications in the app)
import { GoogleOAuthProvider } from "@react-oauth/google"; // For Google OAuth integration
import { DialogProvider } from "./components/ui/custom/DailogContext"; // Context provider for managing dialogs in the app
import Viewtrip from "./view-trip/[tripId]/ViewTrip"; // Viewtrip component to display trip details based on tripId
// import MyTrips from "./my-trips/myTrips";
import MyTrips from "./my-trips/MyTrips";
<<<<<<< HEAD
=======

>>>>>>> c50ab12 (updated vercel json})
// Setting up the router for navigation


const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
  },
  {
    path: "/CreateTrip", 
    element: <CreateTrip />,
  },
  {
    path: '/view-trip/:tripId', 
    element: <Viewtrip />
  },
  {
    path:'my-trips', // fixed path
    element: <MyTrips/> // fixed component usage
  },
]);

// Rendering the app into the DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* The StrictMode helps identify potential issues in the app during development */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      {/* The GoogleOAuthProvider wraps the app and provides Google OAuth functionality for user authentication */}
      <DialogProvider>
        {/* The DialogProvider context is used to manage dialogs throughout the app */}
        <Header />
        {/* The Header component displays the main navigation/header of the app */}
        <Toaster />
        {/* The Toaster component is used to show toast notifications */}
        <RouterProvider router={router} />
        {/* RouterProvider manages the routes defined above and handles navigation */}
      </DialogProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
