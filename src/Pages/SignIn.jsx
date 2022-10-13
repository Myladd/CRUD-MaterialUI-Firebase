import React, {useState} from 'react'
import { TextField, Button, Box, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import styled from "styled-components";
import {UserAuth} from "../Context/AuthContext";
import ErrorToast from "../Components/Toast/ErrorToast";

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

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

    const onSubmit = () => {

    }


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
      width: 400px;
      padding: 20px 20px;
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

    return (
        <Container>
            <SignUpForm>
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
                            <Box height={14} />
                            <p>Don't have an account?</p>


                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                disabled={!isValid || !dirty}
                            >
                                Sign In
                            </Button>
                        </Form>
                    )}
                </Formik>
            </SignUpForm>
            {error? <ErrorToast/>: null}
        </Container>
    )
}
export default SignIn