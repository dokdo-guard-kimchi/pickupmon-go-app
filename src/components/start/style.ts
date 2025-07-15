import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(45deg, #e0e0e0 0 10px, #f5f5f5 10px 20px);
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
  padding: 0;
`

export const GameCard = styled.div`
  background-color: #f7f7f7;
  border: 3px solid #bdbdbd;
  box-shadow: 0 0 16px #d1d1d1, 0 0 0 8px #e0e0e0 inset;
  padding: 40px 20px;
  text-align: center;
  max-width: 393px;
  width: 100%;
  min-height: 792px;
  height: 792px;
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
    height: auto;
  }
`

export const Logo = styled.img`
  width: 100%;
  max-width: 180px;
  height: auto;
  margin-bottom: 30px;
  image-rendering: pixelated;
`

export const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 0 #fff, 4px 4px 0 #bdbdbd;
  letter-spacing: 2px;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }
`

export const Subtitle = styled.p`
  color: #757575;
  font-size: 0.9rem;
  margin-bottom: 40px;
  line-height: 1.5;
  text-shadow: 1px 1px 0 #fff, 2px 2px 0 #bdbdbd;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 30px;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
`

export const LoginButton = styled.button`
  background: #bdbdbd;
  color: #222;
  border: 2px solid #757575;
  border-radius: 8px;
  padding: 18px 0;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 6px #e0e0e0, 0 2px 0 #bdbdbd;
  text-shadow: 1px 1px 0 #fff;
  letter-spacing: 1px;
  width: 100%;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 16px 0;
    letter-spacing: 0.5px;
  }

  &:hover {
    background: #e0e0e0;
    color: #333;
    border: 2px solid #bdbdbd;
    box-shadow: 0 0 10px #bdbdbd, 0 2px 0 #e0e0e0;
  }
`

export const SignupButton = styled(LoginButton)`
`;
