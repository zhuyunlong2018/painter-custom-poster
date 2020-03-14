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
    this.canvas_sprite = ''
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
    let canvas_sprite = canvasSprite.canvas_sprite;
    var jsonData = canvas_sprite.toJSON();
    jsonData.canvas = {
      width: canvas_sprite.getWidth(),
      height: canvas_sprite.getHeight()
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

  confirmImportCode() {
    if (JSON.stringify(this.state.importCodeJson).indexOf('3.4.0') === -1) {
      message.error(`请输入正确的json导出数据`, 2);
      return;
    }
    let canvas_sprite = canvasSprite.canvas_sprite;
    //延时函数 解决setstate异步加载问题
    const delay = ms =>
      new Promise(resolve => {
        clearTimeout(this.delayT);
        this.delayT = setTimeout(resolve, ms);
      });
    let importCodeJson;
    if (typeof this.state.importCodeJson === 'string') {
      importCodeJson = JSON.parse(this.state.importCodeJson);
    } else {
      importCodeJson = this.state.importCodeJson;
    }
    canvas_sprite.setWidth(importCodeJson.canvas ? importCodeJson.canvas.width : '654'); //默认值
    canvas_sprite.setHeight(importCodeJson.canvas ? importCodeJson.canvas.height : '1000'); //默认值
    canvasSprite.currentOptionArr[0].css['width'] = importCodeJson.canvas ? importCodeJson.canvas.width : '654';
    canvasSprite.currentOptionArr[0].css['height'] = importCodeJson.canvas ? importCodeJson.canvas.height : '1000';
    canvasSprite.currentOptionArr[0].css['background'] = importCodeJson.background;
    canvas_sprite.loadFromJSON(this.state.importCodeJson, async () => {
      let Objects = canvas_sprite.getObjects();
      for (let index = 0; index < Objects.length; index++) {
        const element = Objects[index];
        this.activeObject = element;
        this.changeActiveObjectValue();
        await delay(0);
        await this.updateObject();
      }
      this.setState({
        importCodeJson: ''
      });
      message.success(`画面加载成功`, 2);
      this.setState({
        visibleImportCode: false
      });
    });
  }

  render() {
    const {
      visibleCode,
      visibleImportCode,
      importCodeJson
    } = this.state
    const { confirmImportCode } = this.props
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
            <Button key='submit' type='primary' onClick={() => confirmImportCode()}>
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
              //this.importCodeJson = e.target.value;
            }}
          />
        </Modal>
      </div>
    )
  }

}