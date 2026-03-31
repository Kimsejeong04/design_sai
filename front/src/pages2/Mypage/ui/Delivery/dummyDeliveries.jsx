const dummyDeliveries = [
  {
    date: '2025-06-04',
    status: '작업진행중',
    imageUrl: '/image/brandDesign/브랜드디자인1.jpg',
    customerName: '홍길동',
    orderTitle: '탑꾸 3종세트',
    price: '16,000원',
    deadline: '6월 10일',
    contractId: 'abc123',
    isShipped: false,
  },
  {
    date: '2025-06-01',
    status: '배송중',
    imageUrl: '/image/brandDesign/브랜드디자인3.jpg',
    customerName: '김민지',
    orderTitle: '포카 커스텀',
    price: '14,000원',
    deadline: '6월 8일',
    contractId: 'xyz789',
    isShipped: true,
  },
  {
    date: '2025-05-30',
    status: '배송완료',
    imageUrl: '/image/brandDesign/브랜드디자인2.jpg',
    customerName: '박서연',
    orderTitle: '리뉴얼 디자인',
    price: '20,000원',
    deadline: '6월 5일',
    contractId: 'def456',
    isShipped: true,
  },
];

export default dummyDeliveries;
