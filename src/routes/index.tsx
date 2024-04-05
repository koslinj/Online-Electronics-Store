import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../pages/auth/Login";
import { Profile } from "../pages/profile/Profile";
import { LoginRoute } from "./LoginRoute";
import { Home } from "../pages/Home";
import { CategoryPage } from "../pages/CategoryPage";
import { ProductListPage } from "../pages/ProductListPage";
import { Root } from "../pages/Root";
import { Register } from "../pages/auth/Register";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "@/pages/ProductPage";
import { Cart } from "@/pages/Cart";
import { Order } from "@/pages/order/Order";
import { OrderRoot } from "@/pages/order/OrderRoot";
import { Summary } from "@/pages/order/Summary";

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
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/categories/:generalCategory",
          element: <CategoryPage />,
        },
        {
          path: "/products/:category",
          element: <ProductListPage />,
        },
        {
          path: "/products/:category/:productName",
          element: <ProductPage />,
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
        },
        {
          path: "/",
          element: <OrderRoot />,
          children: [
            {
              path: "/order",
              element: <Order />
            },
            {
              path: "/order/summary",
              element: <Summary />
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