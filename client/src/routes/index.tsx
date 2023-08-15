import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin";
import Error from "../pages/error";
import AdminUser from "../pages/admin/user";
import AdminProduct from "../pages/admin/product";
import AdminCategory from "../pages/admin/category";
import AdminOrder from "../pages/admin/order";
import HomePage from "../pages/home";
import IphonePage from "../pages/home/iPhone";
import MacPage from "../pages/home/Mac";
import IpadPage from "../pages/home/Ipad";
import WatchPage from "../pages/home/Watch";
import SoundPage from "../pages/home/Sound";
import AccessoryPage from "../pages/home/Accessory";
import TopCarePage from "../pages/home/TopCare";
import Login from "../pages/admin/login";
import Register from "../pages/admin/register";
import ProductDetailPage from "../pages/home/ProductDetail";
import CartPage from "../pages/home/Cart";
import SuccessPage from "../pages/home/Success";


const BrowerRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                {/* admin */}
                <Route path='/admin' element={<AdminPage />} />
                <Route path="/admin/user" element={<AdminUser />} />
                <Route path="/admin/product" element={<AdminProduct />} />
                <Route path="/admin/category" element={<AdminCategory />} />
                <Route path="/admin/order" element={<AdminOrder />} />

                {/* home */}
                <Route path='/home' element={<HomePage />} />
                <Route path='/iphone' element={<IphonePage />} />
                <Route path='/mac' element={<MacPage />} />
                <Route path='/ipad' element={<IpadPage />} />
                <Route path='/watch' element={<WatchPage />} />
                <Route path='/amthanh' element={<SoundPage />} />
                <Route path='/phukien' element={<AccessoryPage />} />
                <Route path='/topcare' element={<TopCarePage />} />
                <Route path='/product/:id' element={<ProductDetailPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/success' element={<SuccessPage />} />
                {/* lỗi không tồn tại trang */}
                <Route path="*" element={<Error />} />
                {/* Auth */}
                <Route path='/' element={<HomePage />} />
            </Routes>
        </BrowserRouter >
    )
}

export default BrowerRouter;