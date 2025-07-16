import { useState, useEffect } from 'react'
import { AppContainer, BattlePageWrapper } from '../../styles/common'
import * as S from './style';
import battleStand from  '../../assets/battleStand.svg';
import trash1 from '../../assets/trash1.svg'
import UserBattleIcon from '../../assets/UserBattleIcon.svg'
import UserBattleFemale from '../../assets/UserBattleFemale.svg'
import { useNavigate } from 'react-router-dom';

interface Skill {
    name: string;
    dmg: number;
    maxUses: number;
}

interface MonsterData {
    name: string;
    img: string;
    skills: string[];
}

interface BattleMessage {
    attacker: string;
    skillName: string;
    damage: number;
    type: 'attack' | 'victory';
    exp?: number;
}

// 더미 데이터 생성 및 로컬 스토리지에 저장
const initializeDummyMonsterData = (): void => {
    const dummyMonsterData: MonsterData = {
        name: '플라스틱 쓰레기 몬스터',
        img: 'https://via.placeholder.com/150x150/ff6b6b/ffffff?text=Monster',
        skills: ['독성 분출', '썩은 냄새 공격', '플라스틱 파편 투척']
    };

    localStorage.setItem('currentMonster', JSON.stringify(dummyMonsterData));
};

const Battle: React.FC = () => {
    const navigate = useNavigate();

    // 로컬 스토리지에서 몬스터 데이터 가져오기
    const getMonsterData = (): MonsterData => {
        const savedMonsterData = localStorage.getItem('currentMonster');
        
        if (!savedMonsterData) {
            // 더미 데이터 생성
            initializeDummyMonsterData();
            const newMonsterData = localStorage.getItem('currentMonster');
            return JSON.parse(newMonsterData!);
        }
        
        return JSON.parse(savedMonsterData);
    };

    const [currentMonster] = useState<MonsterData>(getMonsterData());
    const [userLevel, setUserLevel] = useState<number>(() => {
        return parseInt(localStorage.getItem('userLevel') || '1');
    });
    const [maxTrashHp] = useState<number>(() => Math.floor(Math.random() * 201) + 100); // 100~300 랜덤
    const [trashHp, setTrashHp] = useState<number>(maxTrashHp);
    const [userHp, setUserHp] = useState<number>(100);
    const [isUserTurn, setIsUserTurn] = useState<boolean>(true);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [, setWinner] = useState<string>('');
    const [showSkills, setShowSkills] = useState<boolean>(true);
    const [battleMessage, setBattleMessage] = useState<BattleMessage | null>(null);
    const [userAnimation, setUserAnimation] = useState<string>('');
    const [trashAnimation, setTrashAnimation] = useState<string>('');
    const [skillUses, setSkillUses] = useState<number[]>([5, 5, 3, 2]); // 각 스킬의 남은 사용 횟수
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const maxUserHp: number = 100;
    const gender = localStorage.getItem('selectedCharacter');

    const userSkillList: Skill[] = [
        {
            name: '정화 공격',
            dmg: 10,
            maxUses: 5
        },
        {
            name:'때리기',
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
            dmg: 380,
            maxUses: 2
        }
    ]

    // 로컬 스토리지의 몬스터 데이터를 기반으로 스킬 생성 (데미지는 고정)
    const monsterSkillList: Skill[] = currentMonster.skills.map((skillName, index) => ({
        name: skillName,
        dmg: [15, 20, 30][index] || 15, // 15, 20, 30 데미지 고정
        maxUses: 0
    }));

    const getSkillAnimation = (skillName: string): string => {
        // 유저 스킬 애니메이션
        switch(skillName) {
            case '정화 공격': return 'purify';
            case '때리기': return 'punch';
            case '쓰레기 분쇄공격': return 'crush';
            case '쓰레기 줍기': return 'pickup';
            default: break;
        }
        
        // 쓰레기 스킬 애니메이션 (스킬 이름 기반)
        if (skillName.includes('독') || skillName.includes('화학') || skillName.includes('독성')) return 'toxic';
        if (skillName.includes('냄새') || skillName.includes('썩은')) return 'smell';
        if (skillName.includes('공격') || skillName.includes('타격')) return 'attack';
        if (skillName.includes('파편') || skillName.includes('베기')) return 'sharp';
        
        return 'attack';
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

    const saveExpToLocal = (exp: number) => {
        const currentExp = parseInt(localStorage.getItem('userExp') || '0');
        const newExp = currentExp + exp;
        const level = Math.floor(newExp / 150) + 1; // 150으로 나눈 몫 + 1이 레벨
        
        localStorage.setItem('userExp', newExp.toString());
        localStorage.setItem('userLevel', level.toString());
        
        // 레벨 상태 업데이트
        setUserLevel(level);
        
        console.log(`경험치 ${exp} 획득! 총 경험치: ${newExp}, 레벨: ${level}`);
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
            setTimeout(() => {
                const randomExp = Math.floor(Math.random() * 141) + 10; // 10~150 랜덤
                setBattleMessage({
                    attacker: '유저(은)는',
                    skillName: '승리했다!',
                    damage: 0,
                    type: 'victory',
                    exp: randomExp
                });
                // 경험치를 로컬 스토리지에 저장
                saveExpToLocal(randomExp);
            }, 1500);
        } else {
            setIsUserTurn(false);
            setTimeout(() => {
                handleMonsterTurn();
            }, 2000);
        }
    }

    const handleMonsterTurn = (): void => {
        if (gameOver) return;
        
        const randomSkill = monsterSkillList[Math.floor(Math.random() * monsterSkillList.length)];
        
        // 애니메이션 트리거
        triggerAnimation('trash', randomSkill.name);
        
        // 공격 메시지 표시
        setBattleMessage({
            attacker: currentMonster.name,
            skillName: randomSkill.name,
            damage: randomSkill.dmg,
            type: 'attack'
        });
        
        const newUserHp = Math.max(0, userHp - randomSkill.dmg);
        setUserHp(newUserHp);
        
        if (newUserHp === 0) {
            setGameOver(true);
            setWinner(currentMonster.name);
            setTimeout(() => {
                setBattleMessage({
                    attacker: '유저(은)는 패배했다!',
                    skillName: '유저(은)는 눈앞이 깜깜해졌다...',
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

    const handleHomeNavigation = (): void => {
        setIsTransitioning(true);
        setTimeout(() => {
            navigate('/');
        }, 400); // 애니메이션 중간 지점에서 네비게이션
    };

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
        <AppContainer>
            <S.ScreenTransition $isAnimating={isTransitioning} />
            <BattlePageWrapper>
                <S.TurnIndicator>
                    {gameOver ? '게임 종료' : isUserTurn ? '유저 턴' : `${currentMonster.name} 턴`}
                </S.TurnIndicator>

                <S.TrashWrapper>
                    <S.BorderBox>
                        <S.BorderBoxHeader>
                            <S.HpText>Hp</S.HpText>
                            <S.BorderBoxHeaderName>{currentMonster.name}</S.BorderBoxHeaderName>
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
                            <img src={currentMonster.img} alt={currentMonster.name} />
                        </S.AnimatedTrash>
                        <img src={battleStand} alt="" />
                    </S.ImgWrapper>
                </S.TrashWrapper>
                
                <S.UserWrapper>
                    <S.UserWrapperImg>
                        <S.AnimatedUser $animation={userAnimation}>
                            {gender === 'male' &&    <img src={UserBattleIcon} alt="" style={{position:"relative",top:'10%',left:"9%",zIndex:"1"}} />}
                            {gender === 'female' && <img src={UserBattleFemale} alt="" style={{position:"relative",top:'10%',left:"-5%",zIndex:"1"}} />}
                        </S.AnimatedUser>
                        <img src={battleStand} alt="" />
                    </S.UserWrapperImg>
                    <S.UserWrapperNameHp>
                        <S.BorderBox>
                            <S.BorderBoxHeader>
                                <S.HpText>Hp</S.HpText>
                                <S.BorderBoxHeaderName>유저</S.BorderBoxHeaderName>
                                <S.Lv>Lv:{userLevel}</S.Lv>
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
                                                    {battleMessage.skillName}(으)로 {battleMessage.damage} 데미지!
                                                </S.SkillInfo>
                                            </>
                                        ) : (
                                            <>
                                                <S.VictoryText>{battleMessage.attacker} {battleMessage.skillName}</S.VictoryText>
                                                {battleMessage.exp && <S.ExpGain>{battleMessage.exp} 경험치 획득!</S.ExpGain>}
                                                <S.ResetButton onClick={handleHomeNavigation}>홈으로 가기</S.ResetButton>
                                            </>
                                        )}
                                    </S.BattleMessage>
                                )}
                            </S.BattleMessageContainer>
                        )}
                    </S.SkiilBox>
                </S.SkillBoxWrap>
            </BattlePageWrapper>
        </AppContainer>
    )
}

export default Battle