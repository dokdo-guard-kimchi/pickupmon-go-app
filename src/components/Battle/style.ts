import styled, { keyframes, css } from "styled-components";

interface HpProps {
    $hpPercentage: number;
}

interface SkillProps {
    $disabled: boolean;
}

interface AnimationProps {
    $animation: string;
}

interface BattleMessageProps {
    $type: 'attack' | 'victory';
}

// 애니메이션 키프레임 정의
const purifyAnimation = keyframes`
    0% { transform: scale(1) rotate(0deg); filter: brightness(1); }
    25% { transform: scale(1.1) rotate(5deg); filter: brightness(1.5) hue-rotate(180deg); }
    50% { transform: scale(1.2) rotate(-5deg); filter: brightness(2) hue-rotate(270deg); }
    75% { transform: scale(1.1) rotate(3deg); filter: brightness(1.5) hue-rotate(90deg); }
    100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
`;

const punchAnimation = keyframes`
    0% { transform: translateX(0) scale(1); }
    25% { transform: translateX(-10px) scale(1.1); }
    50% { transform: translateX(15px) scale(1.2) rotate(5deg); }
    75% { transform: translateX(-5px) scale(1.1); }
    100% { transform: translateX(0) scale(1); }
`;

const crushAnimation = keyframes`
    0% { transform: scale(1) rotate(0deg); }
    20% { transform: scale(1.3) rotate(10deg); }
    40% { transform: scale(0.8) rotate(-15deg); }
    60% { transform: scale(1.4) rotate(8deg); }
    80% { transform: scale(0.9) rotate(-5deg); }
    100% { transform: scale(1) rotate(0deg); }
`;

const pickupAnimation = keyframes`
    0% { transform: translateY(0) scale(1); }
    25% { transform: translateY(-20px) scale(1.1); }
    50% { transform: translateY(-30px) scale(1.2) rotate(10deg); }
    75% { transform: translateY(-15px) scale(1.1); }
    100% { transform: translateY(0) scale(1); }
`;

const dirtyAnimation = keyframes`
    0% { transform: scale(1); filter: hue-rotate(0deg); }
    25% { transform: scale(1.1) skewX(5deg); filter: hue-rotate(60deg); }
    50% { transform: scale(1.2) skewX(-10deg); filter: hue-rotate(120deg); }
    75% { transform: scale(1.1) skewX(3deg); filter: hue-rotate(180deg); }
    100% { transform: scale(1); filter: hue-rotate(0deg); }
`;

const smellAnimation = keyframes`
    0% { transform: scale(1); opacity: 1; }
    25% { transform: scale(1.1); opacity: 0.7; }
    50% { transform: scale(1.3); opacity: 0.5; }
    75% { transform: scale(1.2); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
`;

const toxicAnimation = keyframes`
    0% { transform: scale(1) rotate(0deg); filter: hue-rotate(0deg) saturate(1); }
    25% { transform: scale(1.2) rotate(90deg); filter: hue-rotate(90deg) saturate(2); }
    50% { transform: scale(1.4) rotate(180deg); filter: hue-rotate(180deg) saturate(3); }
    75% { transform: scale(1.3) rotate(270deg); filter: hue-rotate(270deg) saturate(2); }
    100% { transform: scale(1) rotate(360deg); filter: hue-rotate(360deg) saturate(1); }
`;

const getAnimation = (animationType: string) => {
    switch(animationType) {
        case 'purify': return css`animation: ${purifyAnimation} 1s ease-in-out;`;
        case 'punch': return css`animation: ${punchAnimation} 1s ease-in-out;`;
        case 'crush': return css`animation: ${crushAnimation} 1s ease-in-out;`;
        case 'pickup': return css`animation: ${pickupAnimation} 1s ease-in-out;`;
        case 'dirty': return css`animation: ${dirtyAnimation} 1s ease-in-out;`;
        case 'smell': return css`animation: ${smellAnimation} 1s ease-in-out;`;
        case 'toxic': return css`animation: ${toxicAnimation} 1s ease-in-out;`;
        default: return '';
    }
};

export const MainWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

export const WebAppConteainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 399px;
    height: 852px;
    border: 1px solid black;
    background-color: white;
`;

export const TurnIndicator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 40px;
    background-color: #838383;
    color: white;
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    font-size: 12px;
    border-radius: 20px;
    margin-bottom: 20px;
`;

export const TrashWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    width: 412px;
    height: 260px;
`;

export const BorderBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    height: 80px;
    border: 3px solid rgba(0, 0, 0, 0.52);
    border-radius: 0px 0px 0px 10px;
    margin-left: 5%;
`;

export const UserWrapper = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    width: 412px;
    height: 230px;
    
    img:nth-child(2) {
        position: relative;
        left: 5%;
        bottom:10%;
        z-index: 0;
    }
`;

export const ImgWrapper = styled.div`
    display: flex;
    align-items: end;
    justify-content: end;
    width: 412px;
    height: 130px;
    
    img {
        z-index: 1;
        position: relative;
        bottom: 20%;
        right: 2%;
    }
`;

export const AnimatedUser = styled.div<AnimationProps>`
    ${props => getAnimation(props.$animation)}
`;

export const AnimatedTrash = styled.div<AnimationProps>`
    position: relative;
    left: 32%;
    bottom: 28%;
    z-index: 2;
    ${props => getAnimation(props.$animation)}
`;

export const UserWrapperImg = styled.div`
    height: 230px;
    width: 130px;
`;

export const UserWrapperNameHp = styled.div`
    width: 220px;
    height: 230px;
`;

export const BorderBoxHeader = styled.div`
    display: flex;
    justify-content: start;
    padding-left: 11%;
    width: 250px;
    height: 25px;
    gap: 10px;
`;

export const BorderBoxHeaderName = styled.span`
    display: flex;
    align-items: center;
    color: #838383;
    font-size: 18px;
`;

export const HpText = styled.span`
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    color: #838383;
`;

export const Lv = styled.span`
    display: flex;
    align-items: center;
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    color: #838383;
    font-size: 9px;
`;

export const HpWrapper = styled.div`
    display: flex;
    width: 90%;
    height: 17px;
    background-color: #E8E8E8;
`;

export const Hp = styled.div<HpProps>`
    width: ${props => props.$hpPercentage}%;
    height: 100%;
    background-color: #14FE2B;
    transition: width 0.3s ease;
`;

export const HpNumber = styled.div`
    display: flex;
    justify-content: start;
    padding-left: 13%;
    align-items: center;
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    font-size: 11px;
    width: 250px;
    height: 30px;
    color: #838383;
`;

export const SkillBoxWrap = styled.div`
    padding-top: 5px;
    width: 394px;
    height: 361px;
    border: 3px solid #838383;
    border-bottom: none;
    border-radius: 15px 15px 0px 0px;
`;

export const SkiilBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 382px;
    height: 348px;
    border: 3px solid #838383;
    border-radius: 15px 15px 0px 0px;
    border-bottom: none;
`;

export const Skills = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 322px;
    height: 261px;
    gap: 20px;
`;

export const Skill = styled.div<SkillProps>`
    display: flex;
    width: 148px;
    height: 101px;
    border: 1px solid #838383;
    border-radius: 12px;
    cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.2s ease;
    opacity: ${props => props.$disabled ? 0.5 : 1};
    
    &:hover {
        background-color: ${props => props.$disabled ? 'transparent' : '#f0f0f0'};
        transform: ${props => props.$disabled ? 'none' : 'scale(1.05)'};
    }
    
    &:active {
        transform: ${props => props.$disabled ? 'none' : 'scale(0.95)'};
    }
`;

export const SkillNumber = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    font-size: 14px;
    color: #838383;
    font-weight: bold;
    padding-top: 8px;
`;

export const SkillContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
`;

export const SkillName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    font-size: 12px;
    color: black;
    margin-bottom: 5px;
`;

export const SkillDmg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    font-size: 10px;
    color: black;
`;

export const SkillUses = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    font-size: 8px;
    color: #666;
    margin-top: 3px;
`;

export const BattleMessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const BattleMessage = styled.div<BattleMessageProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 200px;
    background-color: ${props => props.$type === 'victory' ? '#FFD700' : '#f8f8f8'};
    border: 3px solid #838383;
    border-radius: 15px;
    padding: 20px;
    animation: fadeIn 0.5s ease-in;
    
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
`;

export const AttackerName = styled.div`
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    font-size: 16px;
    color: #333;
    margin-bottom: 15px;
    font-weight: bold;
`;

export const SkillInfo = styled.div`
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    font-size: 14px;
    color: #666;
    text-align: center;
    line-height: 1.5;
`;

export const VictoryText = styled.div`
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    font-size: 18px;
    color: #FF6B00;
    margin-bottom: 15px;
    font-weight: bold;
    text-align: center;
`;

export const ExpGain = styled.div`
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    font-size: 14px;
    color: #00AA00;
    margin-bottom: 20px;
    font-weight: bold;
`;

export const ResetButton = styled.button`
    padding: 15px 30px;
    background-color: #14FE2B;
    border: 2px solid #838383;
    border-radius: 10px;
    font-family: 'Press Start 2P', cursive, Arial, sans-serif;
    font-size: 12px;
    color: #838383;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: #0FD123;
        transform: scale(1.05);
    }
    
    &:active {
        transform: scale(0.95);
    }
`;