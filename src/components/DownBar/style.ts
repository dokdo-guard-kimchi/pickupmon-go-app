import styled, { keyframes, css } from "styled-components";


export const MainWrap = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
    position:relative;
    top:210px;
    width:393px;
    height:80px;
    border: 1px solid;
`
export const Box = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100%;
    background-color:'#F5F5E5';
    &&:hover{
        background-color: #F2F2F2;
        cursor: pointer;
    }
    
`