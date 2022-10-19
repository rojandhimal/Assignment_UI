import React from 'react';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {FilterIcon} from '@heroicons/react/outline'
import { getInput } from '../../../components/UI/input'
import { IconButton } from '../../../components/UI/IconButton'


const Filters = (props) => {
  const { inputs, formik, type } = props || {}

  const types = {
    simple: {
      buttonClass: 'px-0',
      iconClass: 'h-5 w-5',
    },
    default: {
      buttonClass: 'border border-gray-300 shadow-sm rounded bg-white hover:bg-gray-50',
      iconClass: 'h-4 w-4'
    },
  }

  const { buttonClass, iconClass } = types[type] || types.default

  const renderInputs = inputs.map((item, index) => {
    const inputProps = {
      ...item,
      formik
    }
    return <Fragment key={index}>{getInput(inputProps)}</Fragment>
  })

  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          <Popover.Button
            className={`${open ? '' : 'text-opacity-90'} ${buttonClass} inline-flex items-center px-3 focus:outline-none mr-4 h-full`}
          >
            <IconButton variant="clean" title="Filter">
              <FilterIcon className={iconClass}/>
            </IconButton>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform right-0 sm:px-0 lg:max-w-xl">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                  {renderInputs}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default Filters
