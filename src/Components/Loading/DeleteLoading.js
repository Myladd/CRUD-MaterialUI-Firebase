import React from "react"
import pulse from '../../assets/Pulse-0.7s-200px.svg'
import styled from "styled-components";

const DeleteLoading = () => {
    const Load = styled.div`
      width: 100%;
        display: flex;
      justify-content: center;
    `
    return (
        <Load>
            <img src={pulse} alt="loading" width='40px'/>
        </Load>

    )
}
export default DeleteLoading