import React from 'react'

export default function Spinner() {
  return (
    <div
        className="inline-block h-16 w-16 text-violet-800 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
    </div>
  )
}
