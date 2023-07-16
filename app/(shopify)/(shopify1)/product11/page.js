import Hero2 from "@/components/layout/hero/hero2";
import Navbar from "@/components/layout/navbar/navbar";
import ProductsList from "@/components/productsLayout/ProductsList";

export default function ShopifyProduct() {
    return (
        <>
            <Navbar />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
                    <Hero2 />
                    <ProductsList />
                </div>
            </main>
        </>
    )
}