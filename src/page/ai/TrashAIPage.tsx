import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트
const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: repeating-linear-gradient(45deg, #e0e0e0 0 10px, #f5f5f5 10px 20px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 390px;
  height: 100vh;
  background: #000;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 18px;
  margin: 0;
  color: #fff;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  background: rgba(231, 76, 60, 0.9);
  color: white;
  padding: 15px;
  border-radius: 10px;
  z-index: 100;
`;

const CameraButtonContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
`;

const CameraButton = styled.button<{ isActive: boolean; progress: number }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #fff;
  background: ${props => props.isActive ? '#3498db' : '#7f8c8d'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.isActive ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: ${props => props.isActive ? 'scale(1.1)' : 'none'};
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${props => props.progress}%;
    background: linear-gradient(to top, #2ecc71, #27ae60);
    transition: height 0.1s ease;
    z-index: 1;
  }
  
  svg {
    width: 40px;
    height: 40px;
    fill: white;
    z-index: 2;
    position: relative;
  }
`;

const CameraIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 15.2c-2.8 0-5.1-2.3-5.1-5.1S9.2 5 12 5s5.1 2.3 5.1 5.1-2.3 5.1-5.1 5.1zm0-8.4c-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3-1.5-3.3-3.3-3.3z"/>
    <path d="M21 19H3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h3.5l1.4-1.4c.6-.6 1.4-.9 2.1-.9h4c.7 0 1.5.3 2.1.9L17.5 5H21c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2zM3 7v10h18V7h-4l-1.4-1.4c-.3-.3-.7-.6-1.1-.6h-4c-.4 0-.8.3-1.1.6L8 7H3z"/>
  </svg>
);

// 타입 정의
interface Detection {
  class: string;
  confidence: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface ModelConfig {
  name: string;
  version: string;
  publishableKey: string;
}

// 메인 컴포넌트
const TrashAIPage: React.FC = () => {
  // 상태 관리
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDetections, setCurrentDetections] = useState<Detection[]>([]);
  const [detectionProgress, setDetectionProgress] = useState(0);
  const [isButtonActive, setIsButtonActive] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inferEngineRef = useRef<any>(null);
  const workerIdRef = useRef<string | null>(null);
  const detectionStartTimeRef = useRef<number | null>(null);

  // 모델 설정
  const MODEL_CONFIG: ModelConfig = {
    name: 'waste-detection-vqkjo',
    version: '3',
    publishableKey: 'rf_BjDKxBhC0BT3Z59qMVJ2491NI012'
  };

  // 클래스별 색상
  const classColors: { [key: string]: string } = {
    'plastic': '#ff6b6b',
    'paper': '#4ecdc4',
    'glass': '#45b7d1',
    'metal': '#f9ca24',
    'organic': '#6c5ce7',
    'cardboard': '#fdcb6e',
    'trash': '#e17055'
  };

  // 에러 표시
  const showError = useCallback((message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  }, []);

  // 라이브러리 로드
  const loadInferenceJS = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      if ((window as any).inferencejs || (window as any).InferenceEngine) {
        resolve();
        return;
      }

      const scripts = [
        'https://unpkg.com/inferencejs@latest/dist/inference.js',
        'https://cdn.jsdelivr.net/npm/inferencejs@latest/dist/inference.min.js',
        'https://cdn.roboflow.com/0.2.26/roboflow.js'
      ];

      let scriptIndex = 0;

      const tryLoadScript = () => {
        if (scriptIndex >= scripts.length) {
          reject(new Error('모든 CDN에서 라이브러리 로드 실패'));
          return;
        }

        const script = document.createElement('script');
        script.src = scripts[scriptIndex];
        script.onload = () => {
          console.log(`스크립트 로드 성공: ${scripts[scriptIndex]}`);
          resolve();
        };
        script.onerror = () => {
          console.log(`스크립트 로드 실패: ${scripts[scriptIndex]}`);
          scriptIndex++;
          tryLoadScript();
        };
        document.head.appendChild(script);
      };

      tryLoadScript();
    });
  }, []);

  // 모델 및 웹캠 초기화
  const initializeApp = useCallback(async () => {
    try {
      // 모델 로드
      await loadInferenceJS();

      let InferenceEngine;
      if ((window as any).inferencejs) {
        InferenceEngine = (window as any).inferencejs.InferenceEngine;
      } else if ((window as any).InferenceEngine) {
        InferenceEngine = (window as any).InferenceEngine;
      } else {
        throw new Error('InferenceEngine을 찾을 수 없습니다');
      }

      inferEngineRef.current = new InferenceEngine();
      
      workerIdRef.current = await inferEngineRef.current.startWorker(
        MODEL_CONFIG.name,
        MODEL_CONFIG.version,
        MODEL_CONFIG.publishableKey
      );
      
      setModelLoaded(true);
      console.log('모델 초기화 완료');

      // 웹캠 시작
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 720 },
          height: { ideal: 1280 },
          facingMode: 'environment'
        }
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setupCanvas();
          startDetectionLoop();
          setIsLoading(false);
        };
      }
      
    } catch (error) {
      console.error('초기화 실패:', error);
      setIsLoading(false);
      if (error instanceof Error && error.message.includes('getUserMedia')) {
        showError('웹캠에 접근할 수 없습니다. 권한을 확인해주세요.');
      } else {
        showError(`모델 로드 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
      }
    }
  }, [loadInferenceJS, showError]);

  // 캔버스 설정
  const setupCanvas = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }, []);

  // 감지 결과 그리기
  const drawDetections = useCallback((predictions: Detection[]) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;
    
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const scaleX = canvas.width / video.videoWidth;
    const scaleY = canvas.height / video.videoHeight;
    
    predictions.forEach((prediction) => {
      const bbox = prediction.bbox;
      const x = (bbox.x - bbox.width / 2) * scaleX;
      const y = (bbox.y - bbox.height / 2) * scaleY;
      const width = bbox.width * scaleX;
      const height = bbox.height * scaleY;
      
      const color = classColors[prediction.class.toLowerCase()] || '#ff4757';
      
      // 경계 상자 그리기
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
      
      // 레이블 배경
      const label = `${prediction.class} ${Math.round(prediction.confidence * 100)}%`;
      ctx.font = 'bold 20px Arial';
      const textWidth = ctx.measureText(label).width;
      
      ctx.fillStyle = color;
      ctx.fillRect(x, y - 35, textWidth + 20, 35);
      
      // 레이블 텍스트
      ctx.fillStyle = 'white';
      ctx.fillText(label, x + 10, y - 10);
    });
  }, [classColors]);

  // 감지 수행
  const performDetection = useCallback(async () => {
    if (!workerIdRef.current || !streamRef.current || !videoRef.current) return;

    try {
      const video = videoRef.current;
      const { CVImage } = (window as any).inferencejs;
      
      const cvimg = new CVImage(video);
      const predictions = await inferEngineRef.current.infer(workerIdRef.current, cvimg);
      
      // 신뢰도 필터링 (0.5 이상)
      const filteredPredictions = predictions.filter((pred: Detection) => pred.confidence >= 0.5);
      
      setCurrentDetections(filteredPredictions);
      drawDetections(filteredPredictions);
      
      // 3초 감지 로직
      const now = Date.now();
      if (filteredPredictions.length > 0) {
        if (detectionStartTimeRef.current === null) {
          detectionStartTimeRef.current = now;
          console.log('감지 시작!', now);
        } else {
          const elapsedTime = now - detectionStartTimeRef.current;
          const progress = Math.min((elapsedTime / 3000) * 100, 100);
          setDetectionProgress(progress);
          console.log('진행률:', progress, '%, 경과시간:', elapsedTime);
          
          if (elapsedTime >= 3000) {
            setIsButtonActive(true);
            console.log('버튼 활성화!');
          }
        }
      } else {
        if (detectionStartTimeRef.current !== null) {
          console.log('감지 종료, 초기화');
        }
        detectionStartTimeRef.current = null;
        setDetectionProgress(0);
        setIsButtonActive(false);
      }
      
    } catch (error) {
      console.error('감지 오류:', error);
    }
  }, [drawDetections]);

  // 감지 루프 시작
  const startDetectionLoop = useCallback(() => {
    intervalRef.current = setInterval(() => {
      performDetection();
    }, 200);
  }, [performDetection]);

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    const timer = setTimeout(initializeApp, 1000);
    return () => clearTimeout(timer);
  }, [initializeApp]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // 카메라 버튼 클릭 핸들러
  const handleCameraClick = useCallback(() => {
    if (isButtonActive) {
      console.log('카메라 버튼 클릭됨! 현재 감지된 쓰레기:', currentDetections);
      console.log('감지 시작 시간:', detectionStartTimeRef.current);
      console.log('진행률:', detectionProgress);
      
      // 버튼 클릭 후 상태 초기화
      detectionStartTimeRef.current = null;
      setDetectionProgress(0);
      setIsButtonActive(false);
      console.log('버튼 상태 초기화 완료');
    }
  }, [isButtonActive, currentDetections, detectionProgress]);

  return (
    <AppContainer>
      <VideoContainer>
        <Video ref={videoRef} autoPlay muted playsInline />
        <Canvas ref={canvasRef} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <CameraButtonContainer>
          <CameraButton
            isActive={isButtonActive}
            progress={detectionProgress}
            onClick={handleCameraClick}
          >
            <CameraIcon />
          </CameraButton>
        </CameraButtonContainer>
      </VideoContainer>

      {isLoading && (
        <LoadingOverlay>
          <LoadingContent>
            <Spinner />
            <LoadingText>모델을 로딩하는 중...</LoadingText>
          </LoadingContent>
        </LoadingOverlay>
      )}
    </AppContainer>
  );
};

export default TrashAIPage;