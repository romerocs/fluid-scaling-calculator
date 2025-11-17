import styled from 'styled-components';

const TopBarStyled = styled.header`
  border-bottom: 1px solid var(--gray);
  display: flex;
  align-items: center;
  padding-inline: var(--gutter);
  height: var(--top-bar-height);
`;

const H1Styled = styled.h1`
  font-size: var(--s2);
  margin: 0;
`;

function TopBar() {
  return (
    <TopBarStyled>
      <H1Styled>Fluid Scaling Calculator</H1Styled>
    </TopBarStyled>
  )
}

export default TopBar;