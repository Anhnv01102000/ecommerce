import React from "react";
import Auth from "../../auth";
import Layouts from "../../components/layouts/admin";
import TableUserComponent from "../../components/pages/admin/User";

const AdminUserPage = () => {
    return (
        <Layouts>
            <Auth>
                <TableUserComponent />
            </Auth>
        </Layouts>
    )
}


export default AdminUserPage;