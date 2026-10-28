import styled from "styled-components";

const StyledH1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
`;
const StyledH2 = styled.h2`
  font-size: 28px;
  font-weight: 500;
`;
const StyledH3 = styled.h3`
  font-size: 24px;
  font-weight: 500;
`;
const Headings = ({ as, children, style }) => {
  return as === "h1" ? (
    <StyledH1 style={style}>{children}</StyledH1>
  ) : as === "h2" ? (
    <StyledH2 style={style}>{children}</StyledH2>
  ) : as === "h3" ? (
    <StyledH3 style={style}>{children}</StyledH3>
  ) : (
    ""
  );
};

export default Headings;
