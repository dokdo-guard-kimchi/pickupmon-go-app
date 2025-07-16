import styled from "styled-components";

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
    font-size: 32px;
    font-weight: 700;
    color: #000000;
    margin-left: 20px;
    margin-top: 20px;
`;

export const TrashCountDisplay = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 20px;
    margin-top: 8px;
    padding: 8px 12px;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    border-radius: 20px;
    border: 2px solid #2e7d32;
    width: fit-content;
`;

export const TrashCountText = styled.span`
    font-size: 11px;
    font-family: 'Press Start 2P', cursive;
    color: white;
`;

export const TrashCountNumber = styled.span`
    font-size: 14px;
    font-family: 'Press Start 2P', cursive;
    color: #ffeb3b;
    font-weight: bold;
`;

export const MainCollectionWrap = styled.div<{ $hasScrolled?: boolean }>`   
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    width: 318px;
    height: 350px;
    max-height:350px;
    overflow:auto;
    overflow-x: hidden;
    box-sizing: border-box;
    position: relative;
    border-radius: 8px;

    &::-webkit-scrollbar{
        display: none;
    }

    &::after {
        content: '⬇ 스크롤하여 더보기 ⬇';
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 8px;
        font-family: 'Press Start 2P', cursive;
        color: #666;
        background: rgba(255, 255, 255, 0.8);
        padding: 4px 8px;
        border-radius: 12px;
        border: 1px solid #ccc;
        animation: bounce 2s infinite;
        pointer-events: none;
        opacity: ${props => props.$hasScrolled ? 0 : 1};
        transition: opacity 0.3s ease-out;
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
        }
        40% {
            transform: translateX(-50%) translateY(-3px);
        }
        60% {
            transform: translateX(-50%) translateY(-1px);
        }
    }
`;

export const CollectionBoxWrap = styled.div`    
    width: 146px;
    height: 155px;
    margin-bottom: 20px;
    
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
    text-align: center;
    font-weight: 500;
    margin-top: 0;
`;