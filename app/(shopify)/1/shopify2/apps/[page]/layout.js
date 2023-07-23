import { Suspense } from "react";
import Footer from "../../component/layout/footer";

export default function PageLayout({children}){
    return (
        <Suspense>
            <div className="w-full bg-white dark:bg-black">
                <div className="mx-8 max-w-2xl py-20 sm:mx-auto">
                    <Suspense>{children}</Suspense>
                </div>
            </div>
            <Footer />
        </Suspense>
    )
}