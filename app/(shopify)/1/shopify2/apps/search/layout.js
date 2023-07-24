import { Suspense } from "react";
import Collections from "../../component/layout/search/collections";
import FilterList from "../../component/layout/search/filter";
import { sorting } from "../../lib/shopify/constants";
import Footer from "../../component/layout/footer";

export default function SearchLayout({children}){
    return (
        <Suspense>
            <div className="mx-auto flex max-w-7xl flex-col bg-white py-6 text-black dark:bg-black dark:text-white md:flex-row">
                <div className="order-first flex-none md:w-1/6">
                    <Collections />
                </div>
                <div className="order-last min-h-screen w-full md:order-none">{children}</div>
                <div>
                    <FilterList list={sorting} title='Sort by' />
                </div>
            </div>
            <Footer />
        </Suspense>
    )
}