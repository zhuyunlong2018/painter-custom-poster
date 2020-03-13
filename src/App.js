import React from 'react';
import fabric from 'fabric';
import _ from 'lodash';
import { message } from 'antd';
import keydown, { ALL_KEYS } from 'react-keydown';
import { newOptionArr } from './optionArr';
import './App.scss';
import Example from './components/Example'
import CodeActions from './components/CodeActions'
import Options from './components/Options'
import Element from './components/Element'
import { addTextObject, addRectObject, addImageObject, addQrcodeObject } from './AddShape'
//import importCodeJson from './importCodeJson';
//var FontFaceObserver = require('fontfaceobserver');

fabric = fabric.fabric;
message.config({
  maxCount: 1
});

let _config = {
  canvasState: [],
  currentStateIndex: -1,
  undoStatus: false,
  redoStatus: false,
  undoFinishedStatus: 1,
  redoFinishedStatus: 1
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addShape = this.addShape.bind(this);
    this.handerUndo = this.handerUndo.bind(this);
    this.handerRedo = this.handerRedo.bind(this);
    this.changeActiveObjectValue = this.changeActiveObjectValue.bind(this);
    this.confirmImportCode = this.confirmImportCode.bind(this);
    this.state = {
      redoButtonStatus: '',
      undoButtonStatus: '',
      currentOptionArr: _.cloneDeep(newOptionArr), //当前可设置的数组的值
      optionArr: _.cloneDeep(newOptionArr), //当前可设置的数组的值
      importCodeJson: ''
    };
    this.currentOptionArr = _.cloneDeep(newOptionArr); //当前图像数据集合
    this.canvas_sprite = ''; //渲图片的canvas对象
    this.height = 300; //固定死
    this.width = 0; //通过实际宽高比计算出来的
    this.activeObject = {};
    this.importCodeJson = '' /* importCodeJson */;
  }

  componentDidMount() {
    this.canvas_sprite = new fabric.Canvas('merge', {
      ...this.state.currentOptionArr[0].css,
      backgroundColor: this.state.currentOptionArr[0].css.background
    });
    /* var font = new FontFaceObserver('webfont');
    font.load(); */
    //this.confirmImportCode();
    this.addEventListener();
    /* this.addShape(1);
    this.addShape(2);
    this.addShape(3);
    this.addShape(4); */
    /* let canvas = this.canvas_sprite;
    canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 })); */
    /* let rect = new fabric.Rect({
      width: 200,
      height: 100,
      left: 0,
      top: 0,
      fill: '#000'
    });
    let background = 'linear-gradient(280deg, #fedcba 0%, rgba(18, 52, 86, 1) 20%, #987 80%)';
    this.canvas_sprite.add(rect);
    let gradientOption = '';
    if (GD.api.isGradient(background)) {
      gradientOption = GD.api.doGradient(background, 200, 100);
    }

    rect.setGradient('fill', gradientOption); */
  }
  addEventListener() {
    let that = this;
    let throttlechangeActiveObjectValue = _.throttle(that.changeActiveObjectValue, 100);
    this.canvas_sprite.on('object:moving', function (e) {
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

      throttlechangeActiveObjectValue();
    });
    this.canvas_sprite.on('object:scaling', function (e) {
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
      throttlechangeActiveObjectValue();
    });
    this.canvas_sprite.on('mouse:down', function (e) {
      if (e.target) {
        that.activeObject = e.target;
        that.changeActiveObjectValue();
      } else {
        that.setState({
          visible: false
        });
      }
    });
    //解决放大缩小元素位置不对的问题
    this.canvas_sprite.on('object:scaled', function (e) {
      if (e.target) {
        that.activeObject = e.target;
        that.updateObject();
      }
    });
    this.canvas_sprite.on('object:modified', function () {
      that.updateCanvasState();
    });

    this.canvas_sprite.on('object:added', function () {
      that.updateCanvasState();
    });
  }

  @keydown(/* ['ctrl+left', 'ctrl+right', 'ctrl+up', 'ctrl+down', 'ctrl+z', 'ctrl+y', 'delete', '[', ']'] */ ALL_KEYS)
  beginEdit(event) {
    //console.log('event', event, event.which);
    let that = this;
    let activeObject = this.canvas_sprite.getActiveObject();
    //console.log('activeObject', activeObject);
    if (activeObject) {
      //console.log('that.activeObject', that.activeObject);
      if (event.which === 37) {
        //左
        event.preventDefault();
        that.activeObject.set({
          left: that.activeObject.left - 1
        });
        this.changeActiveObjectValue();
      } else if (event.which === 39) {
        //右
        event.preventDefault();
        that.activeObject.set({
          left: that.activeObject.left + 1
        });
        this.changeActiveObjectValue();
      } else if (event.which === 40) {
        //上
        event.preventDefault();
        that.activeObject.set({
          top: that.activeObject.top + 1
        });
        this.changeActiveObjectValue();
      } else if (event.which === 38) {
        //下
        event.preventDefault();
        that.activeObject.set({
          top: that.activeObject.top - 1
        });
        this.changeActiveObjectValue();
      } else if (event.which === 221) {
        //[ 层级降低
        event.preventDefault();
        this.canvas_sprite.discardActiveObject();
        that.activeObject.bringForward(true);
        this.changeActiveObjectValue();
      } else if (event.which === 219) {
        //] 层级提高
        event.preventDefault();
        this.canvas_sprite.discardActiveObject();
        that.activeObject.sendBackwards(true);
        this.changeActiveObjectValue();
      } else if (event.which === 90 && event.ctrlKey) {
        //ctrl+z
        that.handerUndo();
        this.changeActiveObjectValue();
      } else if (event.which === 89 && event.ctrlKey) {
        //ctrl+y
        that.handerRedo();
        this.changeActiveObjectValue();
      } else if (event.which === 46 || event.which === 8) {
        //delete backspace
        this.canvas_sprite.remove(activeObject);
        that.setState({
          visible: false
        });
      }
      this.canvas_sprite.renderAll();
    }
    // Start editing
  }

  async addShape(index, action) {
    let Shape;
    let currentOptionArr;
    if (action === 'update') {
      currentOptionArr = this.state.currentOptionArr;
    } else {
      currentOptionArr = this.currentOptionArr;
    }
    let { type } = currentOptionArr[index];
    let { css } = currentOptionArr[index];
    switch (type) {
      case 'text':
        Shape = await addTextObject(css);
        break;
      case 'rect':
        Shape = await addRectObject(css);
        break;
      case 'image':
        Shape = await addImageObject(css);
        break;
      case 'qrcode':
        Shape = await addQrcodeObject(css);
        break;
      default:
        break;
    }
    this.canvas_sprite.setActiveObject(Shape);
    this.activeObject = Shape;
    this.setState({
      visible: true
    });
    this.canvas_sprite.add(Shape);
    if (action !== 'update') {
      this.changeActiveObjectValue();
    }
  }

  async updateObject() {
    let type = this.activeObject.mytype;
    this.canvas_sprite.remove(this.activeObject);
    switch (type) {
      case 'textGroup':
        await this.addShape(1, 'update');
        break;
      case 'rect':
        await this.addShape(2, 'update');
        break;
      case 'image':
        await this.addShape(3, 'update');
        break;
      case 'qrcode':
        await this.addShape(4, 'update');
        break;
      default:
        break;
    }
    this.canvas_sprite.renderAll();
  }

  changeActiveObjectValue() {
    let type = this.activeObject.mytype;
    if (!type) return;
    this.setState({
      visible: true
    });
    let item2 = this.activeObject;
    let width = `${(item2.width - item2.strokeWidth) * item2.scaleX}`;
    let height = `${(item2.height - item2.strokeWidth) * item2.scaleY}`;
    /* let left = `${(item2.left / item2.scaleY - (item2.width - item2.strokeWidth) / 2 - item2.strokeWidth).toFixed(2)}`;
    let top = `${(item2.top / item2.scaleY - (item2.height - item2.strokeWidth) / 2 - item2.strokeWidth).toFixed(2)}`; */
    let left = `${(item2.left - width / 2).toFixed(2)}`;
    let top = `${(item2.top - height / 2).toFixed(2)}`;
    //console.log('item2.strokeWidth', `${item2.shadow}`, item2.scaleY);
    let css = {
      width,
      height,
      left,
      top,
      color: `${item2.color}`,
      background: `${item2.fill}`,
      rotate: `${item2.angle}`,
      borderRadius: `${item2.rx * item2.scaleY}`,
      borderWidth: `${item2.strokeWidth * item2.scaleY}`,
      borderColor: `${item2.stroke}`,
      shadow: `${item2.myshadow}`
    };
    let index = '';
    switch (type) {
      case 'textGroup':
        index = 1;
        item2._objects.forEach(ele => {
          let css2 = {
            text: '',
            width,
            maxLines: ``,
            lineHeight: '',
            left,
            top,
            color: `${item2.color}`,
            background: `${item2.fill}`,
            fontSize: '',
            fontWeight: '',
            textDecoration: '',
            rotate: `${item2.angle}`,
            //padding: 0,
            borderRadius: `${item2.rx * item2.scaleY}`,
            borderWidth: `${item2.strokeWidth * item2.scaleY}`,
            borderColor: `${item2.stroke}`,
            shadow: `${item2.shadow}`,
            textStyle: '',
            textAlign: '',
            fontFamily: ''
          };
          if (ele.type === 'rect') {
          } else {
            css = {
              ...css2,
              text: `${item2.oldText}`,
              maxLines: `${ele.maxLines}`,
              lineHeight: `${ele.lineHeight}`,
              color: ele.fill,
              //padding: `${ele.padding}`,
              fontSize: `${ele.fontSize}`,
              fontWeight: `${ele.fontWeight}`,
              textStyle: `${ele.textStyle}`,
              textDecoration: `${ele.textDecoration === 'linethrough' ? 'line-through' : ele.textDecoration}`,
              fontFamily: `${ele.fontFamily}`,
              textAlign: `${ele.textAlign}`,
              shadow: `${item2.myshadow}`
            };
          }
        });
        break;
      case 'rect':
        index = 2;
        delete css.color;
        css = {
          ...css,
          shadow: `${item2.myshadow}`
        };
        break;
      case 'image':
        index = 3;
        delete css.color;
        delete css.background;
        css = {
          url: item2.url,
          ...css,
          mode: `${item2.mode}`,
          shadow: `${item2.myshadow}`
        };
        break;
      case 'qrcode':
        index = 4;
        delete css.height;
        delete css.borderWidth;
        delete css.borderColor;
        delete css.shadow;
        css = {
          url: item2.url,
          ...css,
          color: item2.color,
          background: item2.background
        };
        break;
      default:
        break;
    }
    let currentOptionArr = _.cloneDeep(this.state.currentOptionArr);
    //console.log('currentOptionArr', currentOptionArr[index].css);
    currentOptionArr[index].css = css;
    this.setState({
      currentOptionArr
    });
  }

  confirmImportCode() {
    if (JSON.stringify(this.state.importCodeJson).indexOf('3.4.0') === -1) {
      message.error(`请输入正确的json导出数据`, 2);
      return;
    }
    let canvas_sprite = this.canvas_sprite;
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
    this.canvas_sprite.setWidth(importCodeJson.canvas ? importCodeJson.canvas.width : '654'); //默认值
    this.canvas_sprite.setHeight(importCodeJson.canvas ? importCodeJson.canvas.height : '1000'); //默认值
    this.currentOptionArr[0].css['width'] = importCodeJson.canvas ? importCodeJson.canvas.width : '654';
    this.currentOptionArr[0].css['height'] = importCodeJson.canvas ? importCodeJson.canvas.height : '1000';
    this.currentOptionArr[0].css['background'] = importCodeJson.background;
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
            canvas_sprite.loadFromJSON(_config.canvasState[_config.currentStateIndex - 1], async function () {
              let Objects = canvas_sprite.getObjects();
              for (let index = 0; index < Objects.length; index++) {
                const element = Objects[index];
                that.activeObject = element;
                that.changeActiveObjectValue();
                await that.updateObject();
              }
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
          canvas_sprite.loadFromJSON(_config.canvasState[_config.currentStateIndex + 1], async function () {
            let Objects = canvas_sprite.getObjects();
            for (let index = 0; index < Objects.length; index++) {
              const element = Objects[index];
              that.activeObject = element;
              that.changeActiveObjectValue();
              await that.updateObject();
            }
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

  changeState = (state, callback) => {
    this.setState({ ...state }, () => {
      callback && callback()
    })
  }

  handleChangeElementValue(index, item, value) {
    let currentOptionArr = _.cloneDeep(this.state.currentOptionArr);
    currentOptionArr[index].css[item] = value;
    this.setState(
      {
        currentOptionArr
      },
      () => {
        this.updateObject();
      }
    );
  }

  updateThisCurrentOptionArr(index, item, value) {
    this.currentOptionArr[index].css[item] = value
  }

  handleOptionsChange(item, value) {
    if (item === 'width') {
      this.canvas_sprite.setWidth(value);
    } else if (item === 'height') {
      this.canvas_sprite.setHeight(value);
    } else if (item === 'backgroundColor') {
      this.canvas_sprite.setBackgroundColor(value);
      this.canvas_sprite.renderAll();
    } else if (item === 'times') {
      // this.currentOptionArr[i].css[item2] = event.target.value;
    }
  }

  render() {
    const { visible, currentOptionArr } = this.state;
    return (
      <div id='main'>
        <Example changeState={this.changeState}
          callable={this.confirmImportCode.bind(this)}
        />
        <div className='slide'>
          <canvas id='merge' width='700' height='1000' />
        </div>
        <div
          className='main-container'
          onClick={() => {
            this.setState({
              visible: false
            });
            this.canvas_sprite.discardActiveObject(); //取消激活对象
            this.canvas_sprite.renderAll();
          }}
        >
          <CodeActions canvas_sprite={this.canvas_sprite}
            currentOptionArr={this.currentOptionArr}
            confirmImportCode={this.confirmImportCode.bind(this)}
          />
          <Options 
            currentOptionArr={this.currentOptionArr}
            addShape={this.addShape.bind(this)}
            updateThisCurrentOptionArr={this.updateThisCurrentOptionArr.bind(this)}
            handleOptionsChange={this.handleOptionsChange.bind(this)}
          />
        </div>
        <div
          className='placeholder'
          onClick={() => {
            this.setState({
              visible: false
            });
          }}
        ></div>
        <Element currentOptionArr={currentOptionArr}
          visible={visible}
          activeObject={this.activeObject}
          changeState={this.changeState.bind(this)}
          handleChangeElementValue={this.handleChangeElementValue.bind(this)}
        />
      </div>
    );
  }
}
export default App;
