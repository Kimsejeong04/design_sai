import React from "react";
import { useNavigate } from "react-router-dom";
import "./Content.css"; // 필요한 스타일링 파일
        
const Content = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용해 navigate 함수 생성

    const handleSave = () => {
        console.log("디자인이 저장되었습니다!");
        alert("디자인이 저장되었습니다!");
        navigate('/client/Cosmain');  // 저장 후 '/Cosmain' 페이지로 이동
    };

    return(
        <div className="Content">
            {/* 본문 영역 */}
            <main className="content">
            <br />

            {/* 디자인 이름 입력 */}
            <div className="finalheader" style={{fontSize:'23px', marginBottom:'10px'}}>
                <label className="design-name" style={{marginRight:'80px', marginBottom:'10px', fontWeight:'bold'}}>
                    디자인 이름<span className="required">*</span>
                </label>
                    <input style={{marginBottom:'10px', width:'300px', borderRadius: '5px', border: '1px solid #ccc', padding: '10px'}} type="text" placeholder="디자인 이름을 입력해주세요." />

                <div className="options">
                    <span style={{marginRight:'125px', fontWeight:'bold'}}>원단명:</span>
                    <span>원단1</span> 
                    <br/>

                    <span style={{marginRight:'145px', fontWeight:'bold'}}>색상:</span>
                    <span>Red</span> 
                    <br/>

                    <span style={{marginRight:'95px', fontWeight:'bold'}}>의류 종류:</span>
                    <span>상의</span>
                </div>
            </div>

            {/* 옷 이미지 & 치수 테이블 */}
            <div className="design-preview">
                <img src="/image/size.png" alt="옷 치수 이미지" />
                <div className="design-table">
                    <thead>
                        <tr>
                            <th colSpan="2">단위(cm)</th>
                            <th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>2XL</th><th>3XL</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>A</td>
                        <td>총 기장</td>
                        <td>20.0</td><td>21.5</td><td>23.0</td><td>24.5</td><td>26.0</td><td>27.5</td><td>29.0</td>
                    </tr>
                    <tr>
                        <td>B</td>
                        <td>가슴 단면</td>
                        <td>33.0</td><td>38.0</td><td>41.0</td><td>43.0</td><td>45.0</td><td>48.0</td><td>49.0</td>
                    </tr>
                    <tr>
                        <td>C</td>
                        <td>밑단 단면</td>
                        <td>44.0</td><td>46.5</td><td>49.0</td><td>51.5</td><td>54.0</td><td>56.5</td><td>59.0</td>
                    </tr>
                    <tr>
                        <td>D</td>
                        <td>소매 기장</td>
                        <td>33.0</td><td>33.5</td><td>34.0</td><td>34.5</td><td>35.0</td><td>35.5</td><td>36.0</td>
                    </tr>
                    <tr>
                        <td>E</td>
                        <td>어깨 단면</td>
                        <td>27.0</td><td>29.5</td><td>32.0</td><td>37.0</td><td>39.5</td><td>42.0</td><td>36.0</td>
                    </tr>
                    <tr>
                        <td>F</td>
                        <td>허리 단면</td>
                        <td>33.0</td><td>35.5</td><td>38.0</td><td>40.5</td><td>43.0</td><td>45.5</td><td>48.0</td>
                    </tr>
                    <tr>
                        <td>G</td>
                        <td>암홀(직선)</td>
                        <td>33.0</td><td>33.5</td><td>34.0</td><td>34.5</td><td>35.0</td><td>35.5</td><td>36.0</td>
                    </tr>
                    <tr>
                        <td>H</td>
                        <td>소매단 단면</td>
                        <td>33.0</td><td>33.5</td><td>34.0</td><td>34.5</td><td>35.0</td><td>35.5</td><td>36.0</td>
                    </tr>
                    <tr>
                        <td>I</td>
                        <td>소매통 단면</td>
                        <td>33.0</td><td>33.5</td><td>34.0</td><td>34.5</td><td>35.0</td><td>35.5</td><td>36.0</td>
                    </tr>
                    <tr>
                        <td>J</td>
                        <td>목 너비</td>
                        <td colspan="7">디자인 / 디테일 선택 후, 별도 산출</td>
                    </tr>
                    <tr>
                        <td>K</td>
                        <td>목 파임</td>
                        <td colspan="7">디자인 / 디테일 선택 후, 별도 산출</td>
                    </tr>
                </tbody>
                </div>
            </div>

            {/* 버튼 */}
            <div className="button-group">
                <button className="back-btn">이전</button>
                <button className="save-btn" onClick={handleSave}>저장하기</button>
            </div>
            </main>
        </div>
    ); 
};
export default Content;