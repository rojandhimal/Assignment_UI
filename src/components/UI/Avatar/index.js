import React from "react"
const Avatar = (props) => {
    const { label, src, size = 'sm' } = props || {}
    const initials = label.split(' ').map(item => item[0]).join('') || ''
  
    const sizeMap = {
      'sm': 'h-6 w-6',
      'sm-2': 'h-8 w-8',
      'md': 'h-10 w-10',
      'lg': 'h-12 w-12',
    }
    const sizeClass = sizeMap[size] || sizeMap.sm
    
    return (
      <span className={`inline-flex items-center justify-center ${sizeClass} rounded-full bg-gray-500`}>
        <span className="text-xs font-medium leading-none text-white">
        {
          src ?
          <img className={`rounded-full object-cover ${sizeClass}`} src={src} /> :
          initials
        }
        </span>
      </span>
    )
  }
  
  export { Avatar }
  