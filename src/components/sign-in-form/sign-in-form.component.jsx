import { useState } from "react"


import FormInput from "../form-input/form-input.component";
import Button , {BUTTON_TYPE_CLASSES} from "../button/button.component";


const defaultFormFields = {
    
    email: '',
    password: ''
    
}

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
 

import {SignInContainer, H2, ButtonContainer} from './sign-in-form.styles'
const SignInForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email,password} = formFields;

    
    console.log(formFields)

    const resetFields =()=>{
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async()=>{
         await signInWithGooglePopup()
    }

    const handleSubmit = async(event)=>{

        event.preventDefault();
         
         try{
            await signInAuthUserWithEmailAndPassword(email, password)
            
            resetFields()
         }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                alert('incorrect passwrod for email address')
                break;
                case 'auth/user-not-found':
                alert('no user associated with this email address')
                break;
                default:
                    console.log(error)
            }

            
         }
        


    }
    const handleChange =(event)=>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value})

    }

    return(
        <SignInContainer>
            <H2>Already have an account</H2>
            <span>sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                
                
                <FormInput label="Email"  type="email" required onChange={handleChange} name="email" value={email}/>
                
                <FormInput label="Password" type="password" required  onChange={handleChange} name="password" value={password}/>
                
               
                <ButtonContainer>
                <Button type="submit">SignIn</Button>
                <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </ButtonContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm 