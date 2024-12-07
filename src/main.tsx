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
import { Navbar } from "./components/Navbar.tsx";
import { Us } from "./pages/Us.tsx";
import { Opportunities } from "./pages/Opportunities.tsx";
import { Interships } from "./pages/Interships.tsx";
import { Calculator } from "./pages/Calculator.tsx";
import { Partners } from "./pages/Partners.tsx";
import { CareerAssistant } from "./pages/CareerAssistant.tsx";
import { CandidatePartners } from "./pages/CandidatePartners.tsx";
import { Community } from "./pages/Community.tsx";
import { AuthPage } from "./pages/AuthPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route path="/" element={<Home />} />
      <Route path="/intership" element={<Interships />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/community" element={<Community />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/careerassistant" element={<CareerAssistant />} />
      <Route path="/contacts" element={<CandidateContacts />} />
      <Route path="/candidatepartners" element={<CandidatePartners />} />
      <Route path="/us" element={<Us />} />
      <Route path="/auth/:type?" element={<AuthPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
