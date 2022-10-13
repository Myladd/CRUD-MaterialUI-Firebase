import React from 'react'
import styled from "styled-components";

const TextError = (props) => {
    const Paraf = styled.p`
        color: red;
    `
    return (
        <Paraf>
            <p>
                {props.children}
            </p>
        </Paraf>
    )
}
export default TextError