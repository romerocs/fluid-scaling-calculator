
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { StyledIconButton } from './styles';

const StyledPreviewText = styled.div<{ $fontSize: string }>`
  color: var(--black);
  font-size: ${props => props.$fontSize ? props.$fontSize : '3rem'};
  transition: font-size 150ms;
  line-height: 1;
`;


const StyledToolbar = styled.header`
  position: absolute;
  width: calc(100% - (var(--s2) * 2));
  top: 0;
  left: 0;
  padding-inline: var(--s2);
  height: var(--preview-toolbar-height);
  display: flex;
  gap: 8px;
  align-items: center;
  border-bottom: 1px solid black;
`;

const StyledTextRegion = styled.div`
  margin-top: calc(var(--preview-toolbar-height));
`;

const StyledTextArea = styled.textarea<{ $fontSize: string }>`
  width: calc(100% - (var(--s6) * 2));
  height: calc(100% - (var(--s6) + var(--preview-toolbar-height)));
  font-family: var(--font);
  font-size: ${props => props.$fontSize ? props.$fontSize : '3rem'};
  color: rgb(from var(--black) r g b / 0.75);
  border: none;
  background-color: transparent;
  resize: none;
  position: absolute;
  top: var(--preview-toolbar-height);
  left: 0;
  padding-top: var(--s6);
  padding-inline: var(--s6);
  line-height: 1;
`;

const StyledEditButton = styled(StyledIconButton) <{ $editMode: boolean }>`
  
  &::before {
    background-image: ${props => props.$editMode ? 'var(--icon-checkmark)' : 'var(--icon-edit)'};
    background-size: 60%;
  }
`;

const StyledExpandButton = styled(StyledIconButton) <{ $isExpanded: boolean }>`

  &::before {
    background-image: ${props => props.$isExpanded ? 'var(--icon-minimize)' : 'var(--icon-maximize)'};
    background-size: 60%;
  }

  &:hover:after {
    left: ${props => props.$isExpanded ? '0' : '50%'};
    translate: ${props => props.$isExpanded ? '0%' : '-50%'} calc((100% + 8px) * -1);
  }
`

interface PreviewProps {
  fontSize: string;
  expandBtnHandler: Function
}

type EditLabelTextType = "Edit Preview Text" | "Return to Preview";
type MaximizePreviewLabelTextType = "Maximize Preview" | "Minimize Preview";

function Preview({ fontSize = '3rem', expandBtnHandler }: PreviewProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [previewText, setPreviewText] = useState<string>('This is the preview text');
  const [editLabelText, setEditLabelText] = useState<EditLabelTextType>("Edit Preview Text");
  const [maximizePreviewLabelText, setMaximizePreviewLabelText] = useState<MaximizePreviewLabelTextType>("Maximize Preview");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const _expandBtnHandler = () => {
    const isExpandedUpdated = !isExpanded;

    setIsExpanded(isExpandedUpdated);
    setMaximizePreviewLabelText(isExpandedUpdated ? "Minimize Preview" : "Maximize Preview");

    expandBtnHandler(isExpandedUpdated);
  }

  useEffect(() => {
    if (editMode && textAreaRef.current) {
      const { current: textarea } = textAreaRef;

      textarea.focus();

      textarea.value = previewText;

      setEditLabelText("Return to Preview");
    } else {
      setEditLabelText("Edit Preview Text");
    }
  }, [editMode]);

  const editModeHandler = () => {
    setEditMode(!editMode);
  }

  const Toolbar = () => {
    return <StyledToolbar>
      <StyledExpandButton
        onClick={_expandBtnHandler}
        $isExpanded={isExpanded}
        aria-label={maximizePreviewLabelText}></StyledExpandButton>
      <StyledEditButton onClick={editModeHandler} $editMode={editMode} aria-label={editLabelText}></StyledEditButton>
    </StyledToolbar>
  };

  return (
    <div>
      <Toolbar />
      <StyledTextRegion>
        {editMode ? <StyledTextArea id="editRegion" ref={textAreaRef} $fontSize={fontSize} onChange={(e) => setPreviewText(e.target.value)} /> : <StyledPreviewText $fontSize={fontSize}>{previewText}</StyledPreviewText>}
      </StyledTextRegion>
    </div>
  )
}

export default Preview;