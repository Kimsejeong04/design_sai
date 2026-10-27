import './ContractSearchAndFilter.css';

const ContractSearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="csf-bar">
      <select
        className="csf-select"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        aria-label="상태 필터"
      >
        <option>전체</option>
        <option>진행중</option>
        <option>완료</option>
        <option>해지</option>
      </select>

      <input
        type="text"
        placeholder="계약 제목, 내용 검색"
        className="csf-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ContractSearchAndFilter;