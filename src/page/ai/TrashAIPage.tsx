import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트
const PageContainer = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  min-height: 100vh;
  padding: 20px;
  color: #333;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.5em;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const Button = styled.button<{ variant?: 'stop' | 'default' }>`
  background: ${props => props.variant === 'stop' 
    ? 'linear-gradient(45deg, #e74c3c, #c0392b)' 
    : 'linear-gradient(45deg, #3498db, #2c3e50)'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
`;

const VideoSection = styled.div`
  flex: 2;
  min-width: 600px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  background: #000;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const InfoSection = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Panel = styled.div<{ color?: string }>`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  border-left: 4px solid ${props => props.color || '#3498db'};
`;

const PanelTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2em;
`;

const StatusIndicator = styled.span<{ status: 'active' | 'inactive' | 'loading' }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
  background: ${props => {
    switch (props.status) {
      case 'active': return '#27ae60';
      case 'inactive': return '#e74c3c';
      case 'loading': return '#f39c12';
      default: return '#e74c3c';
    }
  }};
  animation: ${props => {
    switch (props.status) {
      case 'active': return 'pulse 2s infinite';
      case 'loading': return 'spin 1s linear infinite';
      default: return 'none';
    }
  }};

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
`;

const StatValue = styled.span`
  font-weight: bold;
  color: #27ae60;
`;

const DetectionItem = styled.div`
  background: white;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  border-left: 3px solid #3498db;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const DetectionClass = styled.div`
  font-weight: bold;
  color: #2c3e50;
`;

const DetectionConfidence = styled.div`
  color: #27ae60;
  font-size: 0.9em;
`;

const FpsCounter = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
`;

const SettingItem = styled.div`
  margin-bottom: 15px;
`;

const SettingLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
`;

const SettingInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;

const SettingSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  border-left: 4px solid #e74c3c;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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
  const [isDetecting, setIsDetecting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [webcamActive, setWebcamActive] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5);
  const [detectionInterval, setDetectionInterval] = useState(200);
  const [fps, setFps] = useState(0);
  const [totalDetections, setTotalDetections] = useState(0);
  const [currentDetections, setCurrentDetections] = useState<Detection[]>([]);
  const [avgConfidence, setAvgConfidence] = useState(0);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inferEngineRef = useRef<any>(null);
  const workerIdRef = useRef<string | null>(null);
  const frameCountRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const confidenceSumRef = useRef(0);

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

  // 모델 초기화
  const initializeModel = useCallback(async () => {
    try {
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
      setIsLoading(false);
      console.log('모델 초기화 완료');
    } catch (error) {
      console.error('모델 초기화 실패:', error);
      setModelLoaded(false);
      setIsLoading(false);
      showError(`모델 로드 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}. Roboflow API 키를 확인해주세요.`);
    }
  }, [loadInferenceJS, showError]);

  // 캔버스 설정
  const setupCanvas = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.style.width = video.offsetWidth + 'px';
    canvas.style.height = video.offsetHeight + 'px';
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
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);
      
      // 레이블 배경
      const label = `${prediction.class} ${Math.round(prediction.confidence * 100)}%`;
      ctx.font = 'bold 16px Arial';
      const textWidth = ctx.measureText(label).width;
      
      ctx.fillStyle = color;
      ctx.fillRect(x, y - 25, textWidth + 10, 25);
      
      // 레이블 텍스트
      ctx.fillStyle = 'white';
      ctx.fillText(label, x + 5, y - 5);
    });
  }, [classColors]);

  // FPS 업데이트
  const updateFPS = useCallback(() => {
    const currentTime = Date.now();
    frameCountRef.current++;
    
    if (currentTime - lastFrameTimeRef.current >= 1000) {
      const fps = Math.round(frameCountRef.current / ((currentTime - lastFrameTimeRef.current) / 1000));
      setFps(fps);
      frameCountRef.current = 0;
      lastFrameTimeRef.current = currentTime;
    }
  }, []);

  // 통계 업데이트
  const updateStats = useCallback((predictions: Detection[]) => {
    if (predictions.length > 0) {
      setTotalDetections(prev => prev + predictions.length);
      confidenceSumRef.current += predictions.reduce((sum, pred) => sum + pred.confidence, 0);
      
      const avgConf = totalDetections > 0 ? 
        Math.round((confidenceSumRef.current / totalDetections) * 100) : 0;
      setAvgConfidence(avgConf);
    }
  }, [totalDetections]);

  // 감지 수행
  const performDetection = useCallback(async () => {
    if (!workerIdRef.current || !streamRef.current || !videoRef.current) return;

    try {
      const video = videoRef.current;
      const { CVImage } = (window as any).inferencejs;
      
      const cvimg = new CVImage(video);
      const predictions = await inferEngineRef.current.infer(workerIdRef.current, cvimg);
      
      // 신뢰도 필터링
      const filteredPredictions = predictions.filter((pred: Detection) => pred.confidence >= confidenceThreshold);
      
      setCurrentDetections(filteredPredictions);
      drawDetections(filteredPredictions);
      updateStats(filteredPredictions);
      updateFPS();
      
    } catch (error) {
      console.error('감지 오류:', error);
    }
  }, [confidenceThreshold, drawDetections, updateStats, updateFPS]);

  // 감지 루프 시작
  const startDetectionLoop = useCallback(() => {
    setIsDetecting(true);
    
    intervalRef.current = setInterval(() => {
      if (!isPaused && isDetecting) {
        performDetection();
      }
    }, detectionInterval);
  }, [isPaused, isDetecting, detectionInterval, performDetection]);

  // 웹캠 시작
  const startDetection = useCallback(async () => {
    if (!workerIdRef.current) {
      showError('모델이 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        }
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setupCanvas();
          startDetectionLoop();
        };
      }

      setWebcamActive(true);
      
    } catch (error) {
      console.error('웹캠 접근 실패:', error);
      showError('웹캠에 접근할 수 없습니다. 권한을 확인해주세요.');
    }
  }, [showError, setupCanvas, startDetectionLoop]);

  // 감지 중지
  const stopDetection = useCallback(() => {
    setIsDetecting(false);
    setIsPaused(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
    
    setWebcamActive(false);
    resetStats();
  }, []);

  // 일시정지/재개
  const pauseDetection = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // 통계 초기화
  const resetStats = useCallback(() => {
    setTotalDetections(0);
    confidenceSumRef.current = 0;
    frameCountRef.current = 0;
    setFps(0);
    setAvgConfidence(0);
    setCurrentDetections([]);
  }, []);

  // 컴포넌트 마운트 시 모델 초기화
  useEffect(() => {
    const timer = setTimeout(initializeModel, 1000);
    return () => clearTimeout(timer);
  }, [initializeModel]);

  // 감지 간격 변경 시 재시작
  useEffect(() => {
    if (isDetecting) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      startDetectionLoop();
    }
  }, [detectionInterval, isDetecting, startDetectionLoop]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, [stopDetection]);

  return (
    <PageContainer>
      <Container>
        <Title>🗑️ 실시간 폐기물 감지 시스템</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Controls>
          <Button onClick={startDetection} disabled={isDetecting}>
            📹 웹캠 시작
          </Button>
          <Button variant="stop" onClick={stopDetection} disabled={!isDetecting}>
            ⏹️ 중지
          </Button>
          <Button onClick={pauseDetection} disabled={!isDetecting}>
            {isPaused ? '▶️ 재개' : '⏸️ 일시정지'}
          </Button>
        </Controls>

        <MainContent>
          <VideoSection>
            <VideoContainer>
              <Video ref={videoRef} autoPlay muted playsInline />
              <Canvas ref={canvasRef} />
              <FpsCounter>FPS: {fps}</FpsCounter>
            </VideoContainer>
          </VideoSection>

          <InfoSection>
            <Panel>
              <PanelTitle>시스템 상태</PanelTitle>
              <div>
                <StatusIndicator status={webcamActive ? 'active' : 'inactive'} />
                <span>웹캠: {webcamActive ? '활성' : '비활성'}</span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <StatusIndicator status={modelLoaded ? 'active' : (isLoading ? 'loading' : 'inactive')} />
                <span>모델: {modelLoaded ? '로드 완료' : (isLoading ? '로딩 중...' : '로드 실패')}</span>
              </div>
            </Panel>

            <Panel color="#9b59b6">
              <PanelTitle>설정</PanelTitle>
              <SettingItem>
                <SettingLabel>감지 임계값</SettingLabel>
                <SettingInput
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                />
                <span>{confidenceThreshold}</span>
              </SettingItem>
              <SettingItem>
                <SettingLabel>감지 간격 (ms)</SettingLabel>
                <SettingSelect
                  value={detectionInterval}
                  onChange={(e) => setDetectionInterval(parseInt(e.target.value))}
                >
                  <option value="100">100ms (빠름)</option>
                  <option value="200">200ms (보통)</option>
                  <option value="500">500ms (느림)</option>
                  <option value="1000">1000ms (매우 느림)</option>
                </SettingSelect>
              </SettingItem>
            </Panel>

            <Panel color="#27ae60">
              <PanelTitle>감지 통계</PanelTitle>
              <StatItem>
                <span>총 감지 횟수:</span>
                <StatValue>{totalDetections}</StatValue>
              </StatItem>
              <StatItem>
                <span>현재 객체 수:</span>
                <StatValue>{currentDetections.length}</StatValue>
              </StatItem>
              <StatItem>
                <span>평균 신뢰도:</span>
                <StatValue>{avgConfidence}%</StatValue>
              </StatItem>
            </Panel>

            <Panel color="#f39c12">
              <PanelTitle>현재 감지된 객체</PanelTitle>
              {currentDetections.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>감지된 객체가 없습니다</p>
              ) : (
                currentDetections.map((detection, index) => (
                  <DetectionItem key={index}>
                    <DetectionClass>{detection.class}</DetectionClass>
                    <DetectionConfidence>
                      신뢰도: {Math.round(detection.confidence * 100)}%
                    </DetectionConfidence>
                  </DetectionItem>
                ))
              )}
            </Panel>
          </InfoSection>
        </MainContent>
      </Container>

      {isLoading && (
        <LoadingOverlay>
          <LoadingContent>
            <Spinner />
            <p>모델을 로딩하는 중...</p>
          </LoadingContent>
        </LoadingOverlay>
      )}
    </PageContainer>
  );
};

export default TrashAIPage;