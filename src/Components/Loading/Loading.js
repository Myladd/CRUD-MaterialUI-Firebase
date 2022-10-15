import React from "react"
import spin from '../../assets/Rolling-1s-200px.gif'
import styled from "styled-components";

const Loading = () => {
    const Load = styled.div`
        display: flex;
      justify-content: center;
    `
    return (
        <Load>
            <img src={spin} alt="loading" width='60px'/>
        </Load>

    )
}
export default Loading