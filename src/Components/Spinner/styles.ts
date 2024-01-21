import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerWrapper = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 2px solid #fdfdfd;
  border-radius: 50%;
  border-top: 2px solid transparent;
  border-right: 2px solid transparent;
  animation: ${spin} 1s linear infinite;
`;