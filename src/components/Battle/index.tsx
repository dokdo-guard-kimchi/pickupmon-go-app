import React, { useState, useEffect } from 'react'
import * as S from './style';
import battleeStand from  '../../assets/BattleStand.svg';
import trash1 from '../../assets/trash1.svg'
import UserBattleIcon from '../../assets/UserBattleIcon.svg'

interface Skill {
    name: string;
    dmg: number;
    maxUses: number;
}

interface BattleMessage {
    attacker: string;
    skillName: string;
    damage: number;
    type: 'attack' | 'victory';
    exp?: number;
}

const Battle: React.FC = () => {
    const [maxTrashHp] = useState<number>(() => Math.floor(Math.random() * 201) + 100); // 100~300 랜덤
    const [trashHp, setTrashHp] = useState<number>(maxTrashHp);
    const [userHp, setUserHp] = useState<number>(100);
    const [isUserTurn, setIsUserTurn] = useState<boolean>(true);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>('');
    const [showSkills, setShowSkills] = useState<boolean>(true);
    const [battleMessage, setBattleMessage] = useState<BattleMessage | null>(null);
    const [userAnimation, setUserAnimation] = useState<string>('');
    const [trashAnimation, setTrashAnimation] = useState<string>('');
    const [skillUses, setSkillUses] = useState<number[]>([5, 5, 3, 2]); // 각 스킬의 남은 사용 횟수
    const maxUserHp: number = 100;

    const userSkillList: Skill[] = [
        {
            name: '정화 공격',
            dmg: 10,
            maxUses: 5
        },
        {
            name:'떄리기',
            dmg: 25,
            maxUses: 5
        },
        {
            name:'쓰레기 분쇄공격',
            dmg: 35,
            maxUses: 3
        },
        {
            name:'쓰레기 줍기',
            dmg: 280,
            maxUses: 2
        }
    ]

    const trashSkillList: Skill[] = [
        {
            name: '더러운 공격',
            dmg: 15,
            maxUses: 0
        },
        {
            name: '냄새 공격',
            dmg: 20,
            maxUses: 0
        },
        {
            name: '독성 분출',
            dmg: 30,
            maxUses: 0
        }
    ]

    const getSkillAnimation = (skillName: string): string => {
        switch(skillName) {
            case '정화 공격': return 'purify';
            case '떄리기': return 'punch';
            case '쓰레기 분쇄공격': return 'crush';
            case '쓰레기 줍기': return 'pickup';
            case '더러운 공격': return 'dirty';
            case '냄새 공격': return 'smell';
            case '독성 분출': return 'toxic';
            default: return 'attack';
        }
    }

    const triggerAnimation = (attacker: 'user' | 'trash', skillName: string): void => {
        const animation = getSkillAnimation(skillName);
        
        if (attacker === 'user') {
            setUserAnimation(animation);
            setTimeout(() => setUserAnimation(''), 1000);
        } else {
            setTrashAnimation(animation);
            setTimeout(() => setTrashAnimation(''), 1000);
        }
    }

    const sendExpToServer = async (exp: number): Promise<void> => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
            return;
        }
      
        try {
            const response = await fetch(`http://34.22.84.19:8080/user/${exp}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log("exp: ",exp);

            if (response.ok) {
                console.log(`경험치 ${exp} 전송 성공!`);
            } else {
                console.error('경험치 전송 실패:', response.status);
            }
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    }

    const handleUserSkill = (damage: number, skillIndex: number): void => {
        if (!isUserTurn || gameOver || skillUses[skillIndex] <= 0) return;
        
        const skill = userSkillList[skillIndex];
        setShowSkills(false);
        
        // 스킬 사용 횟수 감소
        const newSkillUses = [...skillUses];
        newSkillUses[skillIndex] -= 1;
        setSkillUses(newSkillUses);
        
        // 애니메이션 트리거
        triggerAnimation('user', skill.name);
        
        // 공격 메시지 표시
        setBattleMessage({
            attacker: '유저',
            skillName: skill.name,
            damage: damage,
            type: 'attack'
        });
        
        const newTrashHp = Math.max(0, trashHp - damage);
        setTrashHp(newTrashHp);
        
        if (newTrashHp === 0) {
            setGameOver(true);
            setWinner('유저');
            // 승리 메시지로 변경
            setTimeout(async () => {
                const randomExp = Math.floor(Math.random() * 141) + 10; // 10~150 랜덤
                setBattleMessage({
                    attacker: '유저',
                    skillName: '승리!',
                    damage: 0,
                    type: 'victory',
                    exp: randomExp
                });
                
                // 경험치가 1 이상일 때 API로 전송
                if (randomExp >= 1) {
                    await sendExpToServer(randomExp);
                }
            }, 1500);
        } else {
            setIsUserTurn(false);
            setTimeout(() => {
                handleTrashTurn();
            }, 2000);
        }
    }

    const handleTrashTurn = (): void => {
        if (gameOver) return;
        
        const randomSkill = trashSkillList[Math.floor(Math.random() * trashSkillList.length)];
        
        // 애니메이션 트리거
        triggerAnimation('trash', randomSkill.name);
        
        // 공격 메시지 표시
        setBattleMessage({
            attacker: '쓰레기',
            skillName: randomSkill.name,
            damage: randomSkill.dmg,
            type: 'attack'
        });
        
        const newUserHp = Math.max(0, userHp - randomSkill.dmg);
        setUserHp(newUserHp);
        
        if (newUserHp === 0) {
            setGameOver(true);
            setWinner('쓰레기');
            setTimeout(() => {
                setBattleMessage({
                    attacker: '쓰레기',
                    skillName: '승리!',
                    damage: 0,
                    type: 'victory'
                });
            }, 1500);
        } else {
            setTimeout(() => {
                setIsUserTurn(true);
                setShowSkills(true);
                setBattleMessage(null);
            }, 2000);
        }
    }

    const getHpPercentage = (currentHp: number, maxHp: number): number => {
        return (currentHp / maxHp) * 100;
    }

    const resetGame = (): void => {
        const newMaxTrashHp = Math.floor(Math.random() * 201) + 100; // 새로운 랜덤 체력
        setTrashHp(newMaxTrashHp);
        setUserHp(100);
        setIsUserTurn(true);
        setGameOver(false);
        setWinner('');
        setShowSkills(true);
        setBattleMessage(null);
        setUserAnimation('');
        setTrashAnimation('');
        setSkillUses([5, 5, 3, 2]); // 스킬 사용 횟수 초기화
    }

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent): void => {
            if (!isUserTurn || gameOver || !showSkills) return;
            
            const keyNum = parseInt(event.key);
            if (keyNum >= 1 && keyNum <= 4) {
                const skillIndex = keyNum - 1;
                if (skillUses[skillIndex] > 0) {
                    handleUserSkill(userSkillList[skillIndex].dmg, skillIndex);
                }
            }
        }

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [isUserTurn, gameOver, showSkills, userSkillList, trashHp, skillUses]);

    return (
        <S.MainWrapper>
            <S.WebAppConteainer>
                <S.TurnIndicator>
                    {gameOver ? '게임 종료' : isUserTurn ? '유저 턴' : '쓰레기 턴'}
                </S.TurnIndicator>

                <S.TrashWrapper>
                    <S.BorderBox>
                        <S.BorderBoxHeader>
                            <S.HpText>Hp</S.HpText>
                            <S.BorderBoxHeaderName>페트병</S.BorderBoxHeaderName>
                            <S.Lv>Lv:1</S.Lv>
                        </S.BorderBoxHeader>
                        <S.HpWrapper>
                            <S.Hp $hpPercentage={getHpPercentage(trashHp, maxTrashHp)}></S.Hp>
                        </S.HpWrapper>
                        <S.HpNumber>
                            {trashHp}/{maxTrashHp}
                        </S.HpNumber>
                    </S.BorderBox>
                    <S.ImgWrapper>
                        <S.AnimatedTrash $animation={trashAnimation}>
                            <img src={trash1} alt="" />
                        </S.AnimatedTrash>
                        <img src={battleeStand} alt="" />
                    </S.ImgWrapper>
                </S.TrashWrapper>
                
                <S.UserWrapper>
                    <S.UserWrapperImg>
                        <S.AnimatedUser $animation={userAnimation}>
                            <img src={UserBattleIcon} alt="" style={{position:"relative",top:'10%',left:"9%",zIndex:"1"}} />
                        </S.AnimatedUser>
                        <img src={battleeStand} alt="" />
                    </S.UserWrapperImg>
                    <S.UserWrapperNameHp>
                        <S.BorderBox>
                            <S.BorderBoxHeader>
                                <S.HpText>Hp</S.HpText>
                                <S.BorderBoxHeaderName>유저</S.BorderBoxHeaderName>
                                <S.Lv>Lv:1</S.Lv>
                            </S.BorderBoxHeader>
                            <S.HpWrapper>
                                <S.Hp $hpPercentage={getHpPercentage(userHp, maxUserHp)}></S.Hp>
                            </S.HpWrapper>
                            <S.HpNumber>
                                {userHp}/{maxUserHp}
                            </S.HpNumber>
                        </S.BorderBox>
                    </S.UserWrapperNameHp>
                </S.UserWrapper>
                
                <S.SkillBoxWrap>
                    <S.SkiilBox>
                        {showSkills ? (
                            <S.Skills>
                                {userSkillList.map((skill, index) => (
                                    <S.Skill 
                                        key={index} 
                                        onClick={() => handleUserSkill(skill.dmg, index)}
                                        $disabled={!isUserTurn || gameOver || skillUses[index] <= 0}
                                    >
                                        <S.SkillNumber>{index + 1}</S.SkillNumber>
                                        <S.SkillContent>
                                            <S.SkillName>{skill.name}</S.SkillName>
                                            <S.SkillDmg>{skill.dmg}dmg</S.SkillDmg>
                                            <S.SkillUses>{skillUses[index]}/{skill.maxUses}</S.SkillUses>
                                        </S.SkillContent>
                                    </S.Skill>
                                ))}
                            </S.Skills>
                        ) : (
                            <S.BattleMessageContainer>
                                {battleMessage && (
                                    <S.BattleMessage $type={battleMessage.type}>
                                        {battleMessage.type === 'attack' ? (
                                            <>
                                                <S.AttackerName>{battleMessage.attacker}</S.AttackerName>
                                                <S.SkillInfo>
                                                    {battleMessage.skillName}로 {battleMessage.damage} 데미지!
                                                </S.SkillInfo>
                                            </>
                                        ) : (
                                            <>
                                                <S.VictoryText>{battleMessage.attacker} {battleMessage.skillName}</S.VictoryText>
                                                <S.ExpGain>{battleMessage.exp} 경험치 획득!</S.ExpGain>
                                                <S.ResetButton onClick={resetGame}>다시 시작</S.ResetButton>
                                            </>
                                        )}
                                    </S.BattleMessage>
                                )}
                            </S.BattleMessageContainer>
                        )}
                    </S.SkiilBox>
                </S.SkillBoxWrap>
            </S.WebAppConteainer>
        </S.MainWrapper>
    )
}

export default Battle