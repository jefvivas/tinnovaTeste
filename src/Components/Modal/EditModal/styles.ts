import { Link } from "react-router-dom";
import styled from "styled-components";

interface InputProps {
  isValid: boolean;
}

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  background-color: #f8f8f8;
  z-index: 9999;
`;

export const InputField = styled.input<InputProps>`
  margin: 10px;
  padding: 10px;
  width: 300px;
  border: none;
  border-bottom: 2px solid ${(props) => (props.isValid ? "#53514e" : "#eb4a46")};
  outline: none;
  color: ${(props) => (props.isValid ? "#53514e" : "#eb4a46")};

  &:focus {
    color: #333333;
  }
`;

export const NextPageButton = styled(Link)`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #00c8b3;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const ErrorMessageWrapper = styled.div`
  text-align: left;
  width: 100%;
`;

export const ErrorMessage = styled.span`
  margin-left: 10px;
  color: #eb4a46;
  font-size: 12px;
`;
