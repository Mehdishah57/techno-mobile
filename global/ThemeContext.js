import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext(null);

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(Appearance.getColorScheme());

    useEffect(()=>{
        const { remove } = Appearance.addChangeListener(()=>setTheme(Appearance.getColorScheme()))

        return () => remove()
    },[])

    return <ThemeContext.Provider value={[theme]} >
        {children}
    </ThemeContext.Provider>
}

export default ThemeProvider;