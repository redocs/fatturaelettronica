import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Uploader from '../uploader';
import OrderBy from './orderby';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCaretRight,
  faCaretLeft,
  faFileInvoice
} from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

library.add(faTimes);
library.add(faCaretRight);
library.add(faCaretLeft);
library.add(faFileInvoice);

const PreviewContainer = styled.ul`
  margin: 0;
  padding: 0 0 0px;
`;

const Header = styled.div`
  display: flex;
  margin: 6px 10px 10px;
  border-bottom: 1px solid ${props => props.theme.sidebarBorderColor};
  height: 70px;
  align-items: center;
`;

const Col = styled.div`
  flex: ${props => (props.flex ? props.flex : '1')};
  display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: center;
`;

const ColMini = styled(Col)``;

const Pitem = styled.li`
  padding: 0;
  margin: 0 10px 5px;
  border: 1px solid ${props => props.theme.sidebarBorderColor};
  border-radius: 4px;
  line-height: 26px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  background: ${props =>
    props.active ? props.theme.selectedColor : props.theme.sidebarBg};
`;

const PitemSpan = styled.span`
  display: flex;
  justify-content: ${props => props.justifyContent};
  width: ${props => props.width};
  text-align: ${props => props.textAlign};
  padding: 5px 10px;
  ${props => (props.flex ? 'flex: ' + props.flex : '')}
  ${props => (props.clickable ? 'cursor: pointer;' : '')}
`;

const PitemSpanValue = styled(PitemSpan)`
  padding: 0;
`;

const PitemSpanName = styled(PitemSpan)`
  padding: 0;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  flex: none;
`;

const PitemSpanDoc = styled(PitemSpan)`
  padding: 0;
`;

const PitemSpanMini = styled(PitemSpan)``;

const PitemSpanMinimize = styled.span`
  display: none;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: 10px;
  border: 1px solid ${props => props.theme.buttonColor};
  margin: 3px;
  line-height: 1.1;
  cursor: pointer;

  > span {
    display: block;
    margin: 0 0 8px;
  }
`;

const PitemButton = styled.span`
  display: flex;
  justify-content: ${props => props.justifyContent};
  width: ${props => props.width};
  text-align: ${props => props.textAlign};
  ${props => (props.flex ? 'flex: ' + props.flex : '')}
  align-items: center;
  margin-left: 0;
  cursor: pointer;
  width: 35px;
  border-left: 1px solid ${props => props.theme.sidebarBorderColor};
  transition: color 0.3s ease-in-out;

  :hover {
    color: #b70000;
  }
`;

const TitleH2 = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 16px;
  text-transform: uppercase;
  color: ${props => props.theme.sidebarColor};
`;

const UploaderContainer = styled.div`
  color: ${props => props.theme.sidebarColor};
`;

const PreviewDiv = styled.div`
  position: sticky;
  top: 10px;
  padding-bottom: 40px;
  color: ${props => props.theme.sidebarColor};

  ${props =>
    props.mini &&
    css`
      ${ColMini}, ${PitemButton}, ${PitemSpanMini} {
        display: none;
      }
      ${Col} {
        justify-content: center;
      }
      ${PitemSpanMinimize}{
        display: flex;
      }
    `}

  @media (max-width: 1200px) {
    ${PitemSpanValue} {
      display: none;
    }
  }

  @media (max-width: 960px) {
    ${ColMini}, ${PitemButton}, ${PitemSpanMini} {
      display: none;
    }
    ${Col} {
      justify-content: center;
    }
    ${PitemSpanMinimize}{
      display: flex;
    }
  }
`;

const reorder = (list, startIndex, endIndex) => {
  //console.log('list', list);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class PreviewItem extends Component {
  loadFile = file => {
    //console.log('file', file);
    this.props.onClick(file);
  };
  render() {
    const file = this.props.info;

    const itemSpanConfig = {
      textAlign: 'left',
      width: 'auto',
      flex: '2',
      justifyContent: 'space-between'
    };

    return (
      <PitemSpanMini
        clickable
        {...itemSpanConfig}
        onClick={e => this.loadFile(file)}
      >
        <PitemSpanName {...itemSpanConfig}>{file.name}</PitemSpanName>
        {file.valueTot !== 0 && (
          <PitemSpanValue
            textAlign="right"
            width="auto"
            justifyContent="flex-end"
          >
            {file.valueTot} {file.valueCurrency}
          </PitemSpanValue>
        )}
        <PitemSpanDoc textAlign="right" width="auto" justifyContent="flex-end">
          {file.dateDoc}
        </PitemSpanDoc>
      </PitemSpanMini>
    );
  }
}

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.fileActive,
      sidebar: false
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDragEnd(result) {
    // dropped outside the list
    //console.log('result', result);
    if (!result.destination) {
      return;
    }
    const files = reorder(
      this.props.files,
      result.source.index,
      result.destination.index
    );

    this.props.onDragEnd(files);
  }
  loadFile = file => {
    //console.log('file', file);
    this.props.onSelectedFile(file);
  };
  onClickRemove = index => {
    this.props.onRemoveFile(index);
  };
  resetStore = () => {
    this.props.onResetStore();
  };
  toggleSidebar = () => {
    this.props.onToggleSidebar();
    this.setState({
      sidebar: !this.state.sidebar
    });
  };
  onSelectOrderBy = type => {
    this.props.onSelectOrderBy(type);
  };
  onDrop = file => {
    this.props.onDrop(file);
  };
  render() {
    const filesArray = this.props.files;

    return (
      <PreviewDiv mini={this.props.isMini}>
        <Header>
          {/* <Col justifyContent="flex-start">
            <Button icon onClick={e => this.toggleSidebar(e)}>
              <FontAwesomeIcon
                icon={this.props.isMini ? 'caret-left' : 'caret-right'}
              />
            </Button>
          </Col> */}
          <ColMini flex="2" justifyContent="flex-start">
            <TitleH2>Lista Fatture</TitleH2>
          </ColMini>
          {/* <ColMini justifyContent="flex-end">
            <Button onClick={e => this.resetStore(e)}>Reset</Button>
          </ColMini> */}
          <ColMini justifyContent="flex-end">
            <OrderBy
              themeColor={this.props.themeColor}
              onSelectOrderBy={e => this.onSelectOrderBy(e)}
            />
          </ColMini>
        </Header>
        <DragDropContext onDragEnd={e => this.onDragEnd(e)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <PreviewContainer ref={provided.innerRef}>
                {filesArray.map((file, i) => {
                  //console.log(i);
                  return (
                    <Draggable
                      key={file.fileID}
                      draggableId={file.fileID}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <Pitem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          active={this.props.fileActive === file.fileID}
                        >
                          <PitemSpanMinimize onClick={e => this.loadFile(file)}>
                            <span>{i + 1}</span>
                            <FontAwesomeIcon size="lg" icon="file-invoice" />
                          </PitemSpanMinimize>
                          <PreviewItem
                            themeColor={this.props.themeColor}
                            info={file}
                            onClick={e => this.loadFile(file)}
                          />
                          <PitemButton
                            textAlign="center"
                            width="30px"
                            justifyContent="center"
                            onClick={e => this.onClickRemove(i)}
                          >
                            <FontAwesomeIcon icon="times" />
                          </PitemButton>
                        </Pitem>
                      )}
                    </Draggable>
                  );
                })}
              </PreviewContainer>
            )}
          </Droppable>
        </DragDropContext>
        {this.props.fileActive && !this.state.sidebar && (
          <UploaderContainer>
            <Uploader
              inSidebar
              isXML={true}
              themeColor={this.props.themeColor}
              text="Carica un altra Fattura"
              onDrop={e => this.onDrop(e)}
            />
          </UploaderContainer>
        )}
      </PreviewDiv>
    );
  }
}

export default Preview;
