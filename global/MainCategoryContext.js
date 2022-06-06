import React, { createContext, useState } from 'react';

export const MainCategoryContext = createContext(null);

export const MainCategoryProvider = ({children}) => {
    const [mainCategory, setMainCategory] = useState("");

    return <MainCategoryContext.Provider value={[mainCategory, setMainCategory]}>
        {children}
    </MainCategoryContext.Provider>
}

export default MainCategoryProvider;