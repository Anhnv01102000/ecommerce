import React from "react";
import { ReactNode } from "react";
import "./style.scss"

const HomeContentComponent = ({ children }: { children: ReactNode }) => {
    return <div className="content">{children}</div>;
};
export default HomeContentComponent;