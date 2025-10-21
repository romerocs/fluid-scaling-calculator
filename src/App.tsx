import { useState, useEffect, type JSX } from 'react';
import styled, { css } from 'styled-components';
import { InputMinSize, InputMaxSize, InputViewportMax } from './inputs';
type Units = 'rem' | 'px';


function Error({ message }: { message: string }): JSX.Element {

  return <div>{message}</div>
}

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

function App() {
  const [sizeMin, setSizeMin] = useState<number | undefined>(3)
  const [sizeMax, setSizeMax] = useState<number | undefined>(5)
  const [viewportMax, setViewportMax] = useState<number | undefined>(75)
  const [units, setUnits] = useState<Units>('rem')
  const [viewportUnits, setViewportUnits] = useState<number | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const selectUnitOptions: Units[] = ['rem', 'px'];

  useEffect(() => {
    calculate();
  }, [viewportMax, sizeMax, sizeMin]);

  const calculate = () => {
    if (sizeMax === undefined || viewportMax === undefined) {
      setError('Please fill in all fields');
      return;
    }

    setViewportUnits((sizeMax / viewportMax) * 100);
  };

  const clampStyleProp = () => {
    return `clamp(${sizeMin}${units}, ${viewportUnits}vw, ${sizeMax}${units})`;
  }

  const unitsOnChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newUnit = e.target.value;

    switch (newUnit) {
      case 'rem':

        if (viewportMax !== undefined) {
          setViewportMax(viewportMax / 16);
        }

        if (sizeMin !== undefined) {
          setSizeMin(sizeMin / 16)
        }

        if (sizeMax !== undefined) {
          setSizeMax(sizeMax / 16)
        }

        break;
      case 'px':
        if (viewportMax !== undefined) {
          setViewportMax(viewportMax * 16);
        }

        if (sizeMin !== undefined) {
          setSizeMin(sizeMin * 16)
        }

        if (sizeMax !== undefined) {
          setSizeMax(sizeMax * 16)
        }

    }

    const selectedUnit = selectUnitOptions.find(unit => unit === newUnit) as Units;

    setUnits(selectedUnit);
  }

  const valuesAreSet = () => {
    return sizeMin !== undefined && sizeMin > 0 && sizeMax !== undefined && sizeMax > 0 && viewportMax !== undefined && viewportMax > 0 && viewportUnits !== undefined;
  }

  const toggleUnits = () => {
    if (units === 'rem') {
      setUnits('px')
    }

    if (units === 'px') {
      setUnits('rem');
    }
  }

  return (
    <>
      <header>
        <h1>Fluid Scaling Calculator</h1>
      </header>

      <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column', alignItems: 'center' }}>
        <UnitToggleButton onClick={toggleUnits} $unit={units}>
          <UnitLabel $unit={units}>REM</UnitLabel>
          <UnitLabel $unit={units}>PX</UnitLabel>
        </UnitToggleButton>


        <div style={{ display: 'flex', gap: '0' }}>
          {/* Size Min */}
          <InputMinSize
            type="number"
            min={1}
            placeholder='Size Min'
            value={sizeMin === undefined ? '' : sizeMin}
            onChange={e => setSizeMin(e.target.value === '' ? undefined : Number(e.target.value))}
          />

          {/* Size Max */}
          <InputMaxSize
            type="number"
            min={1}
            placeholder='Size Max'
            value={sizeMax === undefined ? '' : sizeMax}
            onChange={e => setSizeMax(e.target.value === '' ? undefined : Number(e.target.value))} />

          {/* Viewport Max */}
          <InputViewportMax
            type="number"
            min={1}
            placeholder='Viewport Max'
            value={viewportMax === undefined || viewportMax === 0 ? '' : viewportMax}
            onChange={e => setViewportMax(Number(e.target.value))}
            style={{ width: '7ch' }} />
        </div>

      </div>

      {/* <code>
        <pre>
          {valuesAreSet() ? clampStyleProp() : <Error message="Please fill in all fields" />}
        </pre>
      </code> */}
    </>
  )
}

export default App

/* 

- Error states
  - inputs not filled in

Output Code with copy button
Preview? 
  - Font size
  - margin
  - padding
  - width?
*/
