import React from 'react';
import { Input, Button, Modal, message } from 'antd';
import ReactMarkdown from 'react-markdown';
import copy from 'copy-to-clipboard';
import json from 'format-json';
const { TextArea } = Input;

/**
 * 左上角，操作代码按钮
 */
export default class CodeActions extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visibleCode: false,
      visibleImportCode: false,
    }
    this.views = []; //所有元素的信息
    this.canvas_sprite = ''
  }

  componentWillMount() { }

  generateCode() {
    let canvas_sprite = this.props.canvas_sprite;
    console.log(canvas_sprite)
    this.views = [];
    let times = this.props.currentOptionArr[0].css.times;
    function changeShadowTimes(shadow, times) {
      if (!shadow) return '';
      let arr = shadow.trim().split(/\s+/);
      return `${arr[0] * times} ${arr[1] * times} ${arr[2] * times} ${arr[3]}`;
    }
    canvas_sprite.getObjects().forEach((item2, index) => {
      let view = {};
      let width = item2.width * item2.scaleX * times;
      let height = item2.height * item2.scaleY * times;
      let left = item2.left * times;
      let top = item2.top * times;
      let strokeWidth = item2.strokeWidth * times;

      let css = {
        color: `${item2.color}`,
        background: `${item2.fill}`,
        width: `${width}px`,
        height: `${height}px`,
        top: `${top - height / 2 + strokeWidth / 2}px`,
        left: `${left - width / 2 + strokeWidth / 2}px`,
        rotate: `${item2.angle}`,
        borderRadius: `${item2.rx === 0 ? '' : item2.rx * item2.scaleY * times + 'px'}`,
        borderWidth: `${strokeWidth ? strokeWidth * item2.scaleY + 'px' : ''}`,
        borderColor: `${item2.stroke}`,
        //align: `${item2.align}`,
        shadow: changeShadowTimes(item2.myshadow, times)
      };
      //console.log('canvas_sprite.toObject(item2)', canvas_sprite.toObject(item2));
      //console.log('height', height);
      let type = item2.mytype;
      if (type === 'image') {
        delete css.color;
        delete css.background;
        view = {
          type,
          url: `${item2.url}`,
          css: {
            ...css,
            mode: `${item2.mode}`,
            width: `${(item2.width - item2.strokeWidth) * item2.scaleX * times}px`,
            height: `${(item2.height - item2.strokeWidth) * item2.scaleY * times}px`
          }
        };
      } else if (type === 'qrcode') {
        delete css.borderWidth;
        delete css.borderColor;
        delete css.shadow;
        view = {
          type,
          content: `${item2.url}`,
          css: {
            ...css,
            background: item2.background
          }
        };
      } else if (type === 'textGroup') {
        item2._objects.forEach(ele => {
          if (ele.type === 'rect') {
          } else {
            view = {
              ...view,
              type: 'text',
              text: `${item2.oldText}`,
              css: {
                ...css,
                ...view.css,
                width: `${ele.width * times}px`,
                color: ele.fill,
                padding: `${ele.padding * times}px`,
                fontSize: `${ele.fontSize * times}px`,
                fontWeight: `${ele.fontWeight}`,
                maxLines: `${ele.maxLines}`,
                lineHeight: `${ele.lineHeight * 1.11 * ele.fontSize * times}px`,
                textStyle: `${ele.textStyle}`,
                textDecoration: `${ele.textDecoration === 'linethrough' ? 'line-through' : ele.textDecoration}`,
                fontFamily: `${ele.fontFamily}`,
                textAlign: `${ele.textAlign}`
              }
            };
          }
        });
      } else if (type === 'rect') {
        delete css.color;
        if (item2.strokeWidth === 0) {
          delete css.borderWidth;
          delete css.borderColor;
        }
        view = {
          type,
          css: {
            ...css,
            color: item2.fill,
            width: `${(item2.width - item2.strokeWidth) * item2.scaleX * times}px`,
            height: `${(item2.height - item2.strokeWidth) * item2.scaleY * times}px`
          }
        };
      }
      this.views.push(view);
    });
    this.finallObj = {
      width: `${canvas_sprite.width * times}px`,
      height: `${canvas_sprite.height * times}px`,
      background: canvas_sprite.backgroundColor,
      views: this.views
    };
    this.miniCode = `
    export default class LastMayday {
      palette() {
        return (
          ${json.plain(this.finallObj).replace(/px/g, 'px')}
        );
      }
    }
    `;
    this.MarkdownCode = `${json.plain(this.finallObj).replace(/px/g, 'px')}`;
    //console.log('finallObj', json.plain(this.finallObj).replace(/px/g, 'rpx'));
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
    let canvas_sprite = this.props.canvas_sprite;
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

  render() {
    const {
      visibleCode,
      visibleImportCode
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
            <Button key='submit' type='primary' onClick={this.copyCode}>
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
            value={this.state.importCodeJson}
            autoSize={{ minRows: 10, maxRows: 6 }}
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