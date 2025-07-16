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
  
  @media screen and (max-width: 393px) and (max-height: 852px) {
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
  }
`;

export const Card = styled.div`
  background: #f7f7f7;
  border: 4px solid #bdbdbd;
  border-radius: 18px;
  box-shadow: 0 0 0 6px #e0e0e0, 0 0 0 12px #bdbdbd;
  max-width: 393px;
  width: 393px;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 852px;
  min-height: unset;
  justify-content: flex-start;
  position: relative;
  box-sizing: border-box;
  
  @media screen and (max-width: 393px) and (max-height: 852px) {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-width: none;
    border-radius: 0;
    border: none;
    box-shadow: none;
    padding: 25px 20px 15px 20px;
    overflow-y: auto;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 3px solid #bdbdbd;
`;

export const Title = styled.h1`
  font-size: 1.3rem;
  color: #333;
  margin: 0;
  font-family: inherit;
`;

export const GoldDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 2px solid #bdbdbd;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 2px 0 #bdbdbd;
`;

export const GoldIcon = styled.span`
  color: #ffc107;
  font-size: 1rem;
`;

export const GoldAmount = styled.span`
  font-size: 1rem;
  color: #333;
  font-weight: bold;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: #e0e0e0;
  color: #333;
  border: 2px solid #bdbdbd;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 2px 0 #bdbdbd;
  transition: all 0.2s;
  
  &:hover {
    background: #fff;
    color: #388e3c;
    border-color: #388e3c;
  }
`;

export const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
  margin-top: 10px;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
`;

export const ItemCard = styled.div`
  background: #fff;
  border: 3px solid #bdbdbd;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 0 0 3px #e0e0e0;
  transition: all 0.2s;
  
  &:hover {
    border-color: #388e3c;
    transform: translateY(-2px);
    box-shadow: 0 2px 0 3px #e0e0e0;
  }
`;

export const ItemIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #f0f0f0;
  border: 2px solid #bdbdbd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

export const ItemName = styled.div`
  font-size: 0.9rem;
  color: #333;
  text-align: center;
  font-weight: bold;
  white-space: pre-line;
`;

export const ItemDescription = styled.div`
  font-size: 0.7rem;
  color: #666;
  text-align: center;
  line-height: 1.2;
`;

export const ItemPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  color: #ff9800;
  font-weight: bold;
`;

export const BuyButton = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) => disabled ? '#ccc' : '#388e3c'};
  color: #fff;
  border: 2px solid ${({ disabled }) => disabled ? '#999' : '#bdbdbd'};
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.8rem;
  font-family: inherit;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  box-shadow: 0 2px 0 ${({ disabled }) => disabled ? '#999' : '#bdbdbd'};
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #e0e0e0;
    color: #388e3c;
    border-color: #388e3c;
  }
  
  &:disabled {
    opacity: 0.6;
  }
`;