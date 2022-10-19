import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { useNavigate } from "react-router-dom"
import { Button } from '../../../components/UI/Button';
import { IconButton } from '../../../components/UI/IconButton';
import { Modal } from '../../../components/Modal';


const Actions = (props) => {
  const { id, values } = props || {}
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`/user/${id}/edit`)
  }

  const modalProps = {
    title: 'Are you sure?',
    scale: 'sm',
    description: `Would you like to delete User: ?`,
    closeOnBackdrop: true,
    body: (({closeModal}) => {
      const handleDelete = () => {
        console.log("delete clocked")
      }

      return (
        <div className="flex mt-4">
          <Button className="mr-3"  label={'Cancel'}
            action={'default'}
            onClick={() => {
              closeModal()
            }} />
          <Button label={'Delete'} onClick={ handleDelete }/>
        </div>
      )
    })
  }

  if (typeof id == 'number') {
    return (
      <div className="flex text-right text-sm font-medium user-list-actions">
        {
          id &&
          <div className="grid grid-cols-4 gap-4">
            {/* <ShareIcon className={`h-4 w-4 cursor-pointer text-gray-400`}/> */}
            <IconButton variant="clean" title="Edit User">
              <PencilIcon className={`h-4 w-4 cursor-pointer text-gray-400`} onClick={handleEdit} />
            </IconButton>              
            <Modal {...modalProps}>
              <IconButton variant="clean" title="Delete User">
                <TrashIcon className={`h-4 w-4 cursor-pointer text-gray-400`} />
              </IconButton>
            </Modal>
          </div>
        }
      </div>
    )
  } else {
    return false;
  }
}

export default Actions
