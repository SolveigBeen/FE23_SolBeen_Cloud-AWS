import { createBrowserRouter } from "react-router-dom";
import Flow from '../pages/Flow/flow';
import WriteMsg from '../pages/WriteMsg/writeMsg';
import UpdateMsg from '../pages/UpdateMsg/updateMsg';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Flow />,
  },
  {
    path: "/WriteMsg",
    element: <WriteMsg />,
  },
  {
    path: "/updateMsg",
    element: <UpdateMsg />,
  },
]);

export default router;