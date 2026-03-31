import React from "react"
import Logo from '../../assets/Logo.png';
import './SignSucess.css'
export default function SignSucess() {
  return (
    <div>
    <div class="divmcover">
      <div class="loginWrapper">
        <img src={Logo} class="Logo-Img"/>
        
        <div class="divmmm">
        <div class="divmwrapperr_2">
        <p style={{fontWeight : 'bold', fontSize : '20px'}}>환영합니다.</p>
        <p>디자인사이 제품 가입이 완료되었습니다.</p>
        <p>디자인사이 하나로 다양한 서비스를 편리하게 이용해 보세요!</p>

        <button>시작하기</button>
        </div>
        </div>
      </div>

    </div>
    </div>
    
 

  )
}