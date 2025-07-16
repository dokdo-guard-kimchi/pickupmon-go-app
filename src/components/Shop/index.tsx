import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  Header,
  Title,
  GoldDisplay,
  GoldIcon,
  GoldAmount,
  BackButton,
  ItemGrid,
  ItemCard,
  ItemIcon,
  ItemName,
  ItemDescription,
  ItemPrice,
  BuyButton
} from './style'

interface ShopItem {
  id: number
  name: string
  description: string
  icon: string
  price: number
  category: string
}

const Shop = () => {
  const navigate = useNavigate()
  const [gold, setGold] = useState<number>(0)

  const shopItems: ShopItem[] = [
    {
      id: 1,
      name: '체력 포션',
      description: '체력을 50 회복합니다',
      icon: '🧪',
      price: 100,
      category: 'potion'
    },
    {
      id: 2,
      name: '마나 포션',
      description: '마나를 30 회복합니다',
      icon: '💙',
      price: 80,
      category: 'potion'
    },
    {
      id: 3,
      name: '공격력 강화',
      description: '공격력을 10 증가시킵니다',
      icon: '⚔️',
      price: 250,
      category: 'upgrade'
    },
    {
      id: 4,
      name: '방어력 강화',
      description: '방어력을 8 증가시킵니다',
      icon: '🛡️',
      price: 200,
      category: 'upgrade'
    },
    {
      id: 5,
      name: '경험치 부스터',
      description: '다음 전투에서 경험치 2배',
      icon: '⭐',
      price: 150,
      category: 'boost'
    },
    {
      id: 6,
      name: '골드 부스터',
      description: '다음 전투에서 골드 2배',
      icon: '💰',
      price: 180,
      category: 'boost'
    },
    {
      id: 7,
      name: '신비한 열쇠',
      description: '특별한 던전을 열 수 있습니다',
      icon: '🗝️',
      price: 500,
      category: 'special'
    },
    {
      id: 8,
      name: '치유의 구슬',
      description: '모든 상태이상을 치료합니다',
      icon: '🔮',
      price: 300,
      category: 'special'
    }
  ]

  useEffect(() => {
    const storedGold = localStorage.getItem('playerGold')
    if (storedGold) {
      setGold(parseInt(storedGold))
    } else {
      localStorage.setItem('playerGold', '500')
      setGold(500)
    }
  }, [])

  const updateGold = (newAmount: number) => {
    setGold(newAmount)
    localStorage.setItem('playerGold', newAmount.toString())
  }

  const handleBuyItem = (item: ShopItem) => {
    if (gold >= item.price) {
      updateGold(gold - item.price)
      
      const inventory = JSON.parse(localStorage.getItem('playerInventory') || '[]')
      const existingItem = inventory.find((invItem: any) => invItem.id === item.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        inventory.push({ ...item, quantity: 1 })
      }
      
      localStorage.setItem('playerInventory', JSON.stringify(inventory))
      
      alert(`${item.name}을(를) 구매했습니다!`)
    } else {
      alert('골드가 부족합니다!')
    }
  }

  return (
    <Container>
      <Card>
        <BackButton onClick={() => navigate('/')}>← 뒤로가기</BackButton>
        
        <Header>
          <Title>상점</Title>
          <GoldDisplay>
            <GoldIcon>💰</GoldIcon>
            <GoldAmount>{gold.toLocaleString()}</GoldAmount>
          </GoldDisplay>
        </Header>

        <ItemGrid>
          {shopItems.map((item) => (
            <ItemCard key={item.id}>
              <ItemIcon>{item.icon}</ItemIcon>
              <ItemName>{item.name}</ItemName>
              <ItemDescription>{item.description}</ItemDescription>
              <ItemPrice>
                <GoldIcon>💰</GoldIcon>
                {item.price}
              </ItemPrice>
              <BuyButton
                disabled={gold < item.price}
                onClick={() => handleBuyItem(item)}
              >
                {gold >= item.price ? '구매' : '골드 부족'}
              </BuyButton>
            </ItemCard>
          ))}
        </ItemGrid>
      </Card>
    </Container>
  )
}

export default Shop