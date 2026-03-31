import React from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  width: 250px;
  align-items: center;
  display: flex;
  margin-top: 30px;
`;

const MenuNav = styled.nav`
  width: 100%;
`;

const MainMenuList = styled.ul`
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  list-style: none;
  line-height: 60px;
  padding-left: 5px;
  border-bottom: 2px solid #799FC4;
  
  &:first-child {
    border-top: 2px solid #799FC4;
  }
`;

const MenuLink = styled.a`
  width: 233px;
  text-decoration: none;
  display: block;
  color: black;
  font-weight: bold;
`;

const SubMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  visibility: hidden;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  ${MenuItem}:hover & {
    max-height: 300px;
    visibility: visible;
    opacity: 1;
    display: block;
  }
`;

const SubMenuLink = styled(MenuLink)`
  color: #838383;
  font-weight: normal;  // 글자 두께를 얇게 설정
`;

export default function SideMenuBar() {
  const menuItems = [
    { main: '상의 Top', sub: ['티셔츠', '블라우스', '셔츠', '니트', '탑'] },
    { main: '아우터 Outer', sub: ['코트', '자켓', '패딩', '트렌치코트', '블루종'] },
    { main: '바지 Pants', sub: ['청바지', '슬랙스', '조거 팬츠', '레깅스', '반바지'] },
    { main: '원피스 Onepiece', sub: ['미니 원피스', '맥시 원피스', '셔츠 원피스', '롱 원피스', '튜닉'] },
    { main: '스커트 Skirt', sub: ['미니스커트', '플리츠 스커트', 'A라인 스커트', '롱 스커트', '펜슬 스커트'] },
    { main: '스니커즈 Sneakers', sub: ['운동화', '에어맥스', '스케이트보드 슈즈', '런닝화', '슬립온'] },
    { main: '신발 Shoes', sub: ['힐', '로퍼', '부츠', '샌들', '플랫 슈즈'] },
    { main: '가방 Bag', sub: ['백팩', '토트백', '크로스백', '클러치백', '숄더백'] },
  ];

  return (
    <MenuContainer>
      <MenuNav>
        <MainMenuList>
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              <MenuLink href="#">{item.main}</MenuLink>
              <SubMenu>
                {item.sub.map((subItem, subIndex) => (
                  <MenuItem key={subIndex}>
                    <SubMenuLink href="#">{subItem}</SubMenuLink>
                  </MenuItem>
                ))}
              </SubMenu>
            </MenuItem>
          ))}
        </MainMenuList>
      </MenuNav>
    </MenuContainer>
  );
}
