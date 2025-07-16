import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, AvatarWrapper, Avatar, Nickname, ExpBarArea, LevelRow, LevelLabel, LevelValue, ExpBar, ExpBarFill, ExpText, Skills, SkillButton, StartButton } from './style'
import BoyImg from '../../assets/boy.svg'
import GirlImg from '../../assets/girl.svg'
import DownBar from '../DownBar/index'
import { getUserInfo, type UserResponse } from '../../constants/api'

const Main = () => {
  const navigate = useNavigate()
  
  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [gold, setGold] = useState<number>(0);

  // 고정된 스킬 데이터
  const skills = [
    { name: '정화\n공격', dmg: 10, maxUses: 5 },
    { name: '때리기', dmg: 25, maxUses: 5 },
    { name: '쓰레기\n분쇄공격', dmg: 35, maxUses: 3 },
    { name: '쓰레기\n줍기', dmg: 80, maxUses: 2 },
  ];

  // 클릭된 스킬 인덱스 상태
  const [openedSkill, setOpenedSkill] = useState<number | null>(null);

  // 레벨 계산 함수 (XP 기반)
  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 100) + 1; // 100XP당 1레벨
  };

  // 현재 레벨에서의 경험치 계산
  const calculateCurrentLevelExp = (xp: number) => {
    return xp % 100; // 현재 레벨에서의 경험치
  };

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
        // 에러 시 로그인 페이지로 리다이렉트
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    // 골드 정보 가져오기
    const storedGold = localStorage.getItem('playerGold');
    if (storedGold) {
      setGold(parseInt(storedGold));
    } else {
      localStorage.setItem('playerGold', '500');
      setGold(500);
    }

    fetchUserInfo();
  }, [navigate]);

  if (loading) {
    return (
      <Container>
        <Card>
          <div>로딩 중...</div>
        </Card>
      </Container>
    );
  }

  if (!userInfo) {
    return null;
  }

  const level = calculateLevel(userInfo.xp);
  const currentLevelExp = calculateCurrentLevelExp(userInfo.xp);
  const maxExp = 100; // 레벨당 필요한 경험치
  const expPercent = (currentLevelExp / maxExp) * 100;

  // 선택된 캐릭터에 따라 아바타 이미지 결정
  const selectedCharacter = localStorage.getItem('selectedCharacter');
  const avatarImg = selectedCharacter === 'female' ? GirlImg : BoyImg;

  // 골드 업데이트 함수
  const updateGold = (newAmount: number) => {
    setGold(newAmount);
    localStorage.setItem('playerGold', newAmount.toString());
  };

  // 골드 획득 함수 (임시 테스트용)
  const earnGold = (amount: number) => {
    updateGold(gold + amount);
  };

  return (
    <Container>
      <Card>
        <AvatarWrapper>
          <Avatar src={avatarImg} alt="사용자 캐릭터" />
        </AvatarWrapper>
        <Nickname>{userInfo.name}</Nickname>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', background: '#fff', border: '2px solid #bdbdbd', borderRadius: '8px', padding: '8px 12px', boxShadow: '0 2px 0 #bdbdbd' }}>
          <span style={{ color: '#ffc107', fontSize: '1rem' }}>💰</span>
          <span style={{ fontSize: '1rem', color: '#333', fontWeight: 'bold' }}>{gold.toLocaleString()}</span>
        </div>
        <ExpBarArea>
          <LevelRow>
            <LevelLabel>레벨</LevelLabel>
            <LevelValue>{level}</LevelValue>
          </LevelRow>
          <ExpBar>
            <ExpBarFill percent={expPercent} />
          </ExpBar>
          <ExpText>{currentLevelExp} / {maxExp} EXP</ExpText>
        </ExpBarArea>
        <Skills>
          {skills.map((skill, idx) => (
            <SkillButton
              key={skill.name}
              onClick={() => setOpenedSkill(openedSkill === idx ? null : idx)}
            >
              <div>{skill.name}</div>
              {openedSkill === idx && (
                <div style={{ fontSize: '0.9rem', marginTop: 2 }}>
                  ({skill.dmg}) / {skill.maxUses}회
                </div>
              )}
            </SkillButton>
          ))}
        </Skills>
        <StartButton onClick={() => navigate('/camera')}>시작하기</StartButton>
        <StartButton onClick={() => navigate('/shop')} style={{ marginTop: '10px', background: '#ff9800' }}>상점</StartButton>
        <StartButton onClick={() => earnGold(100)} style={{ marginTop: '10px', background: '#4caf50', fontSize: '0.9rem' }}>골드 +100 (테스트)</StartButton>
        <DownBar />
      </Card>
    
    </Container>
    
  )
}

export default Main
