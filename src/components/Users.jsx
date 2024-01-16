import React, { useEffect, useState } from 'react'
import axiosClient from '../plugins/axiosClient'
import UsersModal from './UsersModal'
import DeleteModal from './DeleteModal'

const Users = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [users, setUsers] = useState([])
  const [id, setId] = useState('')
  const [editUser, setEditUser] = useState({})
    useEffect(()=>{
        axiosClient.get('/users').then((res)=>{
            setUsers(res?.data?.users)
            console.log(res.data.users);
        }).catch((err)=> {
            console.log(err);
        })
    },[])
    const openModal =()=> {
      setModalVisible(true)
    }
    const deleteById =(id)=> {
      setId(id)
      setDeleteModal(true)
    }
    const editModal =(id)=> {
      axiosClient.get(`/users/${id}`).then((res)=> {
        console.log(res.data.user);
        setEditUser(res?.data?.user)
    })
      setId(id)
      setModalVisible(true)
    }
  return (
    <div className='container'>
      <div className="row">
      <DeleteModal open={deleteModal} toggle={()=>setDeleteModal(false)} id={id}/>
      <UsersModal open={modalVisible} toggle={()=>setModalVisible(false)} id={id} editUser={editUser} setEditUser={setEditUser}/>
      </div>
      <div className="row">
        <div className="col-8 offset-2">
        <button className="btn btn-success my-2 mt-5" onClick={openModal}>Add User</button>
          <table className="table-bordered table table-striped">
            <thead>
              <tr>
                <th>T/R</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>IS Diploma</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((item,index)=> {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.age}</td>
                    <td>{item.is_diploma ? "Bor" : "Yo'q"}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn btn-info mx-2" onClick={()=>editModal(item._id)}>Edit</button>
                      <button className="btn btn-danger" onClick={()=>deleteById(item._id)}>Delete</button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users
