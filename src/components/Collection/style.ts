import styled, { keyframes, css } from "styled-components";

export const Wrap = styled.div` 
    display: flex;
    justify-content: center; 
    width: 100%;
    height: 100%;
`;

export const MainWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 393px;
    height: 852px;
    border: 1px solid;
`;

export const HeaderWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 160px;
`;

export const Title = styled.span`
    margin-top: 3%;
    font-size: 50px;
    font-weight: 700;
    color: #000000;
    margin-left: 20px;
    margin-top: 20px;
`;

export const MainCollectionWrap = styled.div`   
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    width: 318px;
    height: 500px;
    border: 1px solid;
 
    box-sizing: border-box;
`;

export const CollectionBoxWrap = styled.div`    
    width: 146px;
    height: 155px;
    
    img {
        width: 146px;
        height: 130px;
        border: 1px solid black;
        margin: 0;
        display: block;
    }
`;

export const CollectionName = styled.div`
    width: 146px;
    height: 25px;
    margin-top: 0;
`;