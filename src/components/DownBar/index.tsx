import React from 'react'
import * as S from './style';
import CollectionIcon from '../../assets/CollectiionIcon.svg'; 
import HomeIcon from '../../assets/homeIcon.svg'
import { useNavigate } from 'react-router-dom';

const DownBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <S.MainWrap>
        <S.Box>
            <img src={CollectionIcon} alt="" />
            <span onClick={() => navigate('./Collection')}>도감</span>
        </S.Box>
        <S.Box onClick={() => navigate('/')}>
            <img src={HomeIcon} alt="" />
            <span>홈</span>
        </S.Box>

      </S.MainWrap>
    </div>
  )
}

export default DownBar
