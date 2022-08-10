import { useState} from "react"


import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: ''
    ,confirmPassword: ''
}

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
 

import {SignUpContainer, H2} from  './sign-up-form.styles'
const SignUpForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email,password,confirmPassword} = formFields;
    

    console.log(formFields)
    const resetFields =()=>{
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async(event)=>{
        
        event.preventDefault();
         if(password !== confirmPassword){
           alert('the passwrod and confirmation password is not mathes')
           return
         }
         try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            
            
            
            await createUserDocumentFromAuth(user, {displayName})
            resetFields()
         }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('this userName and Email are already in use')
            }else{
                console.log('the email and password dose not match', error)
            }
            
         }
        


    }
    const handleChange =(event)=>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value})

    }

    return(
        <SignUpContainer>
            <H2>Don't have an account?</H2>
            <span>sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label="Display Name" type="text"  required onChange={handleChange} name="displayName" value={displayName}/>
                
                <FormInput label="Email"  type="email" required onChange={handleChange} name="email" value={email}/>
                
                <FormInput label="Password" type="password" required  onChange={handleChange} name="password" value={password}/>
                
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">SignUp</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm