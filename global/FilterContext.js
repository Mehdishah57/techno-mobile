import React, {useState, createContext, useMemo} from "react";

export const FilterContext = createContext(null);

const FilterProvider = ({children}) => {
    const [filters, setFilters] = useState({});

    const state = useMemo(() => ([filters, setFilters]), [filters, setFilters]);

    return <FilterContext.Provider value={state}>
        {children}
    </FilterContext.Provider>
}

export default FilterProvider;