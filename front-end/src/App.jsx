import MainLayout from "./layouts/MainLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BangChamCong from "@/pages/admin/BangChamCong";
import Employee from "./pages/admin/QuanLyNhanVien";
import ViewAll from "./pages/admin/ChamCongViewAll";
import DangNhap from "./pages/admin/DangNhap";
import DangKy from "./pages/admin/DangKy";
import TongQuan from "./pages/admin/TongQuan";
import DonNghiPhep from "./pages/admin/DonNghiPhep";
import ThongTinCaNhan from "./pages/employees/ThongTinCaNhan";
import ChamCong from "./pages/employees/ChamCong";
import DonNghiPhepE from "./pages/employees/DonNghiPhepE";
import ThongBao from "./pages/employees/ThongBao";

function ProtectedRoute({ children }) {
  const authUser =
    localStorage.getItem("auth_user") || sessionStorage.getItem("auth_user");

  if (!authUser) {
    return <Navigate to="/dangnhap" replace />;
  }

  return children;
}

function PublicAuthRoute({ children }) {
  const authUser =
    localStorage.getItem("auth_user") || sessionStorage.getItem("auth_user");

  if (authUser) {
    return <Navigate to="/admin/bangchamcong" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dangnhap"
          element={
            <PublicAuthRoute>
              <DangNhap />
            </PublicAuthRoute>
          }
        />
        <Route
          path="/dangky"
          element={
            <PublicAuthRoute>
              <DangKy />
            </PublicAuthRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TongQuan />} />
          <Route path="viewall" element={<ViewAll />} />
          <Route path="bangchamcong" element={<BangChamCong />} />
          <Route path="nhanvien" element={<Employee />} />
          <Route path="donnghiphep" element={<DonNghiPhep />} />
          <Route path="thongtincanhan" element={<ThongTinCaNhan />} />
        </Route>

        <Route
          path="/"
          element={<Navigate to="/admin/bangchamcong" replace />}
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route index path="chamcong" element={<ChamCong />} />
          <Route path="thongtincanhan" element={<ThongTinCaNhan />} />
          <Route path="donnghiphep" element={<DonNghiPhepE />} />
          <Route path="thongbao" element={<ThongBao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
