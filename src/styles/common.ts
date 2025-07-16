import styled from 'styled-components';

// 공통 앱 컨테이너 - 아이폰 15 화면 규격에 최적화
export const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh; /* 모바일용 동적 뷰포트 높이 */
  display: flex;
  justify-content: center;
  align-items: center;
  background: repeating-linear-gradient(45deg, #e0e0e0 0 10px, #f5f5f5 10px 20px);
  font-family: 'Press Start 2P', cursive, Arial, sans-serif;
  overflow: hidden;
  padding: 0;
  margin: 0;
`;

// 페이지 래퍼 - 아이폰 15 화면 크기 (393px × 852px)
export const PageWrapper = styled.div`
  width: 100%;
  max-width: 393px;
  height: 100%;
  max-height: 852px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  /* 모바일 환경에서는 전체 화면 사용 */
  @media screen and (max-width: 393px) {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-width: none;
    max-height: none;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
`;

// 콘텐츠 영역
export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

// 배틀 페이지용 특별 래퍼 (기존 스타일 유지)
export const BattlePageWrapper = styled.div`
  width: 100%;
  max-width: 393px;
  height: 100%;
  max-height: 852px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  overflow: hidden;
  
  /* 모바일 환경에서는 전체 화면 사용 */
  @media screen and (max-width: 393px) {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-width: none;
    max-height: none;
    border: none;
  }
`;