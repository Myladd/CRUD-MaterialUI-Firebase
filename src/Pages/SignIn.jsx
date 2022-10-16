import React, {useEffect, useState} from 'react'
import { TextField, Button, Box, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import {NavLink, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {UserAuth} from "../Context/AuthContext";
import ErrorToast from "../Components/Toast/ErrorToast";
import Loading from "../Components/Loading/Loading";
import Lottie from 'lottie-react';
import loginAnime from '../assets/lottie/83168-login-success.json'
import loading from "../Components/Loading/Loading";

const SignIn = () => {
    const {signIn} = UserAuth()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = object({
        email: string().required("Please enter email").email("Invalid email"),
        password: string()
            .required("Please enter password")
            .min(6, "Password should be minimum 6 characters long"),
    })

    const onSubmit = async (values, formikHelpers) => {
        const {email, password} = values
        setIsLoading(true)
        try {
            await signIn(email, password)
            navigate('/Dashboard')
            setIsLoading(false)
        }catch (e) {
            console.log(e.message)
            setError("user not found")
            setIsLoading(false)
        }
        formikHelpers.resetForm();
    }

        const loadAnimation = {
            animationData: loginAnime,
            autoplay: true,
            loop: true,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };



    const Container = styled.div`
        width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #2980B9;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to bottom, #FFFFFF, #6DD5FA, #2980B9);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to bottom, #FFFFFF, #6DD5FA, #2980B9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


    `
    const SignUpForm = styled.div`
      width: 600px;
      padding: 20px 20px;
      display: flex;
      //border: 1px solid gray;
      border-radius: 15px;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      background-color: aliceblue;

    `
    const Title = styled.div`
        margin-bottom: 30px;
      text-align: center;
      color: #4286f4;
    `
    const LinkLogin = styled.span`
        color: #4286f4;
      margin-left: 10px;
    `
    const LottieLogin = styled.div`
      width: 50%;
        display: flex;
      justify-content: center;
      align-items: center;
    `

    return (
        <Container>
            <SignUpForm>
                <div style={{width:"50%"}}>
                    <Title>
                        <Typography variant="h4">
                            Sign In
                        </Typography>
                    </Title>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, isValid, touched, dirty }) => (
                            <Form>
                                <Field
                                    name="email"
                                    type="email"
                                    as={TextField}
                                    variant="outlined"
                                    color="primary"
                                    label="Email"
                                    fullWidth
                                    error={Boolean(errors.email) && Boolean(touched.email)}
                                    helperText={Boolean(touched.email) && errors.email}
                                />

                                <Box height={14} />
                                <Field
                                    name="password"
                                    type="password"
                                    as={TextField}
                                    variant="outlined"
                                    color="primary"
                                    label="Password"
                                    fullWidth
                                    error={Boolean(errors.password) && Boolean(touched.password)}
                                    helperText={Boolean(touched.password) && errors.password}
                                />
                                <Box height={14} />
                                <span>Don't have an account?</span>
                                <NavLink to='/Register'>
                                    <LinkLogin>Sign Uo</LinkLogin>
                                </NavLink>
                                <Box height={14} />
                                <Box height={14} />

                                {isLoading ? <Loading/> : <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    disabled={!isValid || !dirty}
                                >
                                    Sign In
                                </Button>}
                            </Form>
                        )}
                    </Formik>
                </div>
                <LottieLogin>
                    <div>
                        <Lottie
                            options={loadAnimation}
                            height={400}
                            width={400}
                         animationData={loginAnime}/>

                    </div>
                </LottieLogin>
            </SignUpForm>
            {error? <ErrorToast message={error}/>: null}
        </Container>
    )
}
export default SignIn