import { AppContainer, PageWrapper } from '../../styles/common'
import * as S from './style';
import DownBar from '../DownBar/index'
import imageTest from '../../assets/boy.svg'; // 예시 이미지 경로
import { useEffect, useState, useRef } from 'react';

const API_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL;

interface CollectionItem {
    id: number;
    name: string;
    image: string;
    description?: string;
}

const Index = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [collectionItems, setCollectionItems] = useState<CollectionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [trashCount, setTrashCount] = useState(0);

    const handleScroll = () => {
        if (scrollRef.current && scrollRef.current.scrollTop > 0) {
            setHasScrolled(true);
        }
    };

    useEffect(() => {
        const onSubmit = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const tokenType = localStorage.getItem('tokenType') || 'Bearer';
            
            if (!accessToken) {
                alert('로그인이 필요합니다.');
                window.location.href = '/login';
                return;
            } else{
                try{
                    const res = await fetch(`${API_URL}/collection`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${tokenType} ${accessToken}`,
                        },
                    })
                    const data = await res.json();
                    if(res.ok && data) {
                        console.log("서버에서 컬렉션 목록이 왔습니다.", data);
                        // 서버 응답 구조에 따라 데이터 설정
                        if (data.collection) {
                            setCollectionItems(data.collection);
                        } else if (Array.isArray(data)) {
                            setCollectionItems(data);
                        }
                        
                        // 쓰레기 개수 설정
                        if (data.totalTrashCount !== undefined) {
                            setTrashCount(data.totalTrashCount);
                        } else if (data.collection) {
                            setTrashCount(data.collection.length);
                        } else if (Array.isArray(data)) {
                            setTrashCount(data.length);
                        }
                    } else {
                        console.log("인증에 실패했습니다. 다시 로그인해주세요.");
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        localStorage.removeItem('tokenType');
                        window.location.href = '/login';
                    }
                } catch(err){
                    console.log("서버에서 컬렉션 목록을 가져오는 중 오류가 발생했습니다.", err);
                    // 네트워크 오류 등으로 인해 실패한 경우 로그인 페이지로 보내지 않음
                } finally {
                    setLoading(false);
                }
            }

        }
        onSubmit();
    },[])

  return (
    <AppContainer>
        <PageWrapper>
            <S.MainWrap>
                <S.HeaderWrap>
                    <S.Title>Collection</S.Title>
                    <S.TrashCountDisplay>
                        <S.TrashCountText>내가 모은 쓰레기:</S.TrashCountText>
                        <S.TrashCountNumber>{trashCount}개</S.TrashCountNumber>
                    </S.TrashCountDisplay>
                </S.HeaderWrap>
                <S.MainCollectionWrap ref={scrollRef} onScroll={handleScroll} $hasScrolled={hasScrolled || collectionItems.length === 0}>
                    {loading ? (
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            width: '100%', 
                            height: '200px',
                            fontFamily: "'Press Start 2P', cursive",
                            fontSize: '12px',
                            color: '#666'
                        }}>
                            로딩 중...
                        </div>
                    ) : collectionItems.length > 0 ? (
                        collectionItems.map((item) => (
                            <S.CollectionBoxWrap key={item.id}>
                                <img 
                                    src={item.image || imageTest} 
                                    alt={item.name}
                                    onError={(e) => {
                                        e.currentTarget.src = imageTest;
                                    }}
                                />
                                <S.CollectionName>{item.name}</S.CollectionName>
                            </S.CollectionBoxWrap>
                        ))
                    ) : (
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            width: '100%', 
                            height: '200px',
                            fontFamily: "'Press Start 2P', cursive",
                            fontSize: '18px',
                            color: '#888',
                            textAlign: 'center',
                            lineHeight: '1.5'
                        }}>
                            아직 수집한 쓰레기가 없습니다.<br/>
                            쓰레기를 잡아보세요!
                        </div>
                    )}
                </S.MainCollectionWrap>
                <DownBar/>
            </S.MainWrap>
        </PageWrapper>
    </AppContainer>
    )
}

export default Index
