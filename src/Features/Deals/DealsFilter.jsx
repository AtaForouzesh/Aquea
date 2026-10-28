import styled from "styled-components";
import Headings from "../../Components/Headings";
import Input from "../../ui/Input";

const FilterContainer = styled.div`
  background-color: #174441;
  margin: 0 auto;
  margin-bottom: 40px;
  padding: 10px 20px;
  border-radius: 12px;
  border: 2px solid #558467;
  box-shadow: 0 0 6px 2px rgba(85, 132, 103, 0.9);

  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  width: 1516px;
`;

const FilterBudget = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const FilterSkills = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const DealsFilter = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedSkill,
  setSelectedSkill,
}) => {
  return (
    <FilterContainer>
      <Headings as="h2" style={{ color: "#efeabb" }}>
        Filter Deals By:
      </Headings>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <FilterBudget>
          <span style={{ color: "#efeabb", fontSize: "18px" }}>
            Budget Range:
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "#efeabb", fontSize: "16px" }}>Min: </span>
            <Input
              type="text"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(Number(e.target.value));
              }}
              placeholder="Minimum Price..."
              style={{ padding: "4px 6px" }}
            />
            <span style={{ color: "#efeabb", fontSize: "16px" }}>Max: </span>
            <Input
              type="text"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              placeholder="Maximum Price..."
              style={{ padding: "4px 6px" }}
            />
          </div>
        </FilterBudget>
        <FilterSkills>
          <span style={{ fontSize: "20px", color: "#efeabb" }}>
            Search Skill:
          </span>
          <Input
            type="text"
            placeholder="e.g python, react and etc..."
            value={selectedSkill}
            onChange={(e) => {
              setSelectedSkill(e.target.value);
            }}
            style={{ padding: "10px", borderRadius: "20px", width: "500px" }}
          />
        </FilterSkills>
      </div>
    </FilterContainer>
  );
};

export default DealsFilter;
