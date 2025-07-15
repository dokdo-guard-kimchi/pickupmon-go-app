export const API_URL = import.meta.env.VITE_API_URL

export interface SignupRequest {
  userId: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  userId: string;
  password: string;
}

export const signupUser = async (userData: SignupRequest): Promise<void> => {
  const response = await fetch(`${API_URL}/signup`, {
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
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('로그인에 실패했습니다.');
  }
};