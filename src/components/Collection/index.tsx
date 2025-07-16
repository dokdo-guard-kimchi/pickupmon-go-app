import { AppContainer, PageWrapper } from '../../styles/common'
import * as S from './style';
import DownBar from '../DownBar/index'
import imageTest from '../../assets/boy.svg'; // 예시 이미지 경로
import { useState, useRef } from 'react';

const Index = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollRef.current && scrollRef.current.scrollTop > 0) {
            setHasScrolled(true);
        }
    };

    return (
    <AppContainer>
        <PageWrapper>
            <S.MainWrap>
            <S.HeaderWrap>
                <S.Title>Collection</S.Title>
                <S.TrashCountDisplay>
                    <S.TrashCountText>내가 모은 쓰레기:</S.TrashCountText>
                    <S.TrashCountNumber>72개</S.TrashCountNumber>
                </S.TrashCountDisplay>
            </S.HeaderWrap>
            <S.MainCollectionWrap ref={scrollRef} onScroll={handleScroll} $hasScrolled={hasScrolled}>
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
        </PageWrapper>
    </AppContainer>
    )
}

export default Index
