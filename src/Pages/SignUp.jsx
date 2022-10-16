import React, {useState} from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import styled from "styled-components";
import {UserAuth} from "../Context/AuthContext";
import ErrorToast from "../Components/Toast/ErrorToast";
import Loading from "../Components/Loading/Loading";
import signUpAnime from "../assets/lottie/106680-login-and-sign-up.json";
import Lottie from "lottie-react";

const SignUp = () => {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    const validationSchema = object({
        email: string().required("Please enter email").email("Invalid email"),
        password: string()
            .required("Please enter password")
            .min(6, "Password should be minimum 6 characters long"),
        confirmPassword: string()
            .required("Please enter password")
            .min(6, "Password should be minimum 6 characters long")
    })


    const {createUser} = UserAuth()

    const onSubmit = async (values, formikHelpers) => {
        const {email, password, confirmPassword} = values
        setIsLoading(true)
        if (password === confirmPassword) {
            try {
                await createUser(email, password)
                navigate('/Dashboard')
                setIsLoading(false)

            }catch (e) {
                console.log(e)
                setError("Email already in use!")
                setIsLoading(false)

            }
        }else {
            setError("Wrong Password!")
            setIsLoading(false)
        }

        console.log(values);
        console.log(email, password)
    }

    const loadAnimation = {
        animationData: signUpAnime,
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
      width: 800px;
      padding: 20px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
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
    return (
        <Container>
            <SignUpForm>
                <div style={{width: "50%"}}>
                    <Title>
                        <Typography variant="h4">
                            Sign Up
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
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    as={TextField}
                                    variant="outlined"
                                    color="primary"
                                    label="confirm password"
                                    fullWidth
                                    error={Boolean(errors.confirmPassword) && Boolean(touched.confirmPassword)}
                                    helperText={Boolean(touched.confirmPassword) && errors.confirmPassword}
                                />
                                <Box height={14} />
                                <span>Already have an account</span>
                                <NavLink to='/'>
                                    <LinkLogin>Login</LinkLogin>
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
                                    Sign Up
                                </Button>}
                            </Form>
                        )}
                    </Formik>
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Lottie
                        options={loadAnimation}
                        height={300}
                        width={300}
                        animationData={signUpAnime}/>
                </div>
            </SignUpForm>
            {error? <ErrorToast message={error}/>: null}
        </Container>
    )
}
export default SignUp