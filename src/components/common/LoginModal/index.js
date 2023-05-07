import { yupResolver } from "@hookform/resolvers/yup";
import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup"


const SignupSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required()
})

const SigninSchema = yup.object().shape({
    name: yup.string().required(),
    displayName: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required()
})

function LoginModal() {
    const [show, setShow] = useState(false);
    const [signinForm, setSigninForm] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ resolver: yupResolver(signinForm ? SignupSchema : SigninSchema) });

    const handleClose = () => {
        setShow(false)
        setSigninForm(false)
        reset()
    }

    const handleShow = () => {
        setShow(true)
        setSigninForm(false)
        reset()
    }

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
        reset()
    }

    return (
        <>
            <button type="button" className="btn btn-danger p-2 px-3" onClick={handleShow}> SIGN IN </button>
            <Modal className="mt-5" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1 className="modal- fs-5 text-center">{signinForm ? "SIGN IN" : "SIGN UP"}</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {signinForm ?
                     ( <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-3'>
                                <label className="form-label">User name</label>
                                <input className="form-control" {...register("name")} />
                                {errors.name && <p>{errors.name.message}</p>}
                            </div>
                            <div className='mb-3'>
                                <label className="form-label">Password</label>
                                <input className="form-control" {...register("password")} />
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>
                            <div className='d-grid'>
                                <button type="submit" className='btn btn-danger my-2' >SIGN IN</button>
                                <button type="button" className='btn my-2'  onClick={() => { 
                                    setSigninForm(false) ;
                                    reset()
                                }} >SIGN UP</button>
                            </div>
                        </form> ) :
                        (<form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">User name</label>
                                <input className="form-control" {...register("name")} />
                                {errors.name && <p>{errors.name.message} </p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Display name</label>
                                <input className="form-control" {...register("displayName")} />
                                {errors.displayName && <p>{errors.displayName.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input className="form-control" {...register("password")} />
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input className="form-control" {...register("confirmPassword")} />
                                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-danger my-2">SIGN UP</button>
                                <button type="button" className="btn my-2" onClick={() => {
                                    setSigninForm(true);
                                    reset()
                                }}>SIGN IN</button>
                            </div>

                        </form>)

                    }

                </Modal.Body>

            </Modal>
        </>
    );
}

export default LoginModal;
