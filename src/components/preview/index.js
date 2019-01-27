import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import OrderBy from './orderby';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faCaretRight,
  faCaretLeft,
  faFileInvoice
} from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

library.add(faTimesCircle);
library.add(faCaretRight);
library.add(faCaretLeft);
library.add(faFileInvoice);

const PreviewContainer = styled.ul`
  margin: 0;
  padding: 0;
  border-top: 2px solid #fff;
`;

const Header = styled.div`
  display: flex;
  margin: 6px;
`;

const Col = styled.div`
  flex: ${props => (props.flex ? props.flex : '1')};
  display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: center;
`;

const ColMini = styled(Col)``;

const Button = styled.button`
  padding: ${props => (props.icon ? '3px 20px;' : '8px 20px')};
  ${props => (props.icon ? 'font-size: 20px;' : '')}
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bolder;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px #333;
  }
`;

const Pitem = styled.li`
  margin: 0;
  padding: 5px;
  border-bottom: 2px solid #fff;
  line-height: 33px;
  display: flex;
  justify-content: space-between;
  background: ${props => (props.active ? '#333' : '#585858')};
`;

const PitemSpan = styled.span`
  display: flex;
  justify-content: ${props => props.justifyContent};
  width: ${props => props.width};
  text-align: ${props => props.textAlign};
  ${props => (props.flex ? 'flex: ' + props.flex : '')}
  ${props => (props.clickable ? 'cursor: pointer;' : '')}
`;

const PitemSpanValue = styled(PitemSpan)``;

const PitemSpanName = styled(PitemSpan)`
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  flex: none;
`;

const PitemSpanMini = styled(PitemSpan)``;

const PitemSpanMinimize = styled.span`
  display: none;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: 10px;
  border: 1px solid #fff;
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
  margin-left: 4px;
  cursor: pointer;
`;

const TitleH2 = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 20px;
`;

const PreviewDiv = styled.div`
  position: sticky;
  top: 10px;

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
  console.log('list', list);
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
        {console.log(file)}
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
        <PitemSpan textAlign="right" width="auto" justifyContent="flex-end">
          {file.dateDoc}
        </PitemSpan>
      </PitemSpanMini>
    );
  }
}

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.fileActive
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDragEnd(result) {
    // dropped outside the list
    console.log('result', result);
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
  };
  onSelectOrderBy = type => {
    this.props.onSelectOrderBy(type);
  };
  render() {
    const filesArray = this.props.files;

    return (
      <PreviewDiv mini={this.props.isMini}>
        <Header>
          <Col justifyContent="flex-start">
            <Button icon onClick={e => this.toggleSidebar(e)}>
              <FontAwesomeIcon
                icon={this.props.isMini ? 'caret-left' : 'caret-right'}
              />
            </Button>
          </Col>
          <ColMini flex="2" justifyContent="center">
            <TitleH2>Lista Fatture</TitleH2>
          </ColMini>
          <ColMini justifyContent="flex-end">
            <Button onClick={e => this.resetStore(e)}>Reset</Button>
          </ColMini>
        </Header>
        <Header>
          <ColMini justifyContent="flex-end">
            <OrderBy onSelectOrderBy={e => this.onSelectOrderBy(e)} />
          </ColMini>
        </Header>
        <DragDropContext onDragEnd={e => this.onDragEnd(e)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <PreviewContainer ref={provided.innerRef}>
                {filesArray.map((file, i) => {
                  //console.log(i);
                  return (
                    <Draggable key={i} draggableId={file.name} index={i}>
                      {(provided, snapshot) => (
                        <Pitem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={i}
                          active={this.props.fileActive === file}
                        >
                          <PitemSpanMinimize onClick={e => this.loadFile(file)}>
                            <span>{i + 1}</span>
                            <FontAwesomeIcon size="lg" icon="file-invoice" />
                          </PitemSpanMinimize>
                          <PreviewItem
                            info={file}
                            onClick={e => this.loadFile(file)}
                          />
                          <PitemButton
                            textAlign="center"
                            width="30px"
                            justifyContent="center"
                            onClick={e => this.onClickRemove(i)}
                          >
                            <FontAwesomeIcon icon="times-circle" />
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
      </PreviewDiv>
    );
  }
}

export default Preview;
