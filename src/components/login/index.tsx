import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, LoginCard, Title, Input, Button, LinkText, BackButton, Head } from './style'
import { loginUser, type LoginRequest } from '../../constants/api'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginRequest>({
    userId: '',
    password: ''
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
    
    if (!formData.userId || !formData.password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await loginUser(formData);
      alert('로그인 성공!');
      
      // 첫 방문자인지 확인
      const hasSelectedCharacter = localStorage.getItem('characterSelected');
      if (!hasSelectedCharacter) {
        // 첫 방문자는 캐릭터 선택 페이지로
        navigate('/charactor');
      } else {
        // 기존 사용자는 메인 페이지로
        navigate('/');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Head>
          <BackButton type="button" onClick={() => navigate('/start')} aria-label="뒤로가기">←</BackButton>
          <Title>Login</Title>
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
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
        <LinkText onClick={() => navigate('/signUp')}>회원가입이 필요하신가요?</LinkText>
      </LoginCard>
    </Container>
  )
}

export default Login
