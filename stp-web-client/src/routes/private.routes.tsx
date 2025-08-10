import ListAdUserLogs from "@/modules/ad-users-logs/ui/list-ad-user-logs";
import CreateAdUsers from "@/modules/ad-users/ui/create-ad-users";
import ListAdUsers from "@/modules/ad-users/ui/list-ad-users";
import type { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject[] = [
  {
    path: "ad-users",
    children:[
      { path:"list", element:<ListAdUsers/> },
      { path:"create", element:<CreateAdUsers/>},
      { path: "logs", element:<ListAdUserLogs/>}
    ]
  }
]