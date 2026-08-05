import MainLayout from "./layouts/MainLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BangChamCong from "@/pages/admin/BangChamCong";
import Employee from "./pages/admin/QuanLyNhanVien";
import ViewAll from "./pages/admin/ChamCongViewAll";
import DangNhap from "./pages/admin/DangNhap";
import DangKy from "./pages/admin/DangKy";
import TongQuan from "./pages/admin/TongQuan";
import DonNghiPhep from "./pages/admin/DonNghiPhep";


function ProtectedRoute({ children }) {
  const authUser = localStorage.getItem("auth_user") || sessionStorage.getItem("auth_user");

  if (!authUser) {
    return <Navigate to="/dangnhap" replace />;
  }

  return children;
}

function PublicAuthRoute({ children }) {
  const authUser = localStorage.getItem("auth_user") || sessionStorage.getItem("auth_user");

  if (authUser) {
    return <Navigate to="/bangchamcong" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/" element={<TongQuan />}></Route>
          <Route path="/viewall" element={<ViewAll />}></Route>
          <Route path="/bangchamcong" element={<BangChamCong />}></Route>
          <Route path="/nhanvien" element={<Employee />}></Route>
          <Route path="/donnghiphep" element={<DonNghiPhep />}></Route>
        </Route>
        <Route path="/dangnhap" element={<PublicAuthRoute><DangNhap /></PublicAuthRoute>}></Route>
        <Route path="/dangky" element={<PublicAuthRoute><DangKy /></PublicAuthRoute>}></Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App;