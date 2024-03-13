import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { LoginRoute } from "./LoginRoute";
import { Home } from "../pages/Home";
import { CategoryPage } from "../pages/CategoryPage";
import { ProductList } from "../pages/ProductList";
import { Root } from "../pages/Root";
import { Register } from "../pages/Register";
import { SearchResultsPage } from "../pages/SearchResultsPage";

const Routes = () => {

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories/:generalCategory",
          element: <CategoryPage />,
        },
        {
          path: "/products/:category",
          element: <ProductList />,
        },
        {
          path: "/search",
          element: <SearchResultsPage />
        }
      ]
    }
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <Root />,
          children: [
            {
              path: "/profile",
              element: <Profile />
            }
          ]
        }
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <LoginRoute />,
      children: [
        {
          path: "/",
          element: <Root />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            }
          ]
        }
      ]
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />
};

export default Routes;