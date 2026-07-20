import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './GoodSignUpcss.css';

export default function GoodSignUp() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail") || "이메일 없음";
    const storedName = localStorage.getItem("signupName") || "이름 없음";
    const storedUsername = localStorage.getItem("signupUsername");
    const storedPass = localStorage.getItem("signupPass");

    setSignupEmail(storedEmail);
    setSignupName(storedName);
    setUserName(storedUsername);
    setPassword(storedPass);
    localStorage.setItem("name", storedName);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#BFD7EE', '#378ADD', '#85B7EB', '#185FA5', '#B5D4F4', '#ffffff', '#63B3ED', '#2B6CB0'];

    class Piece {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = Math.random() * 5 + 4;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.vx = (Math.random() - 0.5) * 9;
        this.vy = Math.random() * -12 - 6;
        this.gravity = 0.35;
        this.spin = (Math.random() - 0.5) * 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
        this.w = Math.random() * 8 + 5;
        this.h = Math.random() * 5 + 3;
        this.alpha = 1;
        this.decay = Math.random() * 0.012 + 0.008;
      }
      update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.spin;
        this.alpha -= this.decay;
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        if (this.shape === 'rect') {
          ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.r / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    let pieces = [];
    let animId;
    let burst = 0;

    const spawnBurst = (x, y, count) => {
      for (let i = 0; i < count; i++) pieces.push(new Piece(x, y));
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces = pieces.filter(p => p.alpha > 0);
      pieces.forEach(p => { p.update(); p.draw(ctx); });
      animId = requestAnimationFrame(loop);
      if (pieces.length === 0 && burst >= 5) cancelAnimationFrame(animId);
    };

    const fireworks = () => {
      const w = canvas.width;
      const h = canvas.height;
      const positions = [
        [w * 0.2, h * 0.35],
        [w * 0.8, h * 0.35],
        [w * 0.5, h * 0.25],
      ];
      positions.forEach(([x, y], i) => {
        setTimeout(() => {
          spawnBurst(x, y, 70);
          burst++;
        }, i * 280);
      });
      setTimeout(() => {
        spawnBurst(w * 0.15, h * 0.5, 50);
        spawnBurst(w * 0.85, h * 0.5, 50);
        burst += 2;
      }, 700);
    };

    loop();
    const timer = setTimeout(fireworks, 400);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const redirecToRight = async () => {
    console.log("로그인 시도: ", username, password);
    try {
      const response = await fetch(`http://localhost:8081/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) return;

      const data = await response.json();

      if (data.usertype === "designer") {
        navigate("/designer/DesignerCosMain");
      } else if (data.usertype === "client") {
        navigate("/client/Cosmain");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("리디렉 요청 오류:", error);
    }
  };

  return (
    <div className="gs-outer">
      <canvas ref={canvasRef} className="gs-canvas"></canvas>
      <div className="gs-card">
        <div className="gs-check-wrap">
          <svg className="gs-check-icon" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="gs-title">환영합니다!</p>
        <p className="gs-desc">
          디자인사이 계정 가입이 완료되었습니다.<br />
          하나의 계정으로 다양한 서비스를 편리하게 이용해 보세요.
        </p>
        <div className="gs-user-box">
          <p className="gs-email">{signupEmail}</p>
          <p className="gs-name">{signupName}</p>
        </div>
        <button className="gs-btn" onClick={redirecToRight}>
          시작하기 →
        </button>
      </div>
    </div>
  );
}