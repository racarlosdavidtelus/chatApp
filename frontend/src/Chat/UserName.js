import React, {  useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import config from '../config/config';
import { useUser, useUserUpdate } from "../context/UserContext"; 

function UserName() {
    const context_user = useUser()
    const [show, setShow] = useState(false);
    const [name,setName] = useState('');
    const context_userUpdate = useUserUpdate()
   
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const  handleChat = () => {
      
        const data = {
          name: name
        }
        context_userUpdate(data)
        setName('');
        handleClose()
        toast.success('User name changed...')
        //console.log(data)

        //aqui hago el fetch POST para guardar al usuario
        /*
        fetch(`${config.BACKEND}/user`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => { 
            if (data.error == null) {
                toast.success('User name changed...', {
                
                })
            }else{
                toast.error(data.msj)
            }
        })
        .catch(error => {
            console.log(error)
        })
        */
    }

    const handleInputChange = (event) => {
        setName(event.target.value);
    }


    return (
      <>
        <button type="button" className="btn btn-light" onClick={handleShow}>
          <i className="bi bi-person-fill"></i>{`  ${context_user.name}`}
        </button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closebutton>
            <Modal.Title>Enter your new user name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="row g-3 align-items-center">
            <div className="col-2">
              <label htmlFor="name" className="col-form-label">Name</label>
            </div>
            <div className="col-10">
              <input type="text" name="name" id="name"  onChange={handleInputChange} className="form-control"></input>
            </div>
          </div>

          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-outline-primary" onClick={handleClose}>
              Close
            </button>
            <button type="button" className="btn btn-outline-success" onClick={() => handleChat()}>
              Start Chating
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
  
export default UserName;