import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, LoginCard, Title, Input, Button, LinkText, BackButton, Head } from './style'

const Login = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LoginCard>
        <Head>
          <BackButton type="button" onClick={() => navigate('/start')} aria-label="뒤로가기">←</BackButton>
          <Title>Login</Title>
        </Head>
        <form>
          <Input type="text" placeholder="아이디" autoComplete="username" />
          <Input type="password" placeholder="비밀번호" autoComplete="current-password" />
          <Button type="submit">로그인</Button>
        </form>
        <LinkText onClick={() => navigate('/signUp')}>회원가입이 필요하신가요?</LinkText>
      </LoginCard>
    </Container>
  )
}

export default Login
