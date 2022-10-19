import React from 'react';
import { Spinner } from '../../Spinner';

export const Button = (props) => {
  const {label, onClick, action, disabled = false, className, loading = false, icon, customPadding, anchorType} = props || {}

  const actions = {
    black: 'border-transparent bg-black text-white lg:text-xs',
    default: 'border-black bg-white text-black lg:text-xs'
  }

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const actionClass = actions[action] || actions.black

  const buttonProps = {
    // eslint-disable-next-line max-len
    className: `${className} w-full justify-center rounded border shadow-sm ${customPadding || 'px-4 py-2'} text-base font-medium uppercase focus:outline-none sm:w-auto sm:text-sm ${actionClass} ${disabledClass}`,
    ...(!disabled ? {onClick} : {})
  }
  if (anchorType) {
    return (
      <a {...buttonProps}>
        {icon || null}
        {
          loading && <Spinner/>
        }
        {label}
      </a>
    )
  }
  buttonProps.type = 'button';
  return (
    <button {...buttonProps}>
      {icon || null}
      {
        loading && <Spinner/>
      }
      {label}
    </button>
  )
}
