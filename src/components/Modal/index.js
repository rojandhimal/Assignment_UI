import React from 'react';
import {Dialog, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import {Fragment, useEffect, useState} from 'react'

export const Modal = (props) => {
  const {
    isOpen: defaultOpen = false,
    children,
    disabled = false,
    title,
    description,
    body,
    scale = 'fullscreen',
    closeOnBackdrop = true,
    onClose,
    hideCloseButton = false
  } = props || {}

  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    defaultOpen && openModal()
  }, [defaultOpen])

  const closeModal = () => {
    setIsOpen(false)
    if(onClose){
      onClose()
    }
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const sizeMap = {
    sm: 'inline-block w-full max-w-md',
    md: 'inline-block w-full max-w-[1032px]',
    fullscreen: 'fixed inset-0'
  }
  const scaleClass = sizeMap[scale]

  return (
    <>
      <div onClick={!disabled && openModal}>{children}</div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeOnBackdrop ? closeModal : () => {
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-80"
              leave="ease-in duration-200"
              leaveFrom="opacity-80"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-300 opacity-75"/>
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`${scaleClass} p-6 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}
                data-testid="modal-child"
              >
                <div className='flex flex-col h-full'>
                  {!hideCloseButton &&
                    <div className='flex justify-between'>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <XIcon className='w-4 h-4 cursor-pointer' onClick={closeModal}/>
                    </div>
                  }
                  <div className="flex mt-2">
                    <p className="text-sm text-gray-500">
                      {description}
                    </p>
                  </div>

                  {body({closeModal, isOpen, ...props })}

                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
