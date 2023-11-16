import React from "react";
import Auth from "../../auth";
import Layouts from "../../components/layouts/admin";
import AdminOrderComponent from "../../components/pages/admin/Order";

const AdminOrder = () => {
    return (
        <Layouts>
            <Auth>
                <AdminOrderComponent />
            </Auth>
        </Layouts>
    )
}


export default AdminOrder;