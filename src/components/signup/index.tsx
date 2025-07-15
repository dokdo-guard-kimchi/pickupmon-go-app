import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, SignupCard, Head, BackButton, Title, Input, Button, LinkText } from './style'

const Signup = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <SignupCard>
        <Head>
          <BackButton type="button" onClick={() => navigate('/start')} aria-label="뒤로가기">←</BackButton>
          <Title>Sign Up</Title>
        </Head>
        <form>
          <Input type="text" placeholder="아이디" autoComplete="username" />
          <Input type="password" placeholder="비밀번호" autoComplete="new-password" />
          <Input type="text" placeholder="이름" autoComplete="name" />
          <Button type="submit">회원가입</Button>
        </form>
        <LinkText onClick={() => navigate('/login')}>이미 계정이 있으신가요?</LinkText>
      </SignupCard>
    </Container>
  )
}

export default Signup
