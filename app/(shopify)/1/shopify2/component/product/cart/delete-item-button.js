import { useRouter } from "next/navigation"
import { useTransition } from "react"
import LoadingDots from "../../loading-dots"
import CloseIcon from "../../icons/close"
import { removeItem } from "./actions"
import clsx from "clsx"

export default function DeleteItemButton({ item }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    return (
        <>
            <button
                aria-label="Remove cart item"
                onClick={() => {
                    startTransition(async () => {
                        const error = await removeItem(item.id)

                        if (error) {
                            alert(error)
                            return
                        }

                        router.refresh()
                    })
                }}
                disabled={isPending}
                className={clsx(
                    'ease flex min-w-[36px] max-w-[36px] items-center justify-center border px-2 transition-all duration-200 hover:border-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900',
                    {
                        'cursor-not-allowed px-0': isPending
                    }
                )}
            >
                {isPending ? (
                    <LoadingDots className="bg-black dark:bg-white" />
                ) : (
                    <CloseIcon className="hover:text-accent-3 mx-[1px] h-4 w-4" />
                )}
            </button>
        </>
    )
}