import React, { ReactNode } from "react"
import HomeContentComponent from "./Content"
import HomeFooterComponent from "./Footer"
import HomeHeaderComponent from "./Header"
import { Layout } from 'antd';

const HomeLayouts = ({ children }: { children: ReactNode }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <HomeHeaderComponent />
            <HomeContentComponent>
                {children}
            </HomeContentComponent>
            <HomeFooterComponent />
        </Layout>
    )
}

export default HomeLayouts;