import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { CandidateContacts } from "./pages/CandidateContacts.tsx";
import { Us } from "./pages/Us.tsx";
import { Opportunities } from "./pages/Opportunities.tsx";
import { Calculator } from "./pages/Calculator.tsx";
import { Partners } from "./pages/Partners.tsx";
import { CareerAssistant } from "./pages/CareerAssistant.tsx";
import { PartnerContacts } from "./pages/PartnerContacts.tsx";
import { Community } from "./pages/Community.tsx";
import { AuthPage } from "./pages/AuthPage.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Profile } from "./pages/Profile.tsx";
import { RootLayout } from "./components/layouts/RootLayout";
import { AdminPanel } from "./pages/AdminPanel.tsx";
import { ManageOpportunities } from "./pages/ManageOpportunities.tsx";
import { OpportunityDetails } from "./pages/OpportunityDetails.tsx";
import PrivacyPolicy from "./pages/Privacy.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/opportunities/:id" element={<OpportunityDetails />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/community" element={<Community />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/careerassistant" element={<CareerAssistant />} />
      <Route path="/candidatecontacts" element={<CandidateContacts />} />
      <Route path="/partnercontacts" element={<PartnerContacts />} />
      <Route path="/us" element={<Us />} />
      <Route path="/auth/:type?" element={<AuthPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />


      {/* Protected routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/opportunities/manage"
        element={
          <ProtectedRoute roles={["partner", "admin"]}>
            <ManageOpportunities />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
