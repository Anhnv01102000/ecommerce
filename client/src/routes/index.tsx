import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin";
import Error from "../pages/error";
import AdminUser from "../pages/admin/user";
import AdminProduct from "../pages/admin/product";
import AdminCategory from "../pages/admin/category";
import AdminOrder from "../pages/admin/order";
import HomePage from "../pages/home";
import IPhone from "../pages/home/iPhone/iPhone";

const BrowerRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* admin */}
                <Route path='/admin' element={<AdminPage />} />
                <Route path="/admin/user" element={<AdminUser />} />
                <Route path="/admin/product" element={<AdminProduct />} />
                <Route path="/admin/category" element={<AdminCategory />} />
                <Route path="/admin/order" element={<AdminOrder />} />

                {/* home */}
                <Route path='/home' element={<HomePage />} />
                <Route path='/iphone' element={<IPhone />} />
                <Route path='/mac' element={<IPhone />} />
                <Route path='/ipad' element={<IPhone />} />
                <Route path='/watch' element={<IPhone />} />
                <Route path='/amthanh' element={<IPhone />} />
                <Route path='/phukien' element={<IPhone />} />
                <Route path='/topcare' element={<IPhone />} />

                {/* lỗi không tồn tại trang */}
                <Route path="*" element={<Error />} />
                {/* Auth */}
                <Route path='/' element={<HomePage />} />
            </Routes>
        </BrowserRouter >
    )
}

export default BrowerRouter;