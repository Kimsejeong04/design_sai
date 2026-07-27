import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from "styled-components";

import { DropDown, Tag, ImageUploader, NextButtonUI, RequestPopup } from "../../../components";
import { TextInputUIManager, TagManager, Modal } from "../../../utils";
import dress from "../../../assets/dress.png";
import MyEditor from "./ui/MyEditor";
import MydesignerPopup from "./MydesignerPopup";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RequestEditor from "./ui/RequestEditor";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const CustomRequestPopup = styled(RequestPopup)``;

const CustomMydesignModal = styled(Modal)`
  height: 700px;
  background-color: white;
  width: 700px;
  overflow: auto;
  padding: 24px;
`;

/* ---------------------------------------------
   레이아웃: 간격은 전부 8px 배수로 통일 (8/16/24/32/40)
--------------------------------------------- */

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 40px;
`;

const Wrapper = styled.div`
  max-width: 880px; 
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  & > *:not(:last-child) {
    margin-bottom: 40px;
  }
  & > *:nth-last-child(2) {
    margin-bottom: 16px;
  }
`;

const CardBase = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  padding: 40px;
  box-sizing: border-box;
`;

const HeaderWrapper = styled(CardBase)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: stretch; /* 하위 Content 들을 가로 꽉 차게 둠 */
  text-align: left;
`;

const DetailAndUploadWrapper = styled(CardBase)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: stretch;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
  color: #222;
`;

/* 🎨 [수정] 라벨 폭을 유동적으로 늘려서 우측 여백 쏠림 해결 */
const RequiredLabel = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  
  /* 기존 160px 고정 폭을 해제하고, Flexbox를 활용해 남은 공간을 밀어냅니다. */
  flex-shrink: 0;
  width: 180px; /* 라벨 자체의 기본 공간 */
  
  &::after {
    content: ${(props) => (props.required ? '"*"' : '""')};
    color: #e5484d;
    margin-left: 4px;
  }
`;

/* 🎨 [수정] Content 박스 자체를 중앙으로 정렬시켜서 시각적 안정감 확보 */
const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* 양쪽 끝이 아닌, 라벨과 입력창을 묶어서 전체 박스의 중앙에 오도록 함 */
  justify-content: center; 
  gap: 24px; /* 라벨과 인풋 사이 간격 */
`;

/* 🎨 공통 넓이(500px) 통일 래퍼 */
const FieldWrapper = styled.div`
  width: 500px;
  flex-shrink: 0;

  & input,
  & select,
  & textarea,
  & button {
    width: 100% !important;
    box-sizing: border-box !important;
  }
`;

const TitleFieldWrapper = styled(FieldWrapper)`
  & > div {
    height: 48px !important; 
    padding: 0 12px !important;
    border-radius: 8px !important;
    border: 1px solid #d0d0d0 !important;
  }
  & input {
    height: 100% !important;
    padding: 0 !important;
  }
`;

const TagManagerWrapper = styled(FieldWrapper)`
  & > div, & > div > div:not(:first-child) {
    width: 100% !important;
    max-width: 100% !important;
  }

  & > div > div:first-child { 
    height: 48px !important;
    padding: 0 12px !important;
    border-radius: 8px !important;
    border: 1px solid #d0d0d0 !important;
  }
  & input {
    height: 100% !important;
    padding: 0 !important;
  }

  & [class*="tag"], & [class*="Tag"], & [class*="item"],
  & > div > div > span, & > div > div > div, 
  & > div > span {
    display: inline-flex !important;
    align-items: center !important;
    background-color: transparent !important; 
    border: none !important;
    border-radius: 0 !important;
    padding: 4px 4px 4px 0 !important;
    margin: 4px 12px 4px 0 !important;
    white-space: nowrap !important; 
    flex-wrap: nowrap !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    color: #333 !important;
  }

  & [class*="tag"]::before, & [class*="Tag"]::before, & [class*="item"]::before,
  & > div > div > span::before, & > div > div > div::before,
  & > div > span::before {
    content: '#';
    color: #888 !important; 
    margin-right: 3px;
    font-weight: bold;
  }

  & button {
    background: transparent !important;
    color: #aaa !important;
    width: 18px !important;
    height: 18px !important;
    min-width: 18px !important; 
    padding: 0 !important;
    margin-left: 2px !important;
    border-radius: 4px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 13px !important;
    cursor: pointer !important;
    transition: background-color 0.2s ease !important;
  }

  & button:hover {
    background-color: #ebebeb !important;
    color: #333 !important;
  }
`;

/* 🎨 [수정] 드롭다운의 이중 테두리 제거 */
const DropDownFieldWrapper = styled(FieldWrapper)`
  position: relative;
  z-index: 10;
  
  /* 기존에 감싸는 쪽에 있던 border를 없애고, 높이(48px)만 DropDown 내부 요소에 맞게 전달되도록 처리 */
  & > div { 
    height: 48px !important; 
    /* 만약 DropDown 내부 컨테이너도 건드려야 한다면 */
  }
  
  & button {
    height: 48px !important;
    border-radius: 8px !important;
    /* 테두리는 DropDown 자체의 것을 쓰거나, 여기서 덮어쓰려면 1번만 적용 */
    border: 1px solid #d0d0d0 !important;
    background-color: white !important;
    display: flex;
    align-items: center;
    padding: 0 12px !important;
  }
`;

const HelperText = styled.span`
  font-size: 13px;
  color: #888;
  margin-top: 4px;
  padding-left: 4px;
  display: block;
`;

const Detail = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > h2 {
    font-size: 20px;
    font-weight: 700;
    color: #222;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const UploadRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const UploadContainer = styled.div`
  display: inline-flex;
  background-color: #fafafa;
  border: 1px dashed #d0d0d0;
  border-radius: 12px;
  gap: 16px;
  padding: 16px;
`;

const CustomUpload = styled(ImageUploader)`
  width: 150px;
  height: 150px;
`;

const AmountFieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CurrencyPrefix = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 15px;
  pointer-events: none;
`;

const MydesignContainer = styled.div`
  background-color: #fafafa;
  border: 1px dashed #d0d0d0; 
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  width: 100%;
  max-width: 500px; /* 입력창 폭 500px과 통일 */
  color: #333;

  img {
    max-width: 100%;
    max-height: 100px;
    object-fit: contain;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  p {
    margin: 4px 0;
    font-size: 14px;
    color: #888;
  }

  h3 {
    margin: 4px 0;
    font-size: 16px;
    font-weight: 700;
  }
`;

/* ---------------------------------------------
   버튼: Primary(의뢰 등록) / Outline(취소) / Ghost(임시 저장)
--------------------------------------------- */
const OutlineButton = styled(NextButtonUI)`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  white-space: nowrap;
  background-color: #fff;
  color: #555;
  font-weight: 500;
  border: 1px solid #d0d0d0;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const CustomOutlineButton = styled(OutlineButton)`
  width: 500px; 
  height: 48px;
  border-radius: 8px;
  padding: 0 12px; 
  justify-content: space-between; 
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 12px;
  padding-right: 0px; 
`;

const PrimaryButton = styled(NextButtonUI)`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  white-space: nowrap;
  background-color: var(--color-primary, #6b8cae);
  color: #fff;
  font-weight: 700;
  padding: 12px 28px;
  border: none;
  border-radius: 8px;

  &:hover {
    filter: brightness(0.92);
  }
`;

const GhostButton = styled(NextButtonUI)`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  white-space: nowrap;
  background: none;
  border: none;
  color: #999;
  font-weight: 500;
  padding: 12px 16px;
  text-decoration: underline;

  &:hover {
    color: #666;
  }
`;

function formatNumberWithCommas(value) {
  const numericValue = value.replace(/[^0-9]/g, '');
  if (!numericValue) return '';
  return Number(numericValue).toLocaleString();
}

const TITLE_MAX_LENGTH = 30;

export default function RequestWriting({ username: propUsername }) {
  const [enteredTags, setEnteredTags] = useState([]);
  const options2 = ["미니멀", "캐주얼", "포멀", "아메카지", "스트리트웨어", "락시크", "빈티지/레트로"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMyDesignModal, setIsMyDesignModal] = useState(false);
  const [files, setFiles] = useState({});
  const [title, setTitle] = useState("");
  const [categoryTags, setCategoryTags] = useState([]);
  const [style, setStyle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [username, setUsername] = useState(propUsername);
  const [designs, setDesigns] = useState([]);
  const [userFiles, setUserFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('template');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const onImageUpload = (index, url) => {
    setImageUrls(prev => {
      const newUrls = [...prev];
      newUrls[index] = url;
      return newUrls;
    });
  };

  const handleAmountChange = (e) => {
    const formatted = formatNumberWithCommas(e.target.value);
    setAmount(formatted);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value.slice(0, TITLE_MAX_LENGTH));
  };

  useEffect(() => {
    if (!propUsername) {
      const fetchSession = async () => {
        try {
          const res = await fetch("http://localhost:8081/api/user", {
            credentials: 'include',
          });
          if (!res.ok) throw new Error("세션 없음");
          const data = await res.json();
          if (data.username) {
            setUsername(data.username);
          } else {
            setLoading(false);
          }
        } catch (err) {
          console.warn("⚠️ 세션 정보 없음:", err);
          setLoading(false);
        }
      };
      fetchSession();
    } else {
      setLoading(false);
    }
  }, [propUsername]);

  useEffect(() => {
    if (username) {
      fetchMyDesigns();
      fetchUserFiles();
    }
  }, [username]);

  const fetchMyDesigns = () => {
    try {
      const mockDesigns = JSON.parse(localStorage.getItem("mockDesigns") || "[]");
      setDesigns(mockDesigns);
    } catch (err) {
      console.error("❌ 디자인 불러오기 실패", err);
      setDesigns([]);
    }
  };

  const fetchUserFiles = async () => {
    if (!username) return;
    try {
      const response = await fetch(`http://localhost:8081/files/userimg?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserFiles(data);
      } else {
        console.error('❌ 파일 가져오기 실패:', response.status);
      }
    } catch (error) {
      console.error('⚠️ 파일 가져오기 에러:', error);
    }
  };

  const handleSubmit = async () => {
    const sanitized = description.replace(/<script[^>]*>[\s\S]*?<\/script>|<style[^>]*>[\s\S]*?<\/style>|<!--[\s\S]*?-->|<[^>]+>/gi, '').trim();

    try {
      const response = await axios.post("http://localhost:8081/api/requests", {
        title,
        categoryTags: categoryTags.join(","),
        style,
        amount,
        deadline,
        description: sanitized,
        selectedItem,
        image1Url: imageUrls[0] || "",
        image2Url: imageUrls[1] || "",
        image3Url: imageUrls[2] || "",
        username
      });
      alert("의뢰가 등록되었습니다!");
      navigate('/client/request');
    } catch (error) {
      console.error("의뢰등록 요청실패 :", error);
      alert("의뢰 등록에 실패했습니다.");
    }
  };

  const filteredDesigns = designs.filter((item) => item.category === selectedCategory);

  const handleCategoryChange = async (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);

    if (selected === 'pattern') {
      await fetchUserFiles();
    } else if (selected === 'template') {
      setUserFiles([]);
      fetchMyDesigns();
    } else {
      setUserFiles([]);
    }
  };

  const handleCardClick = (item) => {
    setSelectedItem({
      ...item,
      imageUrl: item.imageUrl || `http://localhost:8081/files/view/${item.fileName}`
    });
    setIsMyDesignModal(false);
  };

  const formatDateTime = (datetime) => {
    try {
      const date = new Date(datetime);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}년 ${month}월 ${day}일`;
    } catch (e) {
      return '날짜 없음';
    }
  };

  return (
    <Container>
      <Wrapper>
        <HeaderWrapper>
          <Header style={{ paddingLeft: '32px' }}> {/* 🎨 헤더 제목도 시각적 균형을 위해 살짝 우측으로 밉니다 */}
            <img src={dress} alt="sample" style={{ width: 28, height: 28 }} />
            어떠한 옷을 원하세요?
          </Header>

          <Content>
            <RequiredLabel required>글제목</RequiredLabel>
            <TitleFieldWrapper>
              <TextInputUIManager
                value={title}
                onChange={handleTitleChange}
                maxLength={TITLE_MAX_LENGTH}
                placeholder="예시) 디자인 사이"
              />
            </TitleFieldWrapper>
          </Content>

          {/* 🎨 align-items를 지워서 다른 Content들과 정렬(center)을 통일합니다 */}
          <Content> 
            <RequiredLabel required>카테고리</RequiredLabel>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TagManagerWrapper>
                <TagManager
                  placeholder="카테고리"
                  onTagsUpdate={(tags) => setCategoryTags(tags)}
                />
              </TagManagerWrapper>
              <HelperText>* 키워드는 최대 5개까지 입력 가능합니다.</HelperText>
            </div>
          </Content>

          <Content>
            <RequiredLabel required>원하는 스타일</RequiredLabel>
            <DropDownFieldWrapper>
              <DropDown
                options={options2}
                defaultSelected={style || "선택하세요"}
                onChange={(value) => setStyle(value)}
              />
            </DropDownFieldWrapper>
          </Content>

          <Content>
            <RequiredLabel required>원하는 금액</RequiredLabel>
            <FieldWrapper>
              <AmountFieldWrapper>
                <CurrencyPrefix>₩</CurrencyPrefix>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="가격을 입력하세요"
                  style={{
                    width: "100%",
                    height: "48px", 
                    padding: "0 12px 0 28px",
                    fontSize: "15px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "8px",
                    boxSizing: "border-box",
                  }}
                />
              </AmountFieldWrapper>
            </FieldWrapper>
          </Content>

          <Content>
            <RequiredLabel required>희망 마감기한</RequiredLabel>
            <FieldWrapper>
              <input
                type="date"
                value={deadline}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDeadline(e.target.value)}
                style={{
                  width: "100%",
                  height: "48px", 
                  padding: "0 12px",
                  fontSize: "15px",
                  border: "1px solid #d0d0d0",
                  borderRadius: "8px",
                  boxSizing: "border-box",
                }}
              />
            </FieldWrapper>
          </Content>

          <Content>
            <RequiredLabel>내가 제작한 스타일</RequiredLabel>
            <CustomOutlineButton onClick={() => setIsMyDesignModal(true)}>
                <span>선택하세요</span>
            </CustomOutlineButton>
          </Content>

          <Content>
            <RequiredLabel />
            <MydesignContainer>
              {selectedItem ? (
                <>
                  {selectedItem.imageUrl ? (
                    <img src={selectedItem.imageUrl} alt={selectedItem.designName || "디자인"} />
                  ) : (
                    <p>이미지 없음</p>
                  )}
                  <h3>{selectedItem.designName || "디자인"}</h3>
                  <p>{formatDateTime(selectedItem.createdAt || selectedItem.uploadedAt)}</p>
                </>
              ) : (
                <p>디자인을 선택하세요</p>
              )}
            </MydesignContainer>
          </Content>
        </HeaderWrapper>

        <DetailAndUploadWrapper>
          <Detail>
            <h2>상세설명</h2>
            <TagList>
              {enteredTags.map((tag, index) => (
                <Tag key={index} text={tag} onRemove={() => {}} />
              ))}
            </TagList>
          </Detail>

          <RequestEditor
            value={description}
            onChange={(html) => setDescription(html)}
          />

          <UploadRow>
            <UploadContainer>
              <CustomUpload id="upload1" files={files} setFiles={setFiles} onImageUpload={onImageUpload} />
              <CustomUpload id="upload2" files={files} setFiles={setFiles} onImageUpload={onImageUpload} />
              <CustomUpload id="upload3" files={files} setFiles={setFiles} onImageUpload={onImageUpload} />
            </UploadContainer>
          </UploadRow>
        </DetailAndUploadWrapper>

        <Footer>
          <GhostButton onClick={() => alert("임시 저장되었습니다!")}>임시 저장</GhostButton>
          <OutlineButton to="/client/Request">취소</OutlineButton>
          <PrimaryButton onClick={handleSubmit}>의뢰 등록</PrimaryButton>
        </Footer>
      </Wrapper>

      {isModalOpen && (
        <CustomRequestPopup
          onClose={() => setIsModalOpen(false)}
          data={{ title, categoryTags, style, amount, deadline, description }}
        />
      )}

      {isMyDesignModal && (
        <CustomMydesignModal onClose={() => setIsMyDesignModal(false)}>
          <div className="dropdown">
            <select onChange={handleCategoryChange} value={selectedCategory}>
              <option value="template">템플릿 디자인</option>
              <option value="pattern">의류 패턴 설계도 디자인</option>
              <option value="brand">브랜드 샘플 디자인</option>
            </select>
          </div>

          <div>
            {selectedCategory === 'template' && (
              filteredDesigns.length === 0 ? (
                <p>해당 카테고리에 저장된 디자인이 없습니다.</p>
              ) : (
                <div style={{ justifyContent: "center" }} className="card-container">
                  {filteredDesigns.map((item) => (
                    <div key={item.designId} className="card" onClick={() => handleCardClick(item)}>
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.designName}
                          className="card-image"
                          style={{ width: "100%", height: "auto" }}
                        />
                      ) : (
                        <div>이미지 없음</div>
                      )}
                      <h3>{item.designName}</h3>
                      <p>{formatDateTime(item.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )
            )}

            {selectedCategory === 'pattern' && (
              userFiles.length === 0 ? (
                <p>해당 카테고리에 저장된 파일이 없습니다.</p>
              ) : (
                <div style={{ justifyContent: "center" }} className="card-container">
                  {userFiles.map((item) => (
                    <div key={item.fileName} className="card" onClick={() => handleCardClick(item)}>
                      <img
                        src={`http://localhost:8081/files/view/${item.fileName}`}
                        alt="디자인"
                        className="card-image"
                        style={{ width: "100%", height: "auto" }}
                      />
                      <h3>디자인</h3>
                      <p>{formatDateTime(item.uploadedAt)}</p>
                    </div>
                  ))}
                </div>
              )
            )}

            {selectedCategory === 'brand' && (
              <p>브랜드 샘플 디자인은 현재 지원되지 않습니다.</p>
            )}
          </div>
        </CustomMydesignModal>
      )}
    </Container>
  );
}