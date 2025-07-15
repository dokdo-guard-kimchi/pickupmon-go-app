import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  min-height: unset;
  overflow: hidden;
  background: repeating-linear-gradient(45deg, #e0e0e0 0 10px, #f5f5f5 10px 20px);
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Card = styled.div`
  background: #f7f7f7;
  border: 4px solid #bdbdbd;
  border-radius: 18px;
  box-shadow: 0 0 0 6px #e0e0e0, 0 0 0 12px #bdbdbd;
  max-width: 393px;
  width: 393px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 852px;
  min-height: unset;
  justify-content: flex-start;
  position: relative;
`;

export const AvatarWrapper = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #bdbdbd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  box-shadow: 0 0 0 4px #e0e0e0;
`;

export const Avatar = styled.img`
  width: 90px;
  height: 110px;
  image-rendering: pixelated;
`;

export const Nickname = styled.div`
  font-size: 1.1rem;
  margin-bottom: 18px;
  font-family: inherit;
`;

export const ExpBarArea = styled.div`
  width: 100%;
  margin-bottom: 18px;
  position: relative;
`;

export const LevelRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  position: absolute;
  left: 0;
  top: -22px;
`;

export const LevelLabel = styled.span`
  font-size: 1.1rem;
  font-family: inherit;
`;

export const LevelValue = styled.span`
  font-size: 1.3rem;
  font-family: inherit;
  font-weight: bold;
`;

export const ExpBar = styled.div`
  width: 100%;
  height: 18px;
  background: #e0e0e0;
  border: 2px solid #bdbdbd;
  border-radius: 12px;
  overflow: hidden;
  margin: 20px 0;
`;

export const ExpBarFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background: linear-gradient(90deg, #7ec6af 60%, #388e3c 100%);
  border-radius: 12px 0 0 12px;
  transition: width 0.3s;
`;

export const ExpText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  font-family: inherit;
  font-weight: bold;
  margin-top: 6px;
`;

export const LevelBar = styled.div`
  width: 100%;
  height: 18px;
  background: #e0e0e0;
  border: 2px solid #bdbdbd;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
  position: relative;
`;

export const LevelBarFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background: linear-gradient(90deg, #7ec6af 60%, #388e3c 100%);
  border-radius: 8px 0 0 8px;
  transition: width 0.3s;
`;

export const LevelText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-family: inherit;
  font-weight: bold;
  margin-bottom: 18px;
`;

export const Skills = styled.div`
  display: flex;
  gap: 10px;
  margin: 18px 0 28px 0;
  width: 100%;
  justify-content: space-between;
`;

export const SkillButton = styled.button`
  flex: 1 1 0;
  background: #e0e0e0;
  color: #222;
  border: 2px solid #bdbdbd;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
  font-weight: bold;
  cursor: pointer;
  margin: 0 2px;
  box-shadow: 0 2px 0 #bdbdbd;
  transition: background 0.2s, color 0.2s, border 0.2s;
  text-shadow: 1px 1px 0 #fff;
  letter-spacing: 1px;
  &:hover, &:focus {
    background: #fff;
    color: #388e3c;
    border: 2px solid #388e3c;
  }
  & > div:first-child {
    white-space: pre-line;
  }
`;

export const StartButton = styled.button`
  width: 100%;
  background: #388e3c;
  color: #fff;
  border: 3px solid #bdbdbd;
  border-radius: 10px;
  padding: 18px 0;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
  font-weight: normal;
  cursor: pointer;
  margin-top: 10px;
  letter-spacing: 1px;
  transition: background 0.2s, color 0.2s, border 0.2s;
  box-shadow: 0 0 6px #e0e0e0, 0 2px 0 #bdbdbd;
  &:hover, &:focus {
    background: #e0e0e0;
    color: #388e3c;
    border: 3px solid #388e3c;
  }
`;
