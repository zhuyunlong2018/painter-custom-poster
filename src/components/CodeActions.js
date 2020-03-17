import React from 'react';
import { Input, Button, Modal, message } from 'antd';
import ReactMarkdown from 'react-markdown';
import copy from 'copy-to-clipboard';
import json from 'format-json';
import CanvasSprite from '../CanvasSprite'


const { TextArea } = Input;
let canvasSprite

/**
 * 左上角，操作代码按钮
 */
export default class CodeActions extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visibleCode: false,
      visibleImportCode: false,
      importCodeJson: ''
    }
    this.views = []; //所有元素的信息
    this.canvas = ''
  }

  componentDidMount() {
    canvasSprite = CanvasSprite.getInstances()
  }

  generateCode() {
    const times = canvasSprite.currentOptionArr[0].css.times;
    const finallObj =  canvasSprite.getObjects(times);
    this.miniCode = `
    export default class LastMayday {
      palette() {
        return (
          ${json.plain(finallObj).replace(/px/g, 'px')}
        );
      }
    }
    `;
    this.MarkdownCode = `${json.plain(finallObj).replace(/px/g, 'px')}`;
  }

  copyCode() {
    this.generateCode();
    if (copy(this.miniCode)) {
      message.success(`复制成功,请赶快去painter粘贴代码查看效果`, 2);
    } else {
      message.error(`复制失败,请重试或者去谷歌浏览器尝试`, 2);
    }
  }

  viewCode() {
    this.generateCode();
    this.setState({
      visibleCode: true
    });
  }

  exportCode() {
    let canvas = canvasSprite.canvas;
    var jsonData = canvas.toJSON();
    jsonData.canvas = {
      width: canvas.getWidth(),
      height: canvas.getHeight()
    };
    var canvasAsJson = JSON.stringify(jsonData);
    if (copy(/* 'export default' +  */ canvasAsJson)) {
      message.success(`导出成功,请复制查看代码`, 2);
    } else {
      message.error(`复制失败,请重试或者去谷歌浏览器尝试`, 2);
    }
  }

  importCode() {
    this.setState({
      visibleImportCode: true
    });
  }

  render() {
    const {
      visibleCode,
      visibleImportCode,
      importCodeJson
    } = this.state
    return (
      <div className='box'>
        <div className='btns'>
          <div className='btn'>
            <Button type='primary' onClick={this.copyCode.bind(this)}>
              复制代码
                </Button>
          </div>
          <div className='btn'>
            <Button type='primary' onClick={this.viewCode.bind(this)}>
              查看代码
                </Button>
          </div>
          <div className='btn'>
            <Button type='primary' onClick={this.exportCode.bind(this)}>
              导出json
                </Button>
          </div>
          <div className='btn'>
            <Button type='primary' onClick={this.importCode.bind(this)}>
              导入json
                </Button>
          </div>
        </div>
        <div className='code' />
        <Modal
          title='view code'
          visible={visibleCode}
          onCancel={() => {
            this.setState({
              visibleCode: false
            });
          }}
          footer={[
            <Button key='submit' type='primary' onClick={this.copyCode.bind(this)}>
              复制代码
            </Button>
          ]}
        >
          <ReactMarkdown
            source={`\`\`\`${this.MarkdownCode}`}
          />
        </Modal>
        <Modal
          title='导入代码'
          // getContainer={false}
          visible={visibleImportCode}
          onCancel={() => {
            this.setState({
              visibleImportCode: false
            });
          }}
          footer={[
            <Button key='submit' type='primary' onClick={() => {
              canvasSprite.importJsonCode(importCodeJson, () => {
                this.setState({ visibleImportCode: false })
              })
            }}>
              确定
            </Button>
          ]}
        >
          <TextArea
            placeholder='请将代码复制进来'
            value={importCodeJson}
            autoSize={{ minRows: 10 }}
            onChange={e => {
              this.setState({
                importCodeJson: e.target.value
              });
            }}
          />
        </Modal>
      </div>
    )
  }

}