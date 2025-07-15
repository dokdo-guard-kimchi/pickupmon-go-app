import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'

import {
  Container,
  GameCard,
  Logo,
  Title,
  Subtitle,
  ButtonContainer,
  LoginButton,
  SignupButton
} from './style'

const Start = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  return (
    <Container>
      <GameCard>
        <Title>Pickupmon</Title>
        <Subtitle>환경을 지키며 함께하는 웹 게임</Subtitle>
        <ButtonContainer>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
          <SignupButton onClick={handleSignup}>회원가입</SignupButton>
        </ButtonContainer>
      </GameCard>
    </Container>
  )
}

export default Start;
