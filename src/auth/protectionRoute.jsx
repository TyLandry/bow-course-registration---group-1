import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authentication";

export default function ProtectionRoute() {
  const { currentUser } = useAuth();
  return !currentUser ? <Navigate to="/login" replace /> : <Outlet />;
}
// Did the if else statement on hand first before converting it to a ternary operator
// return (
// if (!currentUser){
//     <Navigate to="/login" replace />;
// }
// return <Outlet />;
// )};
