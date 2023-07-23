'use client'

import { Transition } from '@headlessui/react'
import { useState } from 'react'

export default function MyComponent() {
  const [isShowing, setIsShowing] = useState(false)

  return (
    <>
      <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
        Toggle
      </button>
      <Transition
        show={true}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        I will fade in and out
      </Transition>
    </>
  )
}