import { useUsers } from "./useUsers";
import Headings from "../../Components/Headings";
import UsersRow from "./UsersRow";
import Table from "../../ui/Table";
import styled from "styled-components";
import { useState } from "react";

const FilterContainer = styled.div`
  background-color: #174441;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 12px;
  border: 2px solid #558467;
  box-shadow: 0 0 8px 1px #558467;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  width: 1516px;
`;

const SelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #efeabb;
  background-color: #1b4d49;
  color: #efeabb;
  font-size: 22px;
  &:hover {
    cursor: pointer;
  }
`;

const UsersTable = () => {
  const [filterRole, setFilterRole] = useState("all");
  const [sortBy, setSortBy] = useState("high-to-low");
  const { isPending, data: users } = useUsers({ filterRole, sortBy });
  if (isPending) {
    return (
      <Headings
        as="h2"
        style={{
          color: "#efeabb",
          padding: "16px",
          fontSize: "24px",
        }}
      >
        Loading Users...
      </Headings>
    );
  }
  return (
    <>
      <FilterContainer>
        <div
          style={{
            fontSize: "28px",
            fontWeight: "500",
            color: "#efeabb",
            padding: "12px",
          }}
        >
          Filter And Sort
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <SelectGroup>
            <label htmlFor="filterRole" style={{ color: "#efeabb" }}>
              Role:
            </label>
            <Select
              id="filterRole"
              value={filterRole}
              onChange={(e) => {
                setFilterRole(e.target.value);
              }}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="host">Host</option>
              <option value="dealer">Dealer</option>
              <option value="advertiser">Advertiser</option>
              <option value="user">User</option>
            </Select>
          </SelectGroup>
          <SelectGroup>
            <label htmlFor="sortBy" style={{ color: "#efeabb" }}>
              Sort Priority:
            </label>
            <Select
              id="sortBy"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
            >
              <option value="high-to-low">High to Low (Admin → User)</option>
              <option value="low-to-high">Low to High (User → Admin)</option>
            </Select>
          </SelectGroup>
        </div>
      </FilterContainer>
      <Table
        role="table"
        columns="minmax(0, 0.8fr) minmax(0,1.4fr) minmax(0,1.8fr) minmax(0,1.2fr) minmax(0,1fr) minmax(0,0.8fr)"
      >
        <Table.Header>
          <div style={{ textAlign: "center" }}>Avatar</div>
          <div style={{ textAlign: "center" }}>Full Name</div>
          <div style={{ textAlign: "center" }}>Email</div>
          <div style={{ textAlign: "center" }}>Phone</div>
          <div style={{ textAlign: "center" }}>Role</div>
          <div style={{ textAlign: "center" }}>Edit and Delete</div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <UsersRow user={user} key={user.id} />}
        />
      </Table>
    </>
  );
};

export default UsersTable;
