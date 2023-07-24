import Link from "next/link";
import { getMenu } from "../../../lib/shopify";
import MobileMenu from "./mobile-menu";
import LogoIcon from "../../icons/logo";
import Search from "./search";
import { Suspense } from "react";
import Cart from "../../product/cart";
import CartIcon from "../../icons/cart";

export default async function Navbar() {
    const menu = await getMenu('willingwater-crystal')
    //debug: get menu
    console.log(menu, 'menu from navbar index')

    return (
        <>
            <nav className="relative flex items-center justify-between bg-white p-4 dark:bg-black lg:px-6">
                <div className="block w-1/3 md:hidden">
                    <MobileMenu menu={menu} />
                </div>
                <div className="flex justify-self-center md:w-1/3 md:justify-self-start">
                    <div className="md:mr-4">
                        {/* set to our own project root pathname */}
                        <Link href='/1/shopify2/apps' aria-label="go back home">
                            <LogoIcon className='h-8 transition-transform hover:scale-110' />
                        </Link>
                    </div>
                    {menu.length ? (
                        <ul className="hidden md:flex md:items-center">
                            {menu.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        // href={item.path}
                                        href={`/1/shopify2/apps${item.path}`}
                                        className="rounded-lg px-2 py-1 text-gray-800 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
                <div className="hidden w-1/3 md:block">
                    <Search />
                </div>

                <div className="flex w-1/3 justify-end">
                    <Suspense fallback={<CartIcon className='h-6' />}>
                        <Cart />
                    </Suspense>
                </div>
            </nav>
        </>
    )
}