import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"; 

import Main, { mainLoader } from "./layouts/Main";

//routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import { logoutAction } from "./actions/logout";


//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//pages
import DetailsPage, { detailsAction, detailsLoader } from "./pages/DetailsPage";
import ProjectPage, { projectAction, projectPageLoader } from "./pages/BugPage";
import { deleteProject } from "./actions/deleteProject";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader:mainLoader,
    errorElement: <Error/>,
    children:[
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action:dashboardAction,
        errorElement: <Error />
      
      },
      {
        path:"project/:id",
        element: <ProjectPage/>,
        loader:projectPageLoader,
        action:projectAction,
        errorElement: <Error />,
        children:[
          {
            path:"delete",
            action:deleteProject
          }
        ]
      
      },
      {
        path:"details",
        element: <DetailsPage />,
        loader: detailsLoader,
        action:detailsAction,
        errorElement: <Error />
        
      
      },
      {
        path:"logout",
        action:logoutAction
      }
      
    ]
    
  },
  
  
]);
function App() {
  

  return (
    
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer/>
      </div>
  )
}

export default App
