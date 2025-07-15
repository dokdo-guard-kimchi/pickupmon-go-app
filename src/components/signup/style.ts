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
`;

export const SignupCard = styled.div`
  background-color: #f7f7f7;
  border: 3px solid #bdbdbd;
  padding: 36px 28px 32px 28px;
  max-width: 393px;
  width: 100%;
  min-height: 792px;
  height: 792px;
  border-radius: 14px;
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
`;

export const Head = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 48px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 0 0 4px;
  padding: 0;
  color: #757575;
  transition: color 0.2s;

  &:hover, &:focus {
    color: #333;
  }
`;

export const Title = styled.h1`
  color: #333;
  font-size: 1.3rem;
  margin: 0;
  letter-spacing: 1px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 12px;
  margin-bottom: 18px;
  border: 2px solid #bdbdbd;
  border-radius: 6px;
  background: #fff;
  color: #222;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  transition: border 0.2s;

  &:focus {
    border: 2.5px solid #333;
    background: #f0f0f0;
  }
`;

export const Button = styled.button`
  width: 100%;
  background: #bdbdbd;
  color: #222;
  border: 2px solid #757575;
  border-radius: 6px;
  padding: 14px 0;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 1px;
  margin-top: 8px;
  transition: background 0.2s, color 0.2s, border 0.2s;

  &:hover, &:focus {
    background: #e0e0e0;
    color: #333;
    border: 2px solid #bdbdbd;
  }
`;

export const LinkText = styled.span`
  display: block;
  margin-top: 18px;
  color: #757575;
  font-size: 0.8rem;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
`;
