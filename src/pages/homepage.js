import React, { Component } from 'react';
import Viewer from '../components/viewer';
import Uploader from '../components/uploader';
import Preview from '../components/preview';
import { checkProperty, getParamUrl } from '../helpers';
import styled from 'styled-components';

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Col = styled.div`
  flex: ${props => props.flex};
`;

const ColPreviewer = styled(Col)`
  max-width: ${props => (props.mini ? '100px' : '449px')}
  min-height: calc(100vh - ${props => props.theme.configTheme.headerHeight});
  padding: 0;
  margin: 0;
  background: ${props => props.theme.sidebarBg};
  border: 1px solid ${props => props.theme.sidebarBorderColor};
  border-top: none;
  color: #fff;
  border-radius: 0;
  @media print {
    display: none;
  }
`;

class Homepage extends Component {
  restartUpload = () => {
    this.props.restartUpload();
  };
  onDrop = file => {
    this.props.onDrop(file);
  };
  onDragEnd = file => {
    this.props.onDragEnd(file);
  };
  render() {
    const fileXML = this.props.fileActive.file;
    const isCorrectFile = !!fileXML && checkProperty(fileXML);

    const newVersion = getParamUrl() === 'v2' ? true : false;
    const previewActive = newVersion ? newVersion : true;
    return (
      <FlexContainer>
        {this.props.files && previewActive && (
          <ColPreviewer mini={this.props.toggleSidebar} flex={1}>
            <Preview
              themeColor={this.props.themeColor}
              onSelectOrderBy={this.props.onSelectOrderBy}
              onResetStore={this.props.onResetStore}
              onSelectedFile={this.props.onSelectedFile}
              onRemoveFile={this.props.onRemoveFile}
              fileActive={this.props.fileActive.fileID}
              files={this.props.files}
              onToggleSidebar={this.props.onToggleSidebar}
              isMini={this.props.toggleSidebar}
              onDragEnd={e => this.onDragEnd(e)}
              onDrop={e => this.onDrop(e)}
            />
          </ColPreviewer>
        )}
        <Col flex={2}>
          {!this.props.fileLoaded && (
            <Uploader
              isXML={this.props.isXML}
              fileXML={fileXML}
              themeColor={this.props.themeColor}
              text="Rilascia il file XML qui o clicca per caricare il file dal tuo computer"
              onDrop={e => this.onDrop(e)}
              restartUpload={e => this.restartUpload(e)}
            />
          )}
          {isCorrectFile && <Viewer file={fileXML} />}
        </Col>
      </FlexContainer>
    );
  }
}

export default Homepage;
