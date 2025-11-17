import styled, { css } from 'styled-components';

const InputBaseStyles = css`
  background: white;
  padding: 12px 16px;
  border-radius: 6px;
  border: none;
  color: black;
  font-size: 1.7rem;
  max-width: 6ch;
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

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: var(--s-1);
  text-transform: uppercase;
`

const StyledIconButton = styled.button<{ $labelIsVisible?: boolean }>`
  color: var(--black);
  width: 30px;
  height: 30px;
  border: 1px solid var(--black);
  border-radius: 2px;
  display: grid;
  place-content: center;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
  }

  &:after {
    content: attr(aria-label);
    position: absolute;
    width: max-content;
    padding: 8px;
    background-color: var(--black);
    border-radius: 3px;
    border: 1px solid var(--gray);
    color: var(--white);
    top: 0;
    left: 50%;
    translate: -50% calc(100% * -1);
    visibility: ${props => props.$labelIsVisible !== true ? 'hidden' : 'visible'};
    opacity: ${props => props.$labelIsVisible !== true ? '0' : '1'};

    transition: translate 250ms cubic-bezier(0, -0.014, 0, 1.29);
  }

  &:hover:after {
    visibility: visible;
    opacity: 1;
    translate: -50% calc((100% + 8px) * -1);
  }
`;

const CopyButton = styled(StyledIconButton) <{}>`
  background-image: var(--icon-copy);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  cursor: pointer;
`;

const StyledCode = styled.code`
  display: flex;
  gap: 8px;
  align-items: center;
  border: 1px solid var(--gray);
  padding: 6px 12px;
  border-radius: 4px;
  background-color: #000000;
`

export { InputMinSize, InputMaxSize, InputViewportMax, InputLabel, CopyButton, StyledCode, StyledIconButton };