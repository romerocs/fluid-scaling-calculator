
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { InputMinSize, InputMaxSize, InputViewportMax, InputLabel, CopyButton, StyledCode } from './components/styles';
import { PaneWrapper, PaneLeft, PaneRight } from "./components/Panes";
import TopBar from './components/TopBar';
import Preview from "./components/Preview";

type Units = 'rem' | 'px';

const UnitLabel = styled.span<{ $unit: Units }>`
  background-color: transparent;
  color: gray;
  position: relative;
  z-index: 2;
  padding-block: 8px;
  width: 10ch;
  transition: color 150ms;

  &:first-child {
    color: ${props => props.$unit === 'rem' ? 'black' : 'white'};
  }

  &:last-child {
    color: ${props => props.$unit === 'px' ? 'black' : 'white'};
  }
`;

const UnitToggleButton = styled.button<{ $unit: Units }>`
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid white;
  display: flex;
  padding: 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    translate: ${props => props.$unit === 'rem' ? '0' : '100%'} 0;
    background-color: white;
    width: 50%;
    height: 100%;
    z-index: 1;
    transition: translate 320ms ease-in-out;
  }
`;

function Calculator() {
  const [sizeMin, setSizeMin] = useState<number | undefined>(3)
  const [sizeMax, setSizeMax] = useState<number | undefined>(5)
  const [viewportMax, setViewportMax] = useState<number | undefined>(75)
  const [units, setUnits] = useState<Units>('rem')
  const [clampStyle, setClampStyle] = useState<string>('clamp(3rem, 6.666666666666667vw, 5rem)');
  const [previewPaneIsExpanded, setPreviewPaneIsExpanded] = useState<boolean>(false);
  const [copyTextLabel, setCopyTextLabel] = useState<string>("Copy");

  useEffect(() => {
    if (sizeMin !== undefined && sizeMax !== undefined && viewportMax !== undefined) {
      const viewportUnits = (sizeMax / viewportMax) * 100;

      const style = `clamp(${sizeMin}${units}, ${viewportUnits}vw, ${sizeMax}${units})`;

      setClampStyle(style);
    }
  }, [viewportMax, sizeMax, sizeMin]);


  const toggleUnits = () => {
    if (units === 'rem') {
      setUnits('px');

      if (sizeMin) setSizeMin(sizeMin * 16);
      if (sizeMax) setSizeMax(sizeMax * 16);
      if (viewportMax) setViewportMax(viewportMax * 16);
    }

    if (units === 'px') {
      setUnits('rem');

      if (sizeMin) setSizeMin(sizeMin / 16);
      if (sizeMax) setSizeMax(sizeMax / 16);
      if (viewportMax) setViewportMax(viewportMax / 16);
    }
  }

  const previewPaneExpandedHandler = (updatedState: boolean) => {
    const previewPaneIsExpandedUpdated = updatedState;

    setPreviewPaneIsExpanded(previewPaneIsExpandedUpdated);
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(clampStyle);

      setCopyTextLabel("Copied!");
    } catch (err: any) {
      console.error(err.name, err.message);
    }
  }

  const resetCopyTextLabel = () => {
    setCopyTextLabel("Copy");
  }

  return (
    <>
      <TopBar />
      <PaneWrapper>
        <PaneLeft>
          <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column', alignItems: 'center' }}>
            <UnitToggleButton onClick={toggleUnits} $unit={units}>
              <UnitLabel $unit={units}>REM</UnitLabel>
              <UnitLabel $unit={units}>PX</UnitLabel>
            </UnitToggleButton>

            <div style={{ display: 'flex', gap: '0' }}>
              <InputLabel>
                <span>Min Size</span>
                <InputMinSize
                  type="number"
                  min={1}
                  placeholder='Size Min'
                  value={sizeMin === undefined ? '' : sizeMin}
                  onChange={e => setSizeMin(e.target.value === '' ? undefined : Number(e.target.value))}
                />
              </InputLabel>

              <InputLabel>
                <span>Max Size</span>
                <InputMaxSize
                  type="number"
                  min={1}
                  placeholder='Size Max'
                  value={sizeMax === undefined ? '' : sizeMax}
                  onChange={e => setSizeMax(e.target.value === '' ? undefined : Number(e.target.value))} />
              </InputLabel>

              <InputLabel>
                <span>Max Viewport</span>
                <InputViewportMax
                  type="number"
                  min={1}
                  placeholder='Viewport Max'
                  value={viewportMax === undefined || viewportMax === 0 ? '' : viewportMax}
                  onChange={e => setViewportMax(Number(e.target.value))}
                  style={{ width: '7ch' }} />
              </InputLabel>
            </div>
            <StyledCode>
              {clampStyle ? clampStyle : 'error'}

              <CopyButton onClick={copyText} onMouseLeave={resetCopyTextLabel} aria-label={copyTextLabel}></CopyButton>
            </StyledCode>
          </div>
        </PaneLeft>

        <PaneRight isExpanded={previewPaneIsExpanded}>
          <Preview fontSize={clampStyle} expandBtnHandler={previewPaneExpandedHandler} />
        </PaneRight>
      </PaneWrapper>
    </>
  )
}

export default Calculator;