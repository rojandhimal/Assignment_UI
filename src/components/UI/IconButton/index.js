import React from 'react';
export const IconButton = (props) => {
    const {title, children, className, onClick, variant = "default"} = props
  
    const variants = {
      default: "px-3 border border-black rounded bg-white hover:bg-gray-50",
      clean: "",
    }
    const classes = variants[variant]   
  
    const buttonProps = {
      onClick,
      className: `${className} p-1 inline-flex items-center focus:outline-none ${classes}`,
      type: 'button'
    }
  
    return (
      <div {...buttonProps} title={title}>
        {children}
      </div>
    )
  }
  