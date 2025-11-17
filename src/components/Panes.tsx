import styled from 'styled-components';
import type { ReactNode } from 'react';

const StyledPaneWrapper = styled.div`
  position: relative;
  height: calc(100vh - var(--top-bar-height));
`;

const StyledPaneLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  padding: var(--s6) var(--gutter);
  box-sizing: border-box;
`;

const StyledPaneRight = styled.div<{ $isExpanded: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${props => props.$isExpanded ? '100%' : '70%'};
  height: 100%;
  background-color: var(--white);
  padding: var(--s6);
  box-sizing: border-box;
  transition: width 450ms cubic-bezier(0.195, 0.876, 0.015, 0.99);
  z-index: 5;
`;

interface PaneProps {
  children: ReactNode | ReactNode[];
}


function PaneWrapper({ children }: PaneProps) {
  return (
    <StyledPaneWrapper>{children}</StyledPaneWrapper>
  )
}

function PaneLeft({ children }: PaneProps) {
  return (
    <StyledPaneLeft>{children}</StyledPaneLeft>
  )
}

interface PaneRightProps extends PaneProps {
  isExpanded: boolean;
};

function PaneRight({ children, isExpanded }: PaneRightProps) {
  return (
    <StyledPaneRight $isExpanded={isExpanded}>{children}</StyledPaneRight>
  )
}

export { PaneWrapper, PaneLeft, PaneRight };