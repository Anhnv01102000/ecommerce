import React, { ReactNode } from "react"
import ContentComponent from "./content"
import FooterComponent from "./footer"
import HeaderComponent from "./header"
import { Layout } from 'antd';
import { ConfigProvider } from 'antd';


const Layouts = ({ children }: { children: ReactNode }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#a000d5',
                },
            }}
        >
            <Layout style={{ minHeight: '100vh' }}>
                <HeaderComponent />
                <ContentComponent>
                    {children}
                </ContentComponent>
                <FooterComponent />
            </Layout>
        </ConfigProvider>
    )
}

export default Layouts;