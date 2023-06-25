import { ThemeContextProvider } from "./context";

export default function ThemeContextLayout({children}) {
    return (
        <ThemeContextProvider>
            <p>ThemeContextLayout</p>
            {children}
            <p>ThemeContextLayout</p>
        </ThemeContextProvider>
    )
}