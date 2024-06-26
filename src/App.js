import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layouts/Main";
import Question from "./Pages/Question";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import ResetPassword from "./Auth/ResetPassword";
import RecoveryPassword from "./Auth/RecoveryPassword";

import { Advocate } from "./Pages/Advocate";

import ClientContact from "./Pages/ClientContact";
import { ClientComment } from "./Pages/ClientComment";
import AddminPage from "./Pages/AdminPage";
import Services from "./Pages/Services";
import CaseHistory from "./Pages/CaseHistory";
import ForgotPassword from "./Auth/ForgotPassword";
import VerifyMail from "./Auth/VerifyMail";
import ClientRequest from "./Pages/ClientRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/admin/:id/reset/:token",
    element: <RecoveryPassword />,
  },

  {
    path: "/admin/:id/verify/:token",
    element: <VerifyMail />,
  },
  {
    path: "/home",
    element: <Main />,
    children: [
      { path: "/home", element: <AddminPage /> },
      { path: "/home/faq", element: <Question /> },
      { path: "/home/advocate", element: <Advocate /> },
      { path: "/home/client_contact", element: <ClientContact /> },
      { path: "/home/client_comment", element: <ClientComment /> },
      { path: "/home/servicess", element: <Services /> },
      { path: "/home/history", element: <CaseHistory /> },
      { path: "/home/client_request", element: <ClientRequest/> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
