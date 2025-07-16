import { AppContainer, PageWrapper } from '../../styles/common'
import * as S from './style';
import DownBar from '../DownBar/index'
import imageTest from '../../assets/boy.svg'; // 예시 이미지 경로
import { useEffect,useState} from 'react';

const index = () => {
    const [info, setInfo] = useState([
        {name:'string', image:'string'}
    ])


    useEffect(() => {
        const onSubmit = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('로그인이 필요합니다.');
                window.location.href = '/login';
                return;
            } else{
                try{
                    const res = await fetch(`${process.env.REACT_APP_API_URL}/collection`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    if(res && res.data) {
                        console.log("서버에서 컬렉션 목록이 왔습니다.",res.data);
                    }
                } catch(err){
                    console.log("서버에서 컬렉션 목록을 가져오는 중 오류가 발생했습니다.", err);
                }
            }

        }
        onSubmit();
    },[])

  return (
    <S.Wrap>
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
