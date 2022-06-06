import React, { createContext, useState } from 'react';

export const SubCategoryContext = createContext(null);

export const SubCategoryProvider = ({children}) => {
    const [subCategory, setSubCategory] = useState("");

    return <SubCategoryContext.Provider value={[subCategory, setSubCategory]}>
        {children}
    </SubCategoryContext.Provider>
}

export default SubCategoryProvider;