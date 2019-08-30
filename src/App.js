import React from 'react';
import fabric from 'fabric';
import _ from 'lodash';
import jrQrcode from 'jr-qrcode';
import optionArr from './optionArr';
import './App.scss';
import { Button, Input, message, Select, Col, Row, Icon, Drawer, Form } from 'antd';
import copy from 'copy-to-clipboard';
const { Option } = Select;
fabric = fabric.fabric;
message.config({
  maxCount: 1
});
let QRErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};
let _config = {
  canvasState: [],
  currentStateIndex: -1,
  undoStatus: false,
  redoStatus: false,
  undoFinishedStatus: 1,
  redoFinishedStatus: 1
};
//得到当前默认信息
let newOptionArr = _.cloneDeep(optionArr);
newOptionArr[1].css.textStyle = newOptionArr[1].css.textStyle[0];
newOptionArr[1].css.textAlign = newOptionArr[1].css.textAlign[0];
newOptionArr[1].css.textDecoration = newOptionArr[1].css.textDecoration[0];
newOptionArr[1].css.hasBorder = newOptionArr[1].css.hasBorder[0];
newOptionArr[3].css.mode = newOptionArr[3].css.mode[0];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.addShape = this.addShape.bind(this);
    this.generateCode = this.generateCode.bind(this);
    this.copyCode = this.copyCode.bind(this);
    this.viewCode = this.viewCode.bind(this);
    this.handerUndo = this.handerUndo.bind(this);
    this.handerRedo = this.handerRedo.bind(this);
    this.handerEditObject = this.handerEditObject.bind(this);
    this.state = {
      redoButtonStatus: '',
      undoButtonStatus: '',
      activeObjectOptions: {} //当前编辑对象的配置
    };
    this.currentOptionArr = newOptionArr; //当前图像数据集合
    this.views = []; //所有元素的信息
    this.canvas_sprite = ''; //渲图片的canvas对象
    this.shapes = {
      text: [],
      rect: [],
      image: [],
      qrcode: []
    };
    this.height = 300; //固定死
    this.width = 0; //通过实际宽高比计算出来的
  }

  componentDidMount() {
    this.canvas_sprite = new fabric.Canvas('merge', this.currentOptionArr[0].css);
    let that = this;
    this.canvas_sprite.on('object:moving', function(e) {
      var obj = e.target;
      // if object is too big ignore
      if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
        return;
      }
      obj.setCoords();
      // top-left  corner
      if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
        obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
      }
      // bot-right corner
      if (
        obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height ||
        obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width
      ) {
        obj.top = Math.min(
          obj.top,
          obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top
        );
        obj.left = Math.min(
          obj.left,
          obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left
        );
      }
      /* let { top, left, width, height } = e.target;
      let { optionArr } = that.state;
      let optionArrIndex = optionArr.findIndex(function(item) {
        return item.text === e.target.text;
      });
      let optionArrNew = JSON.parse(JSON.stringify(optionArr));
      for (let index = 0; index < optionArrIndex; index++) {
        left -= optionArrNew[index].frames * that.width;
      }
      optionArrNew[optionArrIndex] = {
        ...optionArrNew[optionArrIndex],
        textWidth: width,
        textHeight: height,
        left,
        top
      };
      that.setState({
        optionArr: optionArrNew
      }); */
    });
    this.canvas_sprite.on('object:selected', function(e) {
      var obj = e.target;
      obj.set({
        fontSize: 50
      });
      console.log('object:selected');
    });
    this.canvas_sprite.on('object:modified', function() {
      that.updateCanvasState();
    });

    this.canvas_sprite.on('object:added', function() {
      that.updateCanvasState();
    });
    //this.addShape(1);
    let canvas = this.canvas_sprite;
    canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
  }

  async addShape(index) {
    const that = this;
    const currentOptionArr = this.currentOptionArr;
    let { type, css } = currentOptionArr[index];
    let {
      width,
      height,
      text,
      color,
      fontSize,
      left,
      top,
      fontWeight,
      fontFamily,
      padding,
      textDecoration,
      borderRadius,
      borderWidth,
      borderColor,
      background,
      rotate,
      hasBorder,
      align,
      shadow,
      mode
    } = css;
    let Shape;
    switch (type) {
      case 'text':
        let config = {
          width,
          height,
          fill: color,
          //backgroundColor: background,
          fontWeight,
          left, //距离画布左侧的距离，单位是像素
          top, //距离画布上边的距离
          fontSize, //文字大小
          fontFamily,
          padding,
          [textDecoration]: true,
          //lockUniScaling: true, //只能等比缩放
          textAlign: align,
          shadow,
          angle: rotate,
          splitByGrapheme: true, //文字换行
          zIndex: 2
        };
        let textBox = new fabric.Textbox(text, config);
        if (hasBorder === 1) {
          let Rect = new fabric.Rect({
            width,
            height,
            left, //距离画布左侧的距离，单位是像素
            top,
            rx: borderRadius,
            //ry:borderRadius,
            strokeWidth: borderWidth,
            stroke: borderColor,
            fill: 'rgba(0,0,0,0)',
            angle: rotate,
            selectable: false
          });
          Shape = new fabric.Group([Rect, textBox], {
            left,
            top,
            angle: rotate
          });
          Shape.on('scaling', function(e) {
            let obj = this;
            let width = obj.width;
            let height = obj.height;
            let w = obj.width * obj.scaleX;
            let h = obj.height * obj.scaleY;
            Rect.set({
              left: -(w - width / 2),
              top: -(h - height / 2),
              height: h,
              width: w,
              rx: borderRadius,
              strokeWidth: borderWidth
            });
            textBox.set({
              left: -(w - width / 2),
              top: -(h - height / 2),
              width,
              height,
              fontSize,
              scaleX: 1,
              scaleY: 1
            });
            obj.set({
              height: h,
              width: w,
              scaleX: 1,
              scaleY: 1,
              originX: 'left'
            });

            that.canvas_sprite.renderAll();
          });
        } else {
          Shape = textBox;
        }
        break;
      case 'rect':
        Shape = new fabric.Rect({
          width,
          height,
          left,
          top,
          borderRadius,
          borderWidth,
          borderColor,
          backgroundColor: background,
          align,
          rotate,
          shadow
        });
        break;
      case 'image':
        Shape = await this.loadImageUrl(
          'https://operate.maiyariji.com/20190709%2F3da002983292a6950a71ca7392a21827.jpg'
        );
        Shape.set({
          width,
          height,
          left,
          top,
          borderRadius,
          borderWidth,
          borderColor,
          backgroundColor: background,
          align,
          rotate,
          mode,
          shadow
        });
        break;
      case 'qrcode':
        var imgBase64 = jrQrcode.getQrBase64(
          'https://operate.maiyariji.com/20190709%2F3da002983292a6950a71ca7392a21827.jpg',
          {
            padding: padding / 1, // 二维码四边空白（默认为10px）
            width: width / 1, // 二维码图片宽度（默认为256px）
            height: width / 1, // 二维码图片高度（默认为256px）
            correctLevel: QRErrorCorrectLevel.H, // 二维码容错level（默认为高）
            reverse: false, // 反色二维码，二维码颜色为上层容器的背景颜色
            background: background, // 二维码背景颜色（默认白色）
            foreground: color // 二维码颜色（默认黑色）
          }
        );
        Shape = await this.loadImageUrl(imgBase64);
        Shape.set({
          width,
          height: width,
          left,
          top,
          rx: borderRadius,
          strokeWidth: borderWidth,
          stroke: borderColor,
          align,
          angle: rotate,
          mode,
          shadow
        });
        break;
      default:
        break;
    }
    this.canvas_sprite.setActiveObject(Shape);
    this.shapes[type].push(Shape);
    this.canvas_sprite.add(Shape);
  }
  loadImageUrl(imgUrl) {
    return new Promise(resolve => {
      fabric.Image.fromURL(imgUrl, function(oImg) {
        resolve(oImg);
      });
    });
  }
  clearCanvas() {
    this.rects.forEach(function(item, i) {
      item.remove();
    });
    this.texts.forEach(function(item, i) {
      item.remove();
    });
  }
  generateCode() {
    let shapes = this.shapes;
    this.views = [];
    Object.keys(shapes).forEach(item => {
      shapes[item].forEach((item2, index) => {
        console.log('shapes[item2]', item2);
        this.views.push(item2);
      });
    });
  }
  copyCode() {
    if (copy('http://baidu.com')) {
      message.success(`复制成功,请赶快去painter粘贴代码查看效果`, 2);
    } else {
      message.error(`复制失败,请重试或者去谷歌浏览器尝试`, 2);
    }
  }
  viewCode() {}
  updateCanvasState() {
    let that = this;
    let canvas_sprite = this.canvas_sprite;
    if (_config.undoStatus === false && _config.redoStatus === false) {
      var jsonData = canvas_sprite.toJSON();
      var canvasAsJson = JSON.stringify(jsonData);
      if (_config.currentStateIndex < _config.canvasState.length - 1) {
        var indexToBeInserted = _config.currentStateIndex + 1;
        _config.canvasState[indexToBeInserted] = canvasAsJson;
        var numberOfElementsToRetain = indexToBeInserted + 1;
        _config.canvasState = _config.canvasState.splice(0, numberOfElementsToRetain);
      } else {
        _config.canvasState.push(canvasAsJson);
      }
      _config.currentStateIndex = _config.canvasState.length - 1;
      if (_config.currentStateIndex === _config.canvasState.length - 1 && _config.currentStateIndex !== -1) {
        that.setState({
          redoButtonStatus: 'disabled'
        });
      }
    }
  }
  handerUndo() {
    let that = this;
    let canvas_sprite = this.canvas_sprite;
    if (_config.undoFinishedStatus) {
      if (_config.currentStateIndex === -1) {
        _config.undoStatus = false;
      } else {
        if (_config.canvasState.length >= 1) {
          _config.undoFinishedStatus = 0;
          if (_config.currentStateIndex !== 0) {
            _config.undoStatus = true;
            canvas_sprite.loadFromJSON(_config.canvasState[_config.currentStateIndex - 1], function() {
              //var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex - 1]);
              canvas_sprite.renderAll();
              _config.undoStatus = false;
              _config.currentStateIndex -= 1;
              that.setState({
                undoButtonStatus: ''
              });
              if (_config.currentStateIndex !== _config.canvasState.length - 1) {
                that.setState({
                  redoButtonStatus: ''
                });
              }
              _config.undoFinishedStatus = 1;
            });
          } else if (_config.currentStateIndex === 0) {
            canvas_sprite.clear();
            _config.undoFinishedStatus = 1;
            that.setState({
              redoButtonStatus: '',
              undoButtonStatus: 'disabled'
            });
            _config.currentStateIndex -= 1;
          }
        }
      }
    }
  }
  handerRedo() {
    let that = this;
    let canvas_sprite = this.canvas_sprite;
    if (_config.redoFinishedStatus) {
      if (_config.currentStateIndex === _config.canvasState.length - 1 && _config.currentStateIndex !== -1) {
        that.setState({
          redoButtonStatus: 'disabled'
        });
      } else {
        if (_config.canvasState.length > _config.currentStateIndex && _config.canvasState.length !== 0) {
          _config.redoFinishedStatus = 0;
          _config.redoStatus = true;
          canvas_sprite.loadFromJSON(_config.canvasState[_config.currentStateIndex + 1], function() {
            //var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex + 1]);
            canvas_sprite.renderAll();
            _config.redoStatus = false;
            _config.currentStateIndex += 1;
            if (_config.currentStateIndex !== -1) {
              that.setState({
                undoButtonStatus: ''
              });
            }
            _config.redoFinishedStatus = 1;
            if (_config.currentStateIndex === _config.canvasState.length - 1 && _config.currentStateIndex !== -1) {
              that.setState({
                redoButtonStatus: 'disabled'
              });
            }
          });
        }
      }
    }
  }
  handerEditObject() {
    let canvas_sprite = this.canvas_sprite;
    this.activeObject = canvas_sprite.getActiveObject();
    this.showDrawer();
    console.log('this.activeObject', this.activeObject.type);
    this.setState({
      activeObjectOptions: {
        top: '',
        left: '',
        width: '',
        height: '',
        rotate: '',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000000',
        color: '',
        background: '',
        shadow: '',
        text: '',
        fontSize: '30',
        fontWeight: 'bold',
        maxLines: '',
        lineHeight: '20',
        padding: '10',
        textDecoration: ['none', 'overline', 'underline', 'linethrough']
      }
    });
  }
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const currentOptionArr = this.currentOptionArr;
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;
    return (
      <div id='main'>
        <div className='slide'>
          <canvas id='merge' width='700' height='1000' />
        </div>
        <div className='main-container'>
          <div className='box'>
            <div className='btns'>
              <div className='btn'>
                <Button type='primary' onClick={this.handerUndo}>
                  Undo
                </Button>
              </div>
              <div className='btn'>
                <Button type='primary' onClick={this.handerRedo}>
                  Redo
                </Button>
              </div>
              <div className='btn'>
                <Button type='primary' onClick={this.handerEditObject}>
                  编辑对象
                </Button>
              </div>
              <div className='btn'>
                <Button type='primary' onClick={this.generateCode}>
                  生成代码
                </Button>
              </div>
              <div className='btn'>
                <Button type='primary' onClick={this.copyCode}>
                  复制代码
                </Button>
              </div>
              <div className='btn'>
                <Button type='primary' onClick={this.viewCode}>
                  查看代码
                </Button>
              </div>
            </div>
            <div className='code' />
          </div>
          <div className='option'>
            {optionArr.map((item, i) => {
              if (i === 0) return null;
              return (
                <div key={i} className='option-li'>
                  <div className='row'>
                    <div className='h3'>{item.name} </div>
                    <div className='btn'>
                      <Button type='primary' onClick={this.addShape.bind(this, i)}>
                        添加
                      </Button>
                    </div>
                  </div>
                  {Object.keys(item.css).map((item2, i2) => {
                    return (
                      <div className='row' key={i2}>
                        <div className='h3'>{item2} </div>
                        {!_.isArray(item.css[item2]) && (
                          <Input
                            //placeholder={item.css[item2]}
                            defaultValue={item.css[item2]}
                            onChange={event => {
                              currentOptionArr[i].css[item2] = event.target.value;
                            }}
                          />
                        )}
                        {_.isArray(item.css[item2]) && (
                          <Select
                            defaultValue={item.css[item2][0]}
                            style={{ width: 120 }}
                            onChange={value => {
                              currentOptionArr[i].css[item2] = value;
                            }}
                          >
                            {item.css[item2].map((item3, i3) => {
                              return (
                                <Option value={item3} key={i3}>
                                  {item3}
                                </Option>
                              );
                            })}
                          </Select>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className='edit-modal'>
          <div>
            <Button type='primary' onClick={this.showDrawer}>
              <Icon type='plus' /> New account
            </Button>
            <Drawer title='编辑对象' width={720} onClose={this.onClose} visible={visible}>
              <Form layout='vertical' hideRequiredMark onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label='Name'>
                      {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please enter user name' }]
                      })(<Input placeholder='Please enter user name' />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label='Url'>
                      {getFieldDecorator('url', {
                        rules: [{ required: true, message: 'Please enter url' }]
                      })(
                        <Input
                          style={{ width: '100%' }}
                          addonBefore='http://'
                          addonAfter='.com'
                          placeholder='Please enter url'
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label='Owner'>
                      {getFieldDecorator('owner', {
                        rules: [{ required: true, message: 'Please select an owner' }]
                      })(
                        <Select placeholder='Please select an owner'>
                          <Option value='xiao'>Xiaoxiao Fu</Option>
                          <Option value='mao'>Maomao Zhou</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label='Type'>
                      {getFieldDecorator('type', {
                        rules: [{ required: true, message: 'Please choose the type' }]
                      })(
                        <Select placeholder='Please choose the type'>
                          <Option value='private'>Private</Option>
                          <Option value='public'>Public</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label='Approver'>
                      {getFieldDecorator('approver', {
                        rules: [{ required: true, message: 'Please choose the approver' }]
                      })(
                        <Select placeholder='Please choose the approver'>
                          <Option value='jack'>Jack Ma</Option>
                          <Option value='tom'>Tom Liu</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label='Description'>
                      {getFieldDecorator('description', {
                        rules: [
                          {
                            required: true,
                            message: 'please enter url description'
                          }
                        ]
                      })(<Input.TextArea rows={4} placeholder='please enter url description' />)}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  borderTop: '1px solid #e9e9e9',
                  padding: '10px 16px',
                  background: '#fff',
                  textAlign: 'right'
                }}
              >
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} type='primary'>
                  Submit
                </Button>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(App);
export default WrappedRegistrationForm;