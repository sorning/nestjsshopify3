'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { createUrl } from "../../lib/shopify/utils"
import Link from "next/link"
import clsx from "clsx"

export function VariantSelector({ options, variants }) {
    const pahtname = usePathname()
    const currentParams = useSearchParams()
    const router = useRouter()
    const hasNoOptionsOrJustOneOption = !options.length || (options.length === 1 && options[0]?.values.length === 1)

    if (hasNoOptionsOrJustOneOption) {
        return null
    }

    const paramsMap = Object.fromEntries(
        Array.from(currentParams.entries()).filter(([key, value]) => options.find((option) => option.name.toLowerCase() === key && option.values.includes(value)))
    )

    const optimizedVariants = variants.map((variant) => {
        const optimized = {
            id: variant.id,
            availableForSale: variant.availableForSale,
            params: new URLSearchParams()
        }

        variant.selectedOptions.forEach((selectedOption) => {
            const name = selectedOption.name.toLowerCase()
            const value = selectedOption.value

            optimized[name] = value
            optimized.params.set(name, value)
        })

        return optimized
    })

    const selectedVariant = optimizedVariants.find(
        (variant) => variant.availableForSale && Object.entries(paramsMap).every(([key, value]) => variant[key] === value)
    ) || optimizedVariants.find((variant) => variant.availableForSale)

    const selectedVariantParams = new URLSearchParams(selectedVariant?.params)
    const currentUrl = createUrl(pahtname, currentParams)
    const selectedVariantUrl = createUrl(pahtname, selectedVariantParams)

    if (currentUrl !== selectedVariantUrl) {
        router.replace(selectedVariantUrl)
    }

    return options.map((option) => (
        <dl className="mb-8" key={option.id}>
            <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
            <dd className="flex flex-wrap gap-3">
                {option.values.map((value) => {
                    const optionParams = new URLSearchParams(selectedVariantParams)
                    optionParams.set(option.name.toLowerCase(), value)

                    const optionUrl = createUrl(pahtname, optionParams)

                    const isActive = selectedVariantParams.get(option.name.toLowerCase()) === value

                    const isAvailableForSale = optimizedVariants.find((a) => Array.from(optionParams.entries()).every(([key, value]) => a[key] === value))?.availableForSale

                    //DynamicTag = Link : <Link>, DynamicTag = P : <p>
                    const DynamicTag = isAvailableForSale ? Link : 'p'

                    return (
                        <DynamicTag
                            key={value}
                            href={optionUrl}
                            title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                            className={clsx(
                                'flex h-12 min-w-[48px] items-center justify-center rounded-full px-2 text-sm',
                                {
                                    'cursor-default ring-2 ring-black dark:ring-white': isActive,
                                    'ring-1 ring-gray-300 transition duration-300 ease-in-out hover:scale-110 hover:bg-gray-100 hover:ring-black dark:ring-gray-700 dark:hover:bg-transparent dark:hover:ring-white':
                                        !isActive && isAvailableForSale,
                                    'relative z-10 cursor-not-allowed overflow-hidden bg-gray-100 ring-1 ring-gray-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-gray-300 before:transition-transform dark:bg-gray-900 dark:ring-gray-700 before:dark:bg-gray-700':
                                        !isAvailableForSale
                                }
                            )}
                            data-testid={isActive?'selected-variant':'variant'}
                        >
                            {value}
                        </DynamicTag>
                    )
                })}
            </dd>

        </dl>
    ))
}