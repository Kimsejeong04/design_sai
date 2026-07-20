import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Mainpcss.css';

export default function Mainp() {
  const navigate = useNavigate();
  return (
    <div className='maincover'>

      <div className='hero-section'>
        <div className='MainLogo'>
          <img src="image/image.png" alt="디자인사이로고" />
        </div>
        <p className='hero-copy'>의뢰인과 디자이너를 잇는 패션 플랫폼</p>
        <span className='hero-badge'>✦ 지금 무료로 시작해보세요</span>
      </div>

      <div className='divm-wrapper'>
        <div className='divm' onClick={() => navigate('/client/Cosmain')}>
          <div className='divm-top'>
            <img src="image/image51.png" alt="의뢰인 이미지" className='divm-img' />
            <p className='divm-title'>의뢰인으로 시작하기</p>
            <p className='divm-sub'>원하는 디자인을 맡겨보세요</p>
          </div>
          <div className='divm-arrow'>→</div>
        </div>

        <div className='divm divm-b' onClick={() => navigate('/designer/DesignerCosMain')}>
          <div className='divm-top'>
            <img src="image/Group 30.png" alt="디자이너 이미지" className='divm-img' />
            <p className='divm-title'>디자이너로 시작하기</p>
            <p className='divm-sub'>나만의 포트폴리오를 보여주세요</p>
          </div>
          <div className='divm-arrow'>→</div>
        </div>
      </div>

      <div className='extra-section'>
        <button className='mainbaro2 mainbaro2-primary' onClick={() => navigate('/Welcome')}>
          로그인
        </button>
        <button className='mainbaro2' onClick={() => navigate('/SignIn')}>
          회원가입
        </button>
        <span className='footer-divider'>|</span>
        <button className='mainbaro2'>
          고객센터
        </button>
      </div>

    </div>
  );
}