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
  padding: 20px;
`;

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  align-items: center;
  text-align: center;
`;

const DetailAndUploadWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  margin: 50px 0;
  gap: 10px;
  font-size: 30px;
`;

const RequiredLabel = styled.label`
  font-size: 20px;
  font-weight: bold;
  width: 150px;
  flex-shrink: 0;
  white-space: nowrap;
  &::after {
    content: ${(props) => (props.required ? '"*"' : '""')};
    color: red;
    margin-left: 4px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 70px;
  gap: 20px;

  & > *:nth-child(2) {
    width: 500px;
    flex-shrink: 0;
  }
`;

const Detail = styled.div`
  margin-top: 20px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 70px;
  gap: 20px;
  align-items: center;
`;

const CustomUpload = styled(ImageUploader)`
  width: 150px;
  height: 150px;
`;

const UploadContainer = styled.div`
  background-color: white;
  border: 1px dashed #ccc;
  border-radius: 10px;
  display: flex;
  padding: 20px;
  width: 600px;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 22%;
`;

const MydesignContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  width: 100%;
  max-width: 500px;
  color: #333;

  img {
    max-width: 100%;
    max-height: 100px;
    object-fit: contain;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
  }

  h3 {
    margin: 5px 0;
    font-size: 16px;
    font-weight: bold;
  }
`;

function formatNumberWithCommas(value) {
  const numericValue = value.replace(/[^0-9]/g, '');
  if (!numericValue) return '';
  return Number(numericValue).toLocaleString();
}

export default function RequestWriting({ username: propUsername }) {
  const [enteredTags, setEnteredTags] = useState([]);
  const options = ["2025-05-01", "2025-06-01", "2025-07-01"];
  const options2 = ["미니멀", "캐주얼", "포멀","아메카지","스트리트웨어","락시크","빈티지/레트로" ];
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
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 카드 항목
  const [rawAmount, setRawAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const draftId = new URLSearchParams(location.search).get("draftId");

  //console.log("현재 draftId:", draftId);

  const onImageUpload = (index, url) => {
    setImageUrls(prev => {
      const newUrls = [...prev];
      newUrls[index] = url;
      return newUrls;
    });
  };

  /* "원하는 금액" 쉼표 */
  const handleAmountChange = (e) => {
    const formatted = formatNumberWithCommas(e.target.value);
    setAmount(formatted);
  };


useEffect(() => {
    if (!propUsername) {
      const fetchSession = async () => {
        try {
          const res = await fetch("http://localhost:8081/api/user", {
            credentials: 'include', // 세션 쿠키 포함
          });
          if (!res.ok) throw new Error("세션 없음");
          const data = await res.json();
          if (data.username) {
            console.log("✅ 세션에서 username 획득:", data.username);
            setUsername(data.username);
          } else {
            console.warn("❗ 세션은 있지만 username 없음");
            setLoading(false);
          }
        } catch (err) {
          console.warn("⚠️ 세션 정보 없음:", err);
          setLoading(false);
        }
      };
      fetchSession();
    } else {
      setLoading(false); // props로 username이 주어진 경우 바로 false 처리
    }
  }, [propUsername]);

  const handleFileChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0];
    setFiles(newFiles);
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
            console.log("✅ 세션에서 username 획득:", data.username);
            setUsername(data.username);
          } else {
            console.warn("❗ 세션은 있지만 username 없음");
          }
        } catch (err) {
          console.warn("⚠️ 세션 정보 없음:", err);
        }
      };
      fetchSession();
    }
  }, [propUsername]);

  useEffect(() => {
    if (username) {
      console.log("📦 fetchMyDesigns 호출, 현재 username:", username);
      fetchMyDesigns();
      console.log("📂 fetchUserFiles 호출, 현재 username:", username);
      fetchUserFiles();
    }
  }, [username]);

  const fetchMyDesigns = async () => {
  if (!username) {
    console.error("🛑 사용자 이름이 없어 디자인을 가져올 수 없습니다.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8081/api/designs/mydesigns",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("디자인 조회 실패");
    }

    const data = await response.json();

    console.log("🎨 서버에서 가져온 내 디자인:", data);

    setDesigns(data);
  } catch (error) {
    console.error("❌ 내 디자인 조회 실패:", error);
    setDesigns([]);
  }
};


useEffect(() => {
  if(!draftId) return;

  const fetchDraft = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/requests/${draftId}`
      );

      console.log("불러온 임시저장 데이터:", response.data);

      setTitle(response.data.title);
      setCategoryTags(response.data.categoryTags 
        ? response.data.categoryTags.split(",")
        : []
      );
      setStyle(response.data.style || "");
      setImageUrls([
        response.data.image1Url
          ? `http://localhost:8081/api/requests${response.data.image1Url}`
          : "",
        response.data.image2Url
          ? `http://localhost:8081/api/requests${response.data.image2Url}`
          : "",
        response.data.image3Url
          ? `http://localhost:8081/api/requests${response.data.image3Url}`
          : ""
      ]);
      setAmount(response.data.amount);
      setDeadline(response.data.deadline);
      setDescription(response.data.description);
    } catch (error){
      console.error("임시저장 데이터 조회 실패:", error);
    }
  };

  fetchDraft();
}, [draftId]);

  const fetchUserFiles = async () => {
    if (!username) {
      console.error('🛑 사용자 이름이 없어 파일을 가져올 수 없습니다.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/files/userimg?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserFiles(data);
      } else {
      }
    } catch (error) {
    }
  };


const handleSubmit = async () => {
    const sanitized = description.replace(/<script[^>]*>[\s\S]*?<\/script>|<style[^>]*>[\s\S]*?<\/style>|<!--[\s\S]*?-->|<[^>]+>/gi,'').trim();
      // console.log('폼 제출 직전 description:', description);
      // console.log("===== 제출 직전 이미지 =====");
      // console.log("imageUrls:", imageUrls);
      // console.log("image1Url:", imageUrls[0]);
      // console.log("image2Url:", imageUrls[1]);
      // console.log("image3Url:", imageUrls[2]);

  try {
    
    const response = await axios.post("http://localhost:8081/api/requests", {
      title,
      categoryTags: categoryTags.join(","),  // 배열을 콤마 구분 문자열로 변환
      style,
      amount,
      deadline,
      description : sanitized,
      selectedItem, //6.14 선택된 나의 디자인 카드 아이템 api 벡엔드 엔드포인트 필요해요 
      image1Url: imageUrls[0]
        ? imageUrls[0].replace("http://localhost:8081/api/requests", "")
        : "",
      image2Url: imageUrls[1]
        ? imageUrls[1].replace("http://localhost:8081/api/requests", "")
        : "",
      image3Url: imageUrls[2]
        ? imageUrls[2].replace("http://localhost:8081/api/requests", "")
        : "",
      username
    });
    console.log("의뢰등록 성공 :", response.data);
    alert("의뢰가 등록되었습니다!");
    navigate('/client/request')
    
  } catch (error) {
    console.error("의뢰등록 요청실패 :", error);
    alert("의뢰 등록에 실패했습니다.",error.message);
  }
};

const handleDraftSave = async () => {
  try {
    await axios.post("http://localhost:8081/api/requests/draft", {
      title,
      categoryTags: categoryTags.join(","),
      style,
      amount,
      deadline,
      description,
      image1Url: imageUrls[0] || "",
      image2Url: imageUrls[1] || "",
      image3Url: imageUrls[2] || "",
      username,
    });

    alert("임시저장이 완료되었습니다.");
  } catch (error) {
    console.error("임시저장 실패:", error);
    alert("임시저장에 실패했습니다.");
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

  const handleFileClick = (item) => {
    setSelectedItem({
      ...item,
      imageUrl: item.imageUrl || `http://localhost:8081/files/view/${item.fileName}`
    });
    setIsMyDesignModal(false);
  };

  const handleTemplateClick = (item) => {
    setSelectedItem({
      ...item,
      imageUrl: `http://localhost:8081${item.designImageUrl}`
    });
    setIsMyDesignModal(false);
  };

  // 날짜 포맷팅 함수
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

  const formatFileName = (fileName) => {
    if (!fileName) return "디자인";
    
    let cleanName = fileName.includes('_') ? fileName.substring(fileName.indexOf('_') + 1) : fileName;
    
    if (cleanName.includes('.')) {
      cleanName = cleanName.substring(0, cleanName.lastIndexOf('.'));
    }
    
    return cleanName;
  };

  return (
    <Container>
      <Wrapper>
        <HeaderWrapper>
          <Header>
            <img src={dress} alt="sample" />
            어떠한 옷을 원하세요?
          </Header>

          <Content>
            <RequiredLabel required>글제목</RequiredLabel>
            <TextInputUIManager
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예시) 디자인 사이"
            />
          </Content>

          <Content>
            <RequiredLabel required>카테고리</RequiredLabel>
            <TagManager
              placeholder="카테고리"
              initialTags={categoryTags}
              onTagsUpdate={(tags) => {
                console.log("Category tags updated:", tags);
                setCategoryTags(tags);
              }}
            />
          </Content>

          <Content>
            <RequiredLabel required>원하는 스타일</RequiredLabel>
            <DropDown
              options={options2}
              defaultSelected={style || "선택하세요"}
              onChange={(value) => {
                console.log("Style selected:", value);
                setStyle(value);
              }}
            />
          </Content>

          <Content>
            <RequiredLabel required>원하는 금액</RequiredLabel>
            <TextInputUIManager
              value={amount}
              onChange={handleAmountChange}
              placeholder="₩ 가격"
            />
          </Content>

          <Content>
            <RequiredLabel required>희망 마감기한</RequiredLabel>
            <input
              type="date"
              value={deadline}
              onChange={(e) => {
                console.log("Deadline selected:", e.target.value);
                setDeadline(e.target.value);
              }}
              style={{
                width: "500px",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </Content>

          <Content>
            <RequiredLabel>내가 제작한 스타일</RequiredLabel>
            <button onClick={() => setIsMyDesignModal(true)}>선택하세요</button>
          </Content>

          <Content>
            <RequiredLabel>
              <MydesignContainer>
                {selectedItem ? (
                  <>
                    {selectedItem.imageUrl ? (
                      <img
                        src={selectedItem.imageUrl}
                        alt={selectedItem.designName || "디자인"}
                      />
                    ) : (
                      <p>이미지 없음</p>
                    )}

                    <h3>
                      {selectedItem.fileName
                        ? formatFileName(selectedItem.fileName)
                        : selectedItem.designName || "디자인"}
                    </h3>

                    <p>
                      {formatDateTime(
                        selectedItem.createdAt || selectedItem.uploadedAt
                      )}
                    </p>
                  </>
                ) : (
                  <p>디자인을 선택하세요</p>
                )}
              </MydesignContainer>
            </RequiredLabel>
          </Content>
        </HeaderWrapper>

        <DetailAndUploadWrapper>
          <Detail>
            <div>
              <h2>상세설명</h2>
            </div>
            <TagList>
              {enteredTags.length === 0 ? (
                <span></span>
              ) : (
                enteredTags.map((tag, index) => (
                  <Tag key={index} text={tag} onRemove={() => {}} />
                ))
              )}
            </TagList>
          </Detail>
  <RequestEditor
        value={description}
        onChange={(html) => {
          console.log('에디터 onChange:', html);
          setDescription(html);
        }}
      />
              
          {/* <MyEditor
            onSendMessage={(text) => {
              console.log("Description updated:", text);
              setDescription(text);
            }}
          
          /> */}
          

          <UploadContainer>
            <CustomUpload
              id="upload1"
              files={files}
              setFiles={setFiles}
              onImageUpload={onImageUpload}
              imageUrl={imageUrls[0]}
            />
            <CustomUpload
              id="upload2"
              files={files}
              setFiles={setFiles}
              onImageUpload={onImageUpload}
              imageUrl={imageUrls[1]}
            />
            <CustomUpload
              id="upload3"
              files={files}
              setFiles={setFiles}
              onImageUpload={onImageUpload}
              imageUrl={imageUrls[2]}
            />
          </UploadContainer>
        </DetailAndUploadWrapper>

        <Footer>
          <NextButtonUI onClick={handleSubmit}>의뢰 등록</NextButtonUI>
          <NextButtonUI to="/client/Request">취소</NextButtonUI>
          <NextButtonUI onClick={handleDraftSave}>임시 저장</NextButtonUI>
        </Footer>
      </Wrapper>

      {isModalOpen && (
        <CustomRequestPopup
          onClose={() => setIsModalOpen(false)}
          data={{
            title,
            categoryTags,
            style,
            amount,
            deadline,
            description,
          }}
        />
      )}

      {isMyDesignModal && (
        <CustomMydesignModal onClose={() => setIsMyDesignModal(false)}>
          <div className="dropdown">
            <select onChange={handleCategoryChange} value={selectedCategory}>
              <option value="template">템플릿 디자인</option>
              <option value="pattern">디자인 파일 업로드</option>
              <option value="brand">브랜드 샘플 디자인</option>
            </select>
          </div>

          <div>
            {selectedCategory === 'template' && (
                filteredDesigns.length === 0 ? (
                  <p>해당 카테고리에 저장된 디자인이 없습니다.</p>
                ) : (
                  <div className="card-container">
                    {filteredDesigns.map((item) => (
                      <div
                        key={item.designId}
                        className="card"
                        onClick={() => handleTemplateClick(item)}
                      >
                        {item.designImageUrl ? (
                          <img
                            src={`http://localhost:8081${item.designImageUrl}`}
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

            {userFiles.map((item) => (
              <div
                key={item.fileName}
                className="card"
                onClick={() => handleFileClick(item)}
              >
                <img
                  src={`http://localhost:8081/files/view/${item.fileName}`}
                  alt="디자인"
                  className="card-image"
                  style={{ width: "100%", height: "auto" }}
                />
                <h3>{formatFileName(item.fileName)}</h3>
                <p>{formatDateTime(item.uploadedAt)}</p>
              </div>
            ))}

            {selectedCategory === 'brand' && (
              <p>브랜드 샘플 디자인은 현재 지원되지 않습니다.</p>
            )}
          </div>
        </CustomMydesignModal>
      )}
    </Container>
  );
}