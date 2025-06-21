import { createBrowserRouter } from "react-router-dom";
import * as Pages from "../pages"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Pages.Dashboard />
    }
])
export default router;