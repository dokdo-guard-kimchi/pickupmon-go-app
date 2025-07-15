import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, SignupCard, Head, BackButton, Title, Input, Button, LinkText } from './style'
import { signupUser, type SignupRequest } from '../../constants/api'

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupRequest>({
    userId: '',
    password: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userId || !formData.password || !formData.name) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await signupUser(formData);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      alert(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <SignupCard>
        <Head>
          <BackButton type="button" onClick={() => navigate('/start')} aria-label="뒤로가기">←</BackButton>
          <Title>Sign Up</Title>
        </Head>
        <form onSubmit={handleSubmit}>
          <Input 
            type="text" 
            name="userId"
            placeholder="아이디" 
            autoComplete="username"
            value={formData.userId}
            onChange={handleInputChange}
          />
          <Input 
            type="password" 
            name="password"
            placeholder="비밀번호" 
            autoComplete="new-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Input 
            type="text" 
            name="name"
            placeholder="이름" 
            autoComplete="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '처리 중...' : '회원가입'}
          </Button>
        </form>
        <LinkText onClick={() => navigate('/login')}>이미 계정이 있으신가요?</LinkText>
      </SignupCard>
    </Container>
  )
}

export default Signup
