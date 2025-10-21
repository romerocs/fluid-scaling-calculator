import styled, { css } from 'styled-components';

const InputBaseStyles = css`
  background: white;
  padding: 12px 16px;
  border-radius: 6px;
  border: none;
  color: black;
  font-size: 1.7rem;
  max-width: 4ch;
`;

const InputMinSize = styled.input`
  ${InputBaseStyles}
  
  border-radius: 6px 0px 0px 6px;
  border-right: 1px solid #cccccc;
`;

const InputMaxSize = styled.input`
  ${InputBaseStyles}
  
  border-radius: 0px;
  border-right: 1px solid #cccccc;
`;

const InputViewportMax = styled.input`
  ${InputBaseStyles}
  
  border-radius: 0px 6px 6px 0px;
`;

export { InputMinSize, InputMaxSize, InputViewportMax };