import { createBrowserRouter } from "react-router-dom";
import * as Pages from "../pages";
import Layout from '../components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Pages.DashboardPage /> },
      { path: 'add-majdoor', element: <Pages.AddMajdoorPage /> },
      { path: 'add-wage', element: <Pages.AddWagePage /> },
      { path: 'add-lending', element: <Pages.AddLendingPage /> },
      // { path: 'dashboard', element: <Pages.DashboardPage /> },
    ],
  },
]);
export default router;