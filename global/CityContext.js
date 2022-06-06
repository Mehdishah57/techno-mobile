import React, { createContext, useState, useMemo } from 'react';

export const CityContext = createContext(null);

export const CityProvider = ({children}) => {
    const [city, setCity] = useState({});

    const state = useMemo(() => ([city, setCity]), [city._id, city.name])

    return <CityContext.Provider value={state}>
        {children}
    </CityContext.Provider>
}

export default CityProvider;