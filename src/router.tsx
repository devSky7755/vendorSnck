import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import OnboardingPhone from './content/onboarding/phone';
import OnboardingVerification from './content/onboarding/verification';
import OnboardingPin from './content/onboarding/pin';
import TermsAndPolicy from './content/pages/Docs/TermsAndPolicy';
import OnboardingOrderType from './content/onboarding/ordertype';
import OnboardingQueue from './content/onboarding/queue';
import OnboardingAcceptOrder from './content/onboarding/acceptorder';
import FAQ from './content/pages/Docs/FAQ';
import Logout from './content/login/logout';
import { isVendorApp } from './models/constant';
import { OrderIssue } from './content/orders/issue';
import { ActionBoard } from './content/orders/issue/action';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

//Admin
const VenuesPage = Loader(lazy(() => import('src/content/admin/venues')));

// Dashboards
const Dashboard = Loader(lazy(() => import('src/content/dashboards')));

// Settings

const UserProfile = Loader(lazy(() => import('src/content/pages/UserProfile')));
const UserSettings = Loader(
  lazy(() => import('src/content/pages/settings/Users'))
);
const MenuSettings = Loader(
  lazy(() => import('src/content/pages/settings/Menus'))
);
const OrderSettings = Loader(
  lazy(() => import('src/content/pages/settings/Orders'))
);
const PrinterSettings = Loader(
  lazy(() => import('src/content/pages/settings/Printers'))
);

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const LoginPage = Loader(lazy(() => import('src/content/login')));

//Orders
const OrdersPage = Loader(lazy(() => import('src/content/orders')));

const vendorRoutes: RouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="login" replace />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'logout',
        element: <Logout />
      },
      {
        path: 'terms_policy',
        element: <TermsAndPolicy />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'onboarding',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="phone" replace />
      },
      {
        path: 'phone',
        element: <OnboardingPhone />
      },
      {
        path: 'verification',
        element: <OnboardingVerification />
      },
      {
        path: 'pin',
        element: <OnboardingPin />
      },
      {
        path: 'ordertype',
        element: <OnboardingOrderType />
      },
      {
        path: 'queue',
        element: <OnboardingQueue />
      },
      {
        path: 'acceptorder',
        element: <OnboardingAcceptOrder />
      }
    ]
  },
  {
    path: 'help',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <FAQ />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      }
    ]
  },
  {
    path: 'profile',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <UserProfile />
      }
    ]
  },
  {
    path: 'settings',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/settings/users" replace />
      },
      {
        path: 'users',
        element: <UserSettings />
      },
      {
        path: 'menus',
        element: <MenuSettings />
      },
      {
        path: 'orders',
        element: <OrderSettings />
      },
      {
        path: 'printers',
        element: <PrinterSettings />
      }
    ]
  },
  {
    path: 'orders',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/orders/items/new" replace />
      },
      {
        path: 'items/:type',
        element: <OrdersPage />
      },
      {
        path: 'issue/:id',
        children: [
          {
            path: '',
            element: <OrderIssue />
          },
          {
            path: ':action',
            element: <ActionBoard />
          }
        ]
      }
    ]
  }
];

const adminRoutes: RouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="login" replace />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'logout',
        element: <Logout />
      },
      {
        path: 'terms_policy',
        element: <TermsAndPolicy />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'help',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <FAQ />
      }
    ]
  },
  {
    path: 'venues',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <VenuesPage />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      }
    ]
  },
  {
    path: 'profile',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <UserProfile />
      }
    ]
  },
  {
    path: 'settings',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/settings/users" replace />
      },
      {
        path: 'users',
        element: <UserSettings />
      },
      {
        path: 'menus',
        element: <MenuSettings />
      },
      {
        path: 'orders',
        element: <OrderSettings />
      },
      {
        path: 'printers',
        element: <PrinterSettings />
      }
    ]
  },
  {
    path: 'orders',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/orders/items/New" replace />
      },
      {
        path: 'items/:type',
        element: <OrdersPage />
      },
      {
        path: 'issue/:id',
        children: [
          {
            path: '',
            element: <OrderIssue />
          },
          {
            path: ':action',
            element: <ActionBoard />
          }
        ]
      }
    ]
  }
];

const routes = isVendorApp ? vendorRoutes : adminRoutes;
export default routes;
