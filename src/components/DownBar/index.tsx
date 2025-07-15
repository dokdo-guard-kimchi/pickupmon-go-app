import React from 'react'
import * as S from './style';
import CollectionIcon from '../../assets/CollectiionIcon.svg'; 
import HomeIcon from '../../assets/homeIcon.svg'


const DownBar = () => {
  return (
    <div>
      <S.MainWrap>
        <S.Box>
            <img src={CollectionIcon} alt="" />
            <span>도감</span>
        </S.Box>
        <S.Box>
            <img src={HomeIcon} alt="" />
            <span>홈</span>
        </S.Box>

      </S.MainWrap>
    </div>
  )
}

export default DownBar
