'use client'

import { useState } from "react"
import { GridTileImage } from "../grid/tile"
import clsx from "clsx"

export function Gallery({
    title,
    amount,
    currencyCode,
    images,
}) {
    const [currentImage, setCurrentImage] = useState(0)

    function handleNavigate(direction) {
        if (direction === 'next') {
            setCurrentImage(currentImage + 1 < images.length ? currentImage + 1 : 0)
        } else {
            setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1)
        }
    }

    const buttonClassName = 'px-9 cursor-pointer ease-in-and-out duration-200 transition-bg bg-[#7928ca] hover:bg-violetDark'

    return (
        <>
            <div className="h-full">
                <div className="relative h-full max-h-[600px] overflow-hidden">
                    {images[currentImage] && (
                        <GridTileImage
                            src={images[currentImage]?.src}
                            alt={images[currentImage]?.altText}
                            width={600}
                            height={600}
                            isInteractive={false}
                            priority={true}
                            background='purple'
                            labels={{
                                title,
                                amount,
                                currencyCode
                            }}
                        />
                    )}

                    {images.length > 1 ? (
                        <div className="absolute bottom-10 right-10 flex h-12 flex-row border border-white text-white shadow-xl dark:border-black dark:text-black">
                            <button
                                aria-label="Previous product image"
                                className={clsx(buttonClassName, 'border-r border-white dark:border-black')}
                                onClick={() => handleNavigate('previous')}
                            >
                                previous
                            </button>
                            <button
                                aria-label="Next product image"
                                className={clsx(buttonClassName)}
                                onClick={() => handleNavigate('next')}
                            >
                                next
                            </button>
                        </div>
                    ) : null}
                </div>
                {images.length > 1 ? (
                    <div className="flex">
                        {images.map((image, index) => {
                            const isActive = index === currentImage
                            return (
                                <button
                                    aria-label="Enlarge product image"
                                    key={image.src}
                                    className="h-full w-1/4"
                                    onClick={() => setCurrentImage(index)}
                                >
                                    <GridTileImage
                                        alt={image?.altText}
                                        src={image.src}
                                        width={600}
                                        height={600}
                                        background='purple-dark'
                                        active={isActive}
                                    />
                                </button>
                            )
                        })}

                    </div>
                ) : null}
            </div>
        </>
    )
}