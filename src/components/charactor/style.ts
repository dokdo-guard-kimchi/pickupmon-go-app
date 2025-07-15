import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(45deg, #e0e0e0 0 10px, #f5f5f5 10px 20px);
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
`;

export const Card = styled.div`
  background-color: #f7f7f7;
  border: 3px solid #bdbdbd;
  box-shadow: 0 0 16px #d1d1d1, 0 0 0 8px #e0e0e0 inset;
  padding: 40px 20px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  min-height: 400px;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  
  @media (max-width: 480px) {
    padding: 30px 15px;
    max-width: 90vw;
    min-height: 300px;
  }
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
  margin-bottom: 32px;
  color: #333;
  letter-spacing: 1px;
  text-align: center;
`;

export const CharList = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  justify-content: center;
`;

export const CharButton = styled.button<{ selected: boolean }>`
  width: 100px;
  height: 100px;
  border: ${({ selected }) => (selected ? '3px solid #388e3c' : '2px solid #bdbdbd')};
  border-radius: 16px;
  background: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  color: #333;
  font-family: inherit;
  box-shadow: ${({ selected }) => (selected ? '0 0 0 4px #d6f5c9' : 'none')};
  font-size: 1rem;
  &:hover, &:focus {
    border: 3px solid #388e3c;
  }
`;

export const CharEmoji = styled.span`
  font-size: 2.5rem;
`;

export const CharLabel = styled.span`
  font-size: 1rem;
  margin-top: 8px;
`;

export const ConfirmButton = styled.button<{ enabled: boolean }>`
  width: 180px;
  padding: 14px 0;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
  font-weight: bold;
  background: ${({ enabled }) => (enabled ? '#388e3c' : '#bdbdbd')};
  color: ${({ enabled }) => (enabled ? '#fff' : '#888')};
  border: none;
  border-radius: 8px;
  cursor: ${({ enabled }) => (enabled ? 'pointer' : 'not-allowed')};
  letter-spacing: 1px;
  transition: background 0.2s, color 0.2s;
  margin-top: 130px;
`;

export const PolygonWraper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 1;
`

export const RedPoly = styled.div<{ selected?: boolean; dimmed?: boolean }>`
  width: 300px;
  height: 320px;
  clip-path: polygon(70% 0, 95% 50%, 70% 100%, 0 100%, 0 0);
  background-color: #DE6589;
  border: 5px solid #BF2E5A;
  margin: 20px;
  z-index: 10;
  position: relative;
  transition: transform 0.2s, filter 0.2s, opacity 0.2s;
  ${({ selected }) => selected && 'transform: scale(1.08);'}
  ${({ dimmed }) => dimmed && 'filter: grayscale(1); opacity: 0.5;'}
`;

export const BluePoly = styled.div<{ selected?: boolean; dimmed?: boolean }>`
  width: 300px;
  height: 320px;
  clip-path: polygon(30% 0, 100% 0, 100% 100%, 30% 100%, 5% 50%);
  background-color: #3789C3;
  border: 5px solid #065594;
  margin: 20px;
  z-index: 10;
  position: relative;
  transition: transform 0.2s, filter 0.2s, opacity 0.2s;
  ${({ selected }) => selected && 'transform: scale(1.08);'}
  ${({ dimmed }) => dimmed && 'filter: grayscale(1); opacity: 0.5;'}
`;

export const ImgWraper = styled.div<{ selectedGirl?: boolean; selectedBoy?: boolean; dimBoy?: boolean; dimGirl?: boolean }>`
  z-index: 20;
  position: absolute;
  bottom: 200px;
  display: flex;
  img{
    width: 200px;
    transition: transform 0.2s, filter 0.2s, opacity 0.2s;
  }
  ${({ selectedGirl }) => selectedGirl && `
    img:nth-child(1) {
      transform: scale(1.08);
    }
  `}
  ${({ selectedBoy }) => selectedBoy && `
    img:nth-child(2) {
      transform: scale(1.08);
    }
  `}
  ${({ dimBoy }) => dimBoy && `
    img:nth-child(2) {
      filter: grayscale(1);
    }
  `}
  ${({ dimGirl }) => dimGirl && `
    img:nth-child(1) {
      filter: grayscale(1);
    }
  `}
`;