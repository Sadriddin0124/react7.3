import React, { useState } from 'react'
import axiosClient from '../plugins/axiosClient'
import ModalApp from './ModalApp'
const Auth = () => {
    const [roles, setRoles] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const handleSubmit =(e)=> {
        e.preventDefault()
        let username = e.target[0].value
        let password = e.target[1].value
        axiosClient.post('/admins/login', {
            username,
            password
        }).then((res)=> {
            localStorage.setItem("token", res?.data?.token)
            setRoles(res?.data?.roles)
            if(res?.status === 202) {
                setModalVisible(true)
            }
        }).catch((err)=> {
            console.log(err);
        })
    }
  return (
    <div className='container'>
        <marquee >User pagega faqat superadmin o'ta oladi</marquee>
        <ModalApp open={modalVisible} toggle={()=>setModalVisible(false)} roles={roles}/>
      <div className="row">
        <div className="col-6 offset-3 mt-5">
            <div className="card">
                <div className="card-header">
                    <h1 className='text-center'>Authentification</h1>
                </div>
                <div className="card-body">
                    <form id='form' onSubmit={handleSubmit}>
                        <input type="text" className="form-control my-2" placeholder='Username'/>
                        <input type="password" className="form-control" placeholder='Password'/>
                    </form>
                </div>
                <div className="card-footer d-flex justify-content-center">
                    <button className="btn btn-primary" form='form' type="submit">Log in</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
