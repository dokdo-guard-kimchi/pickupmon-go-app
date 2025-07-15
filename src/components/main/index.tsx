import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, AvatarWrapper, Avatar, Nickname, ExpBarArea, LevelRow, LevelLabel, LevelValue, ExpBar, ExpBarFill, ExpText, Skills, SkillButton, StartButton } from './style'
import AvatarImg from '../../assets/boy.svg'

const Main = () => {
  const navigate = useNavigate()

  // 임시 데이터
  const nickname = '독도수비대김치';
  const level = 2;
  const exp = 4;
  const maxExp = 18;
  const skills = [
    { name: '정화 공격', dmg: 10, maxUses: 5 },
    { name: '때리기', dmg: 25, maxUses: 5 },
    { name: '쓰레기\n분쇄공격', dmg: 35, maxUses: 3 },
    { name: '쓰레기\n줍기', dmg: 80, maxUses: 2 },
  ];
  const expPercent = (exp / maxExp) * 100;

  // 클릭된 스킬 인덱스 상태
  const [openedSkill, setOpenedSkill] = useState<number | null>(null);

  return (
    <Container>
      <Card>
        <AvatarWrapper>
          <Avatar src={AvatarImg} alt="사용자 캐릭터" />
        </AvatarWrapper>
        <Nickname>{nickname}</Nickname>
        <ExpBarArea>
          <LevelRow>
            <LevelLabel>레벨</LevelLabel>
            <LevelValue>{level}</LevelValue>
          </LevelRow>
          <ExpBar>
            <ExpBarFill percent={expPercent} />
          </ExpBar>
          <ExpText>{exp} / {maxExp} EXP</ExpText>
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
      </Card>
    </Container>
  )
}

export default Main
