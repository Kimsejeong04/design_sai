-- 1. 기존 테이블 삭제 (필요할 경우)
DROP TABLE files PURGE;
/

-- 2. 파일 테이블 생성
CREATE TABLE files (
    id NUMBER PRIMARY KEY, -- 시퀀스를 사용하여 ID 자동 증가
    file_name VARCHAR2(255) NOT NULL, -- 파일 이름
    file_path VARCHAR2(500) NOT NULL, -- 파일 경로
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 업로드 시간 (기본값 현재 시간)
);
/

-- 3. 시퀀스 생성 (ID 자동 증가 용도)
CREATE SEQUENCE files_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;
/

-- 4. 트리거 생성 (INSERT 시 자동으로 ID 값을 설정)
CREATE OR REPLACE TRIGGER files_trigger
BEFORE INSERT ON files
FOR EACH ROW
WHEN (NEW.id IS NULL)
BEGIN
    SELECT files_seq.NEXTVAL INTO :NEW.id FROM dual;
END;
/
