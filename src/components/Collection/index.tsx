import * as S from './style';
import DownBar from '../DownBar/index'
import imageTest from '../../assets/boy.svg'; // 예시 이미지 경로

const index = () => {
  return (
    <S.Wrap>
        <S.MainWrap>
            <S.HeaderWrap>
                <S.Title>Collection</S.Title>
                <span style={{position:'relative',left:'7%'}}>내가 모은 쓰레기: 72개</span>
            </S.HeaderWrap>
            <S.MainCollectionWrap>
                <S.CollectionBoxWrap>
                    <img src={imageTest} alt="" />
                    <S.CollectionName>환경파괴범세빈</S.CollectionName>
                </S.CollectionBoxWrap>
                <S.CollectionBoxWrap>
                    <img src={imageTest} alt="" />
                    <S.CollectionName>환경파괴범세빈</S.CollectionName>
                </S.CollectionBoxWrap>
                <S.CollectionBoxWrap>
                    <img src={imageTest} alt="" />
                    <S.CollectionName>환경파괴범세빈</S.CollectionName>
                </S.CollectionBoxWrap>
                <S.CollectionBoxWrap>
                    <img src={imageTest} alt="" />
                    <S.CollectionName>환경파괴범세빈</S.CollectionName>
                </S.CollectionBoxWrap>
                <S.CollectionBoxWrap>
                    <img src={imageTest} alt="" />
                    <S.CollectionName>환경파괴범세빈</S.CollectionName>
                </S.CollectionBoxWrap>
                <S.CollectionBoxWrap>
                    <img src={imageTest} alt="" />
                    <S.CollectionName>환경파괴범세빈</S.CollectionName>
                </S.CollectionBoxWrap>
                
            </S.MainCollectionWrap>
            <DownBar/>
        </S.MainWrap>
    </S.Wrap>
  )
}

export default index
