import React, {useState, createContext} from "react";

export const FilterContext = createContext(null);

const FilterProvider = ({children}) => {
    const [filters, setFilters] = useState({});

    return <FilterContext.Provider value={[filters, setFilters]}>
        {children}
    </FilterContext.Provider>
}

export default FilterProvider;