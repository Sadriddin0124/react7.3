import React from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import axiosClient from '../plugins/axiosClient'

const DeleteModal = ({ toggle, open, id}) => {
    const deleteUser =()=> {
        axiosClient.delete(`/users/${id}`)
        setTimeout(()=>{
            window.location.reload()
        }, 1000)
    }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
            <h1>Are you sure you want to delete?</h1>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-info" onClick={toggle}>cancel</button>
            <button className="btn btn-danger" onClick={deleteUser}>delete</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default DeleteModal
