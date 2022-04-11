//import { useState, useEffect } from 'react'
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";
import config from '../config/config';
import { useUser,useUserUpdate } from "../context/UserContext"; 
import NavbarDashboard from './NavbarDashboard';

const Profile = () => {
    const context_user = useUser()
    const context_userUpdate = useUserUpdate()

    const [data, setData] = useState({
        name: '',
        password: '',
        pokemon_trainer_nickname: '',
        region_of_origin: '',
        gender: '',
        age: '',
        email: '',
        trainer_class: '',
        url_photo: ''
    })

    useEffect(()=>{
        setData(context_user)
        //console.log(context_user)
    },[])

    const history = useHistory();

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const save = (event) => {
        event.preventDefault(); 
        
        fetch(`${config.BACKEND}/user/update`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data_response => { 
            if (data_response.error == null) {
                //setData({})
                context_userUpdate(data)
                //console.log(data);
                toast.success('User Updated', {
                    onClose: () => {
                        history.replace("/dashboard")
                    }
                })
            }else{
                toast.error(data_response.msj)
            }
            
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <NavbarDashboard></NavbarDashboard>
            <br></br>
            <div className="d-flex justify-content-center">
            <div className="card w-75">
            <main className="container">
                <h1>Profile</h1>
                <form onSubmit={save}>

					<div>
						<img src={data.url_photo} alt={""} style={{height:200, width:200}}/>
					</div>
                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" id="name" onChange={handleInputChange} className="form-control" value={data.name}></input>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" onChange={handleInputChange} className="form-control" value={data.password}></input>
                        </div>
                    </div>

                    

                    <div className="row g-3 align-items-center">
						<div className="form-group col-md-6">
								<label htmlFor="email" className="form-label">Email</label>
								<input type="text" name="email" id="email" onChange={handleInputChange} className="form-control" value={data.email}></input>
						</div>
                        <div className="form-group col-md-6">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" name="age" id="age" onChange={handleInputChange} className="form-control" value={data.age}></input>
                        </div>
                       
                    </div>
                    
                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="pokemon_trainer_nickname" className="form-label">Pokemon trainer nickname</label>
                            <input type="text" name="pokemon_trainer_nickname" id="pokemon_trainer_nickname" onChange={handleInputChange} className="form-control" value={data.pokemon_trainer_nickname}></input>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="region_of_origin" className="form-label">Region of origin</label>
                            <input type="text" name="region_of_origin" id="region_of_origin" onChange={handleInputChange} className="form-control" value={data.region_of_origin}></input>
                        </div>
                    </div> 

                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <div className="input-group">
                                <select name="gender" id="gender" onChange={handleInputChange} className="form-control" value={data.gender}>
                                    <option key="select" value="select">Select gender</option>
                                    <option key="male" value="male">Male</option>
                                    <option key="female" value="female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                        <label htmlFor="trainer_class" className="form-label">Trainer class</label>
                        <div className="input-group">
                            <select name="trainer_class" id="trainer_class" onChange={handleInputChange} className="form-control" value={data.trainer_class}>
                                <option key="select" value="select">Select trainer class</option>
                                <option key="battle" value="battle">Battle</option>
                                <option key="show" value="show">Show</option>
                            </select>
                        </div>
                        </div>
                    </div> 

                    <br></br>           
                    <br></br>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </main>
            </div>
            </div>
        </>
    )
}

export default Profile;
