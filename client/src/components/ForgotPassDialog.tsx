import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from '@radix-ui/react-icons';
import { violet } from '@radix-ui/colors'
import { styled } from '@stitches/react';
import { useState } from "react";
import { onForgotPass } from "../api/helpers";

const Flex = styled('div', { display: 'flex' });

const Overlay = styled(Dialog.Overlay, {
    background: 'rgba(0 0 0 / .98)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'grid',
    placeItems: 'center',
    overflowY: 'auto',
})

const Content = styled(Dialog.Content, {
    minWidth: 300,
    background: '#121416',
    position: "relative",
    padding: 30,
    borderRadius: 4,
  });

  const IconButton = styled('button', {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: 25,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: violet.violet11,
    position: 'absolute',
    top: 10,
    right: 10,
  
    '&:hover': { backgroundColor: violet.violet4 },
    '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
  });

  const Button = styled('button', {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: '0 15px',
    fontSize: 15,
    lineHeight: 1,
    fontWeight: 500,
    height: 35,
    background: "#0d6efd",
    color: "white",
    transition: "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;",

    '&:hover': {
        color: "#fff",
        backgroundColor: "#0b5ed7",
        borderColor: "#0a58ca",
    },
    '&:focus': {
        color: '#fff',
        backgroundColor: '#0b5ed7',
        borderColor: '#0a58ca',
        boxShadow: '0 0 0 0.25rem rgb(49 132 253 / 50%)',
    }
  });
  

export function ForgotPassDialog() {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [values, setValues] = useState({
        email: ''
    })

    const onChange = (e:any) => {
        setValues({
          ...values, [e.target.name]: e.target.value
        })
        if(error){
            setError('')
          }
          if(success){
            setSuccess('')
          }
      }

     const onSubmit = async (e:any) => {
        e.preventDefault()
        try {
            await onForgotPass(values)
            setSuccess("E-mail has been sent")
        } catch (error) {
            setError(error.response.data.errors[0].msg)
        }
    }
    return (
        <Dialog.Root>
            <div className="w-75 d-flex justify-content-center mt-1">
            <Dialog.Trigger style={
            {cursor: "pointer", textAlign: "center", alignSelf: "flex-start"}
          } className="border-0 bg-transparent text-info">
                Forgot your password?
            </Dialog.Trigger>
            </div>
            <Dialog.Portal>
                <Overlay>
                    <Content>
                        <Dialog.Title>
                            Forgot your password?
                        </Dialog.Title>
                        <Dialog.Description>
                            Type your email and we will send you a reset password link.
                        </Dialog.Description>
                        <form id="forgot-pass-form" onSubmit={onSubmit}>
                            <label htmlFor="email" className="mb-1">Email</label>
                            <input id="email" type="email" name="email" placeholder="Type a valid email" className="w-100 border border-primary p-2" style={{
                                background: "#121416", color: "white"
                            }} value={values.email} onChange={onChange}></input>
                            <div className="text-danger">{error}</div>
                            <div className="text-success">{success}</div>
                            <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
                                <Button aria-label="Close" id="forgot-pass-btn">
                                    Send email
                                </Button>
                            </Flex>
                        </form>
                        <Dialog.Close asChild>
                            <IconButton>
                                <Cross2Icon />
                            </IconButton>
                        </Dialog.Close>
                    </Content>
                </Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}