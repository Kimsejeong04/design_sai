import React, { memo, useRef, useState, useEffect } from "react";
import "./SearchRequest.css";

export function SearchRequest({ searchTerm, setSearchTerm, children }) {
    const inputRef = useRef();
    const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        // searchTerm이 부모 컴포넌트에서 변경될 경우 tempSearchTerm 동기화
        setTempSearchTerm(searchTerm);
    }, [searchTerm]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("엔터 키 눌림, 검색어:", tempSearchTerm);
            setSearchTerm(tempSearchTerm);
        }
    };

    return (
        <div className="searchrequest-container">
            <input
                ref={inputRef}
                type="text"
                placeholder={children}
                className="search-input"
                value={tempSearchTerm}
                onChange={(e) => {
                    const newValue = e.target.value;
                    console.log("SearchRequest onChange:", newValue);
                    setTempSearchTerm(newValue);
                }}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default memo(SearchRequest);