import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {SignInContainer, ButtonsContainer} from './sign-in.styles'

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();      
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect Password');
                    break;

                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                    
                default:
                    console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <SignInContainer>
          <h2>Already have an account?</h2>
          <span>Sign in with your email and password</span>
          <form onSubmit= { handleSubmit }>    
            <FormInput
                label = 'Email'
                type = 'email'
                required
                onChange = {handleChange}
                name = 'email'
                value = {email}
            />
    
            <FormInput
                label='Password'
                type = 'password'
                required
                onChange = {handleChange}
                name = 'password'
                value = {password}
            />

            <ButtonsContainer>
                <Button type='submit'>Sign In</Button>
                <Button
            buttonTypes={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
                    Google sign in
                </Button>
            </ButtonsContainer>
          </form>
        </SignInContainer>
      );
}

export default SignIn;