import { createBrowserRouter } from 'react-router-dom';

import LayoutPage from 'pages/layout';
import ErrorPage from 'pages/errorPage';
import HomePage from 'pages/home';
import ShopPage from 'pages/shop';
import { ROUTE_PATH } from 'utils/constant';
import FreePatterns from 'pages/freePattern';
import Blog from 'pages/blog';
import Contact from 'pages/contact';
import About from 'pages/about';
import Login from 'pages/login';
import NotFound from 'pages/NotFound';
import RegisterPage from 'pages/login/Register';
import Dashboard from 'pages/Admin/Dashboard';
import PatternsList from 'pages/Admin/patterns';
import Admin from 'pages/Admin';
import UsersList from 'pages/Admin/users';
import PostsList from 'pages/Admin/posts';
import ProductsList from 'pages/Admin/products';
import CategoriesList from 'pages/Admin/categories';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <LayoutPage />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTE_PATH.SHOP,
        element: <ShopPage />,
      },
      {
        path: ROUTE_PATH.FREEPATTERNS,
        element: <FreePatterns />,
      },
      {
        path: ROUTE_PATH.BLOG,
        element: <Blog />,
      },
      {
        path: ROUTE_PATH.CONTACT,
        element: <Contact />,
      },
      {
        path: ROUTE_PATH.ABOUT,
        element: <About />,
      },
    ],
  },
  {
    path: ROUTE_PATH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTE_PATH.REGISTER,
    element: <RegisterPage />,
  },
  // Admin page
  {
    path: ROUTE_PATH.ADMIN,
    element: <Admin />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: ROUTE_PATH.ADMIN_CATEGORY,
        element: <CategoriesList />,
      },
      {
        path: ROUTE_PATH.ADMIN_PATTERNS,
        element: <PatternsList />,
      },
      {
        path: ROUTE_PATH.ADMIN_USERS,
        element: <UsersList />,
      },
      {
        path: ROUTE_PATH.AMIN_PRODUCTS,
        element: <ProductsList />,
      },
      {
        path: ROUTE_PATH.ADMIN_POSTS,
        element: <PostsList />,
      },
      
       
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
