import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Title, ConfirmButton, RedPoly, BluePoly, PolygonWraper, ImgWraper } from './style'
import Boy from '../../assets/boy.svg'
import Girl from '../../assets/girl.svg'

const CharactorSelect = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const navigate = useNavigate()

  const isGirlSelected = selected === 'female';
  const isBoySelected = selected === 'male';
  const dimBoy = isGirlSelected;
  const dimBluePoly = isGirlSelected;
  const dimGirl = isBoySelected;
  const dimRedPoly = isBoySelected;

  const movePage = () => {
    if (selected) {
      alert(`${selected === 'male' ? '남자' : '여자'} 캐릭터가 선택되었습니다!`)
      
      // 캐릭터 선택 완료를 localStorage에 저장
      localStorage.setItem('characterSelected', 'true')
      localStorage.setItem('selectedCharacter', selected)
      
      navigate('/')
    }
  }

  return (
    <Container>
      <Card>
        <Title>캐릭터를 선택하세요</Title>
        <PolygonWraper>
          <RedPoly selected={isGirlSelected} dimmed={dimRedPoly} onClick={() => setSelected('female')} />
          <BluePoly selected={isBoySelected} dimmed={dimBluePoly} onClick={() => setSelected('male')} />
        </PolygonWraper>
        <ImgWraper selectedGirl={isGirlSelected} selectedBoy={isBoySelected} dimBoy={dimBoy} dimGirl={dimGirl}>
          <img src={Girl} alt="여자 캐릭터" onClick={() => setSelected('female')} style={{ cursor: 'pointer' }} />
          <img src={Boy} alt="남자 캐릭터" onClick={() => setSelected('male')} style={{ cursor: 'pointer' }} />
        </ImgWraper>
        <ConfirmButton
          type="button"
          enabled={!!selected}
          disabled={!selected}
          onClick={movePage}
        >
          선택 완료
        </ConfirmButton>
      </Card>
    </Container>
  )
}

export default CharactorSelect
