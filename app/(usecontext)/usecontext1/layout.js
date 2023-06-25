import {ThemeContextProvider1} from "./context/themecontext"

export default function ContextLayout({ children }) {
    return (
        <ThemeContextProvider1>
            <p className="text-2xl">usecontentxlayout</p>
            {children}
            <p className="text-2xl">usecontextlayout</p>
        </ThemeContextProvider1>
    )
}