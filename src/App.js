import React from 'react';
import _ from 'lodash';
import {
  message
} from 'antd';
import keydown, {
  ALL_KEYS
} from 'react-keydown';
import {
  newOptionArr
} from './optionArr';
import './App.scss';
import CanvasSprite from './CanvasSprite'
import Example from './components/Example'
import CodeActions from './components/CodeActions'
import Options from './components/Options'
import Element from './components/Element'
import {
  changeObjectValue
} from './AddShape'
//var FontFaceObserver = require('fontfaceobserver');
message.config({
  maxCount: 1
});

/**
 * 存储avansSprite单例
 */
let canvasSprite;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeActiveObjectValue = this.changeActiveObjectValue.bind(this);
    this.state = {
      currentOptionArr: _.cloneDeep(newOptionArr), //当前设置的数组的值
      visiable: false,
    };
    this.height = 300; //固定死
    this.width = 0; //通过实际宽高比计算出来的
  }

  componentDidMount() {
    /**
     * canvas的dom元素渲染成功后，获取对象单例
     */
    this.initCanvansSprite()
  }

  initCanvansSprite() {

    //获取canvas实例
    canvasSprite = CanvasSprite.getInstances()

    //注册观察者
    canvasSprite.attach('app', this)

    //添加监听
    canvasSprite.onMoving()
    canvasSprite.onScaling()
    canvasSprite.onDown()
    canvasSprite.onModified()
    canvasSprite.onScaled()
    canvasSprite.onAdded()
  }

  /**
   * 监听键盘
   * @param {*} event 
   */
  @keydown(
    /* ['ctrl+left', 'ctrl+right', 'ctrl+up', 'ctrl+down', 'ctrl+z', 'ctrl+y', 'delete', '[', ']'] */
    ALL_KEYS
  )
  beginEdit(event) {
    canvasSprite.onKeydown(event);
  }

  /**
   * 当前画布激活元素被修改时，通知状态state修改
   * @param {*} activeObject 
   */
  changeActiveObjectValue(activeObject) {
    if (activeObject) {
      const {
        index,
        css
      } = changeObjectValue(activeObject)
      let currentOptionArr = _.cloneDeep(this.state.currentOptionArr);
      currentOptionArr[index].css = css;
      this.setState({
        visible: true,
        currentOptionArr
      })
    } else {
      this.setState({
        visible: false
      })
    }
  }

  /**
   * 提供给子组件修改父组件state到接口
   */
  changeState = (state, callback) => {
    this.setState({
      ...state
    }, () => {
      callback && callback()
    })
  }

  /**
   * 取消cavans当前元素到激活状态
   */
  discardActiveObject() {
    canvasSprite.canvas.discardActiveObject(); //取消激活对象
    canvasSprite.canvas.renderAll();
    canvasSprite.setActiveObject(null)
  }

  render() {
    const {
      visible,
      currentOptionArr
    } = this.state;
    return (
      <div id='main' >
        <Example />
        <div className='slide' >
          <canvas id='merge'
            width='700'
            height='1000' />
        </div>
        <div className='main-container'
          onClick={this.discardActiveObject} >
          <CodeActions />
          <Options />
        </div>
        <div className='placeholder'
          onClick={
            () => {
              this.setState({
                visible: false
              });
            }
          } >
        </div>
        <Element currentOptionArr={currentOptionArr}
          visible={visible}
          changeState={this.changeState.bind(this)}
        />
      </div>
    );
  }
}
export default App;