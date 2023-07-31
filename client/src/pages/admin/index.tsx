import Auth from "../../auth";
import Layouts from "../../components/layouts/admin";
import AdminComponent from "../../components/pages/admin/admin";

const AdminPage = () => {
    return (
        <Auth>
            <Layouts>
                <AdminComponent />
            </Layouts>
        </Auth>
    )
}


export default AdminPage;