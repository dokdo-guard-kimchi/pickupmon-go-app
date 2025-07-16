export const API_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL

export interface SignupRequest {
  userId: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface UserResponse {
  userId: string;
  password: string;
  name: string;
  xp: number;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export const signupUser = async (userData: SignupRequest): Promise<void> => {
  const response = await fetch(`${API_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('회원가입에 실패했습니다.');
  }
};

export const loginUser = async (userData: LoginRequest): Promise<void> => {
  const response = await fetch(`${API_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('로그인에 실패했습니다.');
  }

  // 토큰 저장
  const data: LoginResponse = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('tokenType', data.tokenType);
};

export const getUserInfo = async (): Promise<UserResponse> => {
  const accessToken = localStorage.getItem('accessToken');
  const tokenType = localStorage.getItem('tokenType') || 'Bearer';
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // 토큰이 있으면 Authorization 헤더에 추가
  if (accessToken) {
    headers['Authorization'] = `${tokenType} ${accessToken}`;
  }

  const response = await fetch(`${API_URL}/user/me`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error('사용자 정보를 가져오는데 실패했습니다.');
  }

  return await response.json();
};