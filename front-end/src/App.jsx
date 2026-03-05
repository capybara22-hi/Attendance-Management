import MainLayout from "./layouts/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BangChamCong from "@/pages/admin/BangChamCong";
import Employee from "./pages/admin/QuanLyNhanVien";
import ViewAll from "./pages/admin/ChamCongViewAll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<BangChamCong />}></Route>
          <Route path="/viewall" element={<ViewAll />}></Route>
          <Route path="/bangchamcong" element={<BangChamCong />}></Route>
          <Route path="/nhanvien" element={<Employee />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;