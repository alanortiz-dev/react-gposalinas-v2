import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Login.css';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from './components/Input';
import Item from './components/Item';
import Button from '../../commons/RegularButton';
import ModalError from '../../commons/ModalError';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 2,
    color: '#fff',
  },
}));

let localstorageData = localStorage.getItem('account')

let lsd = JSON.parse(localstorageData)

const Login = () => {

    const classes = useStyles();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLogin, setIsLogin ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ hasErrors, setHasErrors ] = useState(false);

    const open = true;

    const [ errors, setErrors ] = useState({
        usernameError: false,
        passwordError: false
    })

    function handleChange(name, value) {
        switch(name) {
            case 'username':
                setErrors({ usernameError: false, passwordError: false });
                setHasErrors(false);
                setUsername(value);
                break;
            case 'password':
                setErrors({ usernameError: false, passwordError: false });
                setHasErrors(false);
                setPassword(value);
                break;
            default: 
            console.log('no hay valores')
        }
    }

    function showErrors() {
        setHasErrors(true);
        setErrors({ usernameError: true, passwordError: true })
    }

    function stopIsLoading() {
        setIsLoading(false);
        showErrors();
    }

    function ifMatch(user, pass) {
        if(user === 'gposalinas' && pass === '123456' ||
            user === lsd.username && 
            pass === lsd.password ) {
            let ac = {user, pass, firstName: 'Diego'}
            let account = JSON.stringify(ac)
            localStorage.setItem('account', account)
            setTimeout(() => setIsLogin(true), 2000)
        } else {
           setTimeout(() => stopIsLoading(), 2000)
        }
    }

    function handleOnClick() {
        setIsLoading(true);
        let login = { username, password }
        if(login) {
            ifMatch(username, password)
        }
    }

    function clearErrorModal() {
        setHasErrors(false);
        setErrors({ usernameError: false, passwordError: false })
    }

    let params = 
        errors.usernameError === false &&
        errors.passwordError === false
    ;

    return (
        <>

        { isLogin && <Redirect to='/home' /> }

            <div className='LoginContainer'>
                <div className='LoginContent'>
                    <div className='Login'>
                        <div className='LoginHigher' />
                        <div className='LoginLower'>
                        <img src="https://pbs.twimg.com/profile_images/999420356585705472/9Q7akHEo_400x400.jpg" title="avatar" alt="" /> 

                            { hasErrors &&
                                <ModalError
                                    title='¡Error!'
                                    text="Usuario o contraseña incorrectos"
                                    handleOnClick={clearErrorModal}
                                />
                            }
                                
                                <div className='ItemUserLogin'>
                                    <Item text='Usuario' />
                                    <Input
                                        attribute={{
                                            name: 'username',
                                            inputType: 'text',
                                            ph: ''
                                        }}
                                        handleChange={handleChange}
                                        param={errors.usernameError}
                                    />
                                </div>
                                <div className='ItemPasswordLogin'>
                                    <Item text='Contraseña' />
                                    <Input
                                        attribute={{
                                            name: 'password',
                                            inputType: 'password',
                                            ph: ''
                                        }}
                                        handleChange={handleChange}
                                        param={errors.passwordError}
                                    />
                                </div>

                                <Button 
                                    text='Iniciar sesión'
                                    handleOnClick={handleOnClick}
                                    param={params}
                                />

                      

                            { isLoading &&
                                <Backdrop open={open} className={classes.backdrop}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            }
                          
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;