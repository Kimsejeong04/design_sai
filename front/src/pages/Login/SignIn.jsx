import React from 'react'
import './SignIncss.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png'
import Check from '../../assets/Check.png'
import Check2 from '../../assets/Check2.png'
export default function SignIn() {
  const navigate = useNavigate();
  const handleSelectType = (type) => {
    navigate('/SignIn2', { state: { userType: type } }); // 선택한 유형을 state로 전달
  };
  return (
    <div>

      <div className='divmcover1'>
        <div className='loginWrapper'>
        <img src={Logo} alt="로고" className='Logo-Img'/>
        <div className='divm-wrapperr'>
          <div className='divmmm'>
            <p style={{fontSize:'25px'}}>
            디자인사이에서 어떤 서비스를<br/>
            이용하고 싶으세요?
            </p>
            <p style={{fontSize:'15px'}}>원하는 회원가입 유형을 선택하세요!</p>
            <br/>
            <br/>
            <font size="2"> 서비스를 의뢰하고싶다면</font>
            <br/>
            <button style={{ marginTop: '10px' }} onClick={() =>  handleSelectType('client')} className='mainbarooo'>
              <img src={Check} alt="체크" className="check-icon" />
              의뢰인으로 가입
            </button>

            <br/>
            <font size="2">옷을 제작할 디자이너시라면</font>
            <br/>
            <button style = {{marginTop:'10px'}} onClick={() =>handleSelectType('designer')} className='mainbarooo'>
              <img src={Check2} alt="체크" className="check-icon" />
              디자이너로 가입
            </button>


          </div>

        </div>
        </div>

      </div>
</div>
  )
}