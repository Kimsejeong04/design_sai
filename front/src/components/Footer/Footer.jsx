import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-buttons">
          <a href="/customer" className="footer-button">고객센터</a>
          <a href="/expert" className="footer-button">전문가센터</a>
          <p className="footer-time">10:30 ~ 18:00 (점심시간 13:00 ~ 14:00)<br />주말, 공휴일 휴무</p>
          <div className="footer-notice">
            <span className="footer-notice-icon">💬</span>
            여기는 서비스 중개 플랫폼이에요. <br />작업 의뢰는 전문가에게 문의해 주세요.
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>정보</h4>
            <ul>
              <li><a href="/intro">서비스 소개</a></li>
              <li><a href="/recruit">인재영입</a></li>
              <li><a href="/ad">제휴 광고</a></li>
            </ul>
          </div>
          <div>
            <h4>관련 사이트</h4>
            <ul>
              <li><a href="/blog">블로그</a></li>
              <li><a href="/instagram">인스타그램</a></li>
              <li><a href="/youtube">유튜브</a></li>
            </ul>
          </div>
          <div>
            <h4>지원</h4>
            <ul>
              <li><a href="/notice">공지사항</a></li>
              <li><a href="/faq">자주 묻는 질문</a></li>
              <li><a href="/policy">약관 및 정책</a></li>
              <li><a href="/privacy"><strong>개인정보처리방침</strong></a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          (주)디자인 사이 | 경기도 부천시 원미구 신흥로56번길 25, 6층 | 팀장 : 박찬호 | 팀원 : 주호석, 김세정, 양수정 | 사업자등록번호 : 123-45-67891
          <br />
          통신판매업신고 : 2025-부천시초-1234 | 유료직업소개사업등록번호 : 제2025-12345678-91-0-12345호 | 고객센터 : 1234-1234 | 호스팅 사업자 : Bucheon(Bu) | 1:1 문의하기
          <br /><br />
          (주)디자인 사이는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매회원에게 있습니다.
          <br />
          (주)디자인 사이의 상품/판매회원/중개 서비스/거래 정보, 콘텐츠, UI 등에 대한 무단복제, 전송, 배포, 스크래핑 등의 행위는 저작권법, 콘텐츠산업 진흥법 등 관련법령에 의하여 엄격히 금지됩니다.
        </p>
        <p className="copyright">COPYRIGHT© 2025 DISIGNSAI. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
