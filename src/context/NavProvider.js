import React from 'react'

// Our global theme context with default values
export const NavContext = React.createContext({
    show: true,
    setShow: () => { },
})

// Theme provider component with state
const NavProvider = props => {
    const [show, setShow] = React.useState(true)
    const value = { show, setShow }
    return (
        <NavContext.Provider value={value}>
            {props.children}
        </NavContext.Provider>
    )
}

// Exports a ThemeProvider wrapper
export default ({ element }) => <NavProvider>{element}</NavProvider>