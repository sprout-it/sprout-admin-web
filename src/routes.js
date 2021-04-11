/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Users from "views/Users.js";
import Partners from "views/Partners.js";
import Merchants from "views/Merchants.js";
import Notifications from "views/Notifications.js";
import Banner from 'views/Banner'
import Upgrade from "views/Upgrade.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/banner",
    name: "Banner",
    icon: "nc-icon nc-album-2",
    component: Banner,
    layout: "/admin",
  },
  {
    path: "/news",
    name: "News",
    icon: "nc-icon nc-paper-2",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/partner",
    name: "Partner",
    icon: "nc-icon nc-circle-09",
    component: Partners,
    layout: "/admin",
  },
  {
    path: "/merchant",
    name: "Merchant",
    icon: "nc-icon nc-cart-simple",
    component: Merchants,
    layout: "/admin",
  },
  {
    path: "/email",
    name: "E-Mail",
    icon: "nc-icon nc-email-85",
    component: Merchants,
    layout: "/admin",
  },
];

export default dashboardRoutes;
