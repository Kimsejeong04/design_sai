import './ContractSearchAndFilter.css';

const ContractSearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="search-filter-container">
      {/* 필터 드롭다운 */}
      <select
        className="filter-select"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option>전체</option>
        <option>진행중</option>
        <option>완료</option>
        <option>해지</option>
      </select>

      {/* 검색 입력창 */}
      <input
        type="text"
        placeholder="계약 제목, 내용 검색"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ContractSearchAndFilter;
