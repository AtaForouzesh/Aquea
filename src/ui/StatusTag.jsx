import styled, { css } from "styled-components";

const StyledStatus = {
  live: css`
    background-color: #064e3b;
    color: #6ee7b7;
    border: 1px solid #10b981;
    animation: pulse 1.8s infinite;

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.6;
      }
    }
  `,
  completed: css`
    background-color: #374151;
    color: #d1d5db;
    border: 1px solid #4b5563;
  `,
  cancelled: css`
    background-color: #4c1d95;
    color: #f43f5e;
    border: 1px solid #9f1239;
  `,

  lead: css`
    background-color: #451a03;
    color: #fbbf24;
    border: 1px solid #78350f;
  `,
  negotiating: css`
    background-color: #0c4a6e;
    color: #38bdf8;
    border: 1px solid #0284c7;
  `,
  closed_won: css`
    background-color: #065f46;
    color: #6ee7b7;
    border: 1px solid #10b981;
  `,
  closed_lost: css`
    background-color: #881337;
    color: #fda4af;
    border: 1px solid #f43f5e;
  `,
};

const StatusTag = styled.span`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 6px;
  letter-spacing: 0.5px;

  ${(props) => StyledStatus[props.status] || StyledStatus.completed}
`;

export default StatusTag;
