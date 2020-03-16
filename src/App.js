import React from 'react';
import _ from 'lodash';
import { message } from 'antd';
import keydown, { ALL_KEYS } from 'react-keydown';
import { newOptionArr } from './optionArr';
import './App.scss';
import CanvasSprite from './CanvasSprite'
import Example from './components/Example'
import CodeActions from './components/CodeActions'
import Options from './components/Options'
import Element from './components/Element'
import { changeObjectValue } from './AddShape'
//import importCodeJson from './importCodeJson';
//var FontFaceObserver = require('fontfaceobserver');
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

/**
 * 存储avansSprite单例
 */
let canvasSprite;

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
      currentOptionArr: _.cloneDeep(newOptionArr), //当前设置的数组的值
      optionArr: _.cloneDeep(newOptionArr), //当前可设置的数组的值
      importCodeJson: ''
    };
    this.canvas_sprite = ''; //渲图片的canvas对象
    this.height = 300; //固定死
    this.width = 0; //通过实际宽高比计算出来的
    this.activeObject = {};
    this.importCodeJson = '' /* importCodeJson */;
  }

  componentDidMount() {
    this.initCanvansSprite()
  }

  initCanvansSprite() {
    
    //获取canvas实例
    canvasSprite = CanvasSprite.getInstances()

    //添加到观察者中
    canvasSprite.attach('app', this)

    //赋值
    this.canvas_sprite = canvasSprite.canvas_sprite

    const throttleChangeActiveObjectValue = _.throttle(this.changeActiveObjectValue, 100);
    //添加监听
    canvasSprite.onMoving(throttleChangeActiveObjectValue)
    canvasSprite.onScaling(throttleChangeActiveObjectValue)
    canvasSprite.onDown()
    canvasSprite.onScaled(() => {
      this.updateCanvasState();
    })
    canvasSprite.onAdded(() => {
      this.updateCanvasState();
    })
  }

  /**
   * 监听键盘
   * @param {*} event 
   */
  @keydown(/* ['ctrl+left', 'ctrl+right', 'ctrl+up', 'ctrl+down', 'ctrl+z', 'ctrl+y', 'delete', '[', ']'] */ ALL_KEYS)
  beginEdit(event) {
    canvasSprite.onKeydown(event);
  }

  async addShape(index, action) {
    let currentOptionArr;
    if (action === 'update') {
      currentOptionArr = this.state.currentOptionArr;
    } else {
      currentOptionArr = canvasSprite.currentOptionArr;
    }
    canvasSprite.addShape(currentOptionArr[index])
    this.setState({
      visible: true
    });
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
    const activeObject = canvasSprite.getActiveObject()
    let type = activeObject.mytype;
    if (!type) return;
    this.setState({
      visible: true
    });
    const { index , css } = changeObjectValue(activeObject)
    let currentOptionArr = _.cloneDeep(this.state.currentOptionArr);
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
    canvasSprite.importCodeJson(importCodeJson, () => {
      this.setState({
        importCodeJson: ''
      });
      message.success(`画面加载成功`, 2);
      this.setState({
        visibleImportCode: false
      });
    })
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
          <CodeActions
            currentOptionArr={this.currentOptionArr}
            confirmImportCode={this.confirmImportCode.bind(this)}
          />
          <Options
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
          changeState={this.changeState.bind(this)}
          handleChangeElementValue={this.handleChangeElementValue.bind(this)}
        />
      </div>
    );
  }
}
export default App;
