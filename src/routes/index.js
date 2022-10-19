import React from "react"
import { Routes, Route } from "react-router-dom"
import PermissionDenied from "../components/PermissionDenied"
import InnerContent from "../pages/InnerContent"
import Login from "../pages/Login"
import Practitioner from "../pages/Practitioner"
import AddPractitioner from "../pages/Practitioner/AddPractitioner"
import EditPractitioner from "../pages/Practitioner/EditPractitioner"
import SignUp from "../pages/Signup"
import Users from "../pages/Users"
import EditUser from "../pages/Users/EditUser"
import ProtectedRoutes from "./authRoute"
import PublicRoutes from "./publicRoutes"

const MainRoutes = () => (
    <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<InnerContent />}>
                <Route path="/" element={<Practitioner />} />
                <Route path="/users" element={<Users />} />
                <Route path="/user/:id/edit/" element={<EditUser />} />
                <Route path="/practitioner/add" element={<AddPractitioner />} />
                <Route path="/practitioner/:id/edit/" element={<EditPractitioner />} />
            </Route>
        </Route>
        <Route path="login" element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
        </Route>
        <Route path="signup" element={<PublicRoutes />}>
            <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="/denied" element={<PermissionDenied />} />
    </Routes>
)

export default MainRoutes