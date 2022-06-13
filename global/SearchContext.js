import React, {useState, createContext} from 'react';

export const SearchContext = createContext(null);

const SearchProvider = ({children}) => {
    const [search, setSearch] = useState("");

    return <SearchContext.Provider value={[search, setSearch]}>
        {children}
    </SearchContext.Provider>
}

export default SearchProvider;