import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axiosClient from '../plugins/axiosClient'
const UsersModal = ({open, toggle, id, editUser, setEditUser}) => {
    const [isDiploma, setIsDiploma] = useState(false)
    const addUser =(e)=> {
        e.preventDefault()
        console.log(id);
        let payload = {
            name: e.target[0].value,
            surname: e.target[1].value,
            age: +e.target[2].value,
            is_diploma: isDiploma,
            address: e.target[5].value,
        }
        if(id !== "") {
            console.log('salom');
            axiosClient.patch(`/users/update/${id}`, {...payload}).then((res)=> {
                console.log(res);
            }).catch((err)=> {
                console.log(err);
            })
            setTimeout(() => {
                window.location.reload()
                setEditUser('')
            }, 1000);
        } else {   
            axiosClient.post('/users/add', {...payload}).then((res)=> {
                console.log(res);
            }).catch((err)=> {
                console.log(err);
            })
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
    }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader>
            <h1>Add User</h1>
        </ModalHeader>
        <ModalBody>
            <form id='users' onSubmit={addUser}>
                <input type="text" placeholder='name' className='form-control my-2' defaultValue={editUser.name}/>
                <input type="text" placeholder='surname' className='form-control my-2' defaultValue={editUser.surname}/>
                <input type="number" placeholder='age' className='form-control my-2' defaultValue={editUser.age}/>
                <h4>Is Diploma?</h4>
                <input type="radio" name="is_diploma" id="yes" onClick={()=>setIsDiploma(true)}/>
                <label htmlFor="yes" className='me-2'>Yes</label>
                <input type="radio" name="is_diploma" id="no" className='ms-2' onClick={()=>setIsDiploma(false)}/>
                <label htmlFor="no">No</label>
                <input type="text" placeholder='address' className='form-control my-2' defaultValue={editUser.address}/>
            </form>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-info" type="submit" form="users">Add User</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default UsersModal
