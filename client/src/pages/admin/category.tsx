import React from "react";
import Auth from "../../auth";
import Layouts from "../../components/layouts/admin";
import TableCategoryComponent from "../../components/pages/admin/Category";

const AdminCategoryPage = () => {
    return (
        <Layouts>
            <Auth>
                <TableCategoryComponent />
            </Auth>
        </Layouts>
    )
}


export default AdminCategoryPage;