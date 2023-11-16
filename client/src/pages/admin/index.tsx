import React from "react";
import Auth from "../../auth";
import Layouts from "../../components/layouts/admin";
import AdminComponent from "../../components/pages/admin/admin";

const AdminPage = () => {
    return (
        <Layouts>
            <Auth>
                <AdminComponent />
            </Auth>
        </Layouts>
    )
}


export default AdminPage;