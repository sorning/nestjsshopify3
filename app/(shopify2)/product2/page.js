'use client'
import Footer from "@/components/layout/footer/footer";
import Hero1 from "@/components/layout/hero/hero1";
import Hero2 from "@/components/layout/hero/hero2";
import Navbar from "@/components/layout/navbar/navbar";
import Navbar2 from "@/components/layout/navbar/navbar2";
import ProductsList from "@/components/productsLayout/ProductsList";

export default function ShopifyHome() {
    return (
        <>
            <Navbar />
            
            <main>
                {/* <Hero2 /> */}
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
                    <Hero2 />
                    <ProductsList />
                    <p>Shopify Home Page</p>
                </div>
            </main>
            <Footer />
        </>
    )
}