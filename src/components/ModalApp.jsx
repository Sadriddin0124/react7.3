import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axiosClient from '../plugins/axiosClient'
import { useNavigate } from 'react-router-dom'
const ModalApp = ({roles, open, toggle}) => {
    const navigate = useNavigate()
    const handleRole =(e)=> {
        e.preventDefault()
        let role = e.target[0].value
        axiosClient.post('/admins/set-role', {
            role: role
        }).then((res)=> {
            console.log(res);
            if(res.status === 202) {
                if(role === 'admin') {
                    navigate('/users')
                }
                else if(role === 'superadmin') {
                    navigate('/users')
                }
            }
        }).catch((err)=> {
            console.log(err);
        })
        toggle()
    }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader>
            <h1>Select your role</h1>
        </ModalHeader>
        <ModalBody>
            <form id='role' onSubmit={handleRole}>
                <select className='form-control'>
                    <option value="" hidden>Select your role</option>
                    {
                        roles?.map((item, index)=> <option key={index} value={item}>{item}</option>)
                    }
                </select>
            </form>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-outline-primary" form="role" type="submit">Save</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ModalApp
