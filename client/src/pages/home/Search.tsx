import React from "react";
import HomeLayouts from "../../components/layouts/home";
import ListSearchComponent from "../../components/pages/home/ListSearchComponent";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
    const location = useLocation();
    const searchData = location.state?.searchData || [];

    return <HomeLayouts>
        <ListSearchComponent searchData={searchData} />
    </HomeLayouts>
}

export default SearchPage