import React from "react";
import Auth from "../../auth";
import Layouts from "../../components/layouts/admin";
import TableProductComponent from "../../components/pages/admin/Product";

const AdminProductPage = () => {
    return (
        <Layouts>
            <Auth>
                <TableProductComponent />
            </Auth>
        </Layouts>
    )
}


export default AdminProductPage;