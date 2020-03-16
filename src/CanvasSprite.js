import {
  fabric
} from 'fabric';
import _ from 'lodash';
import {
  newOptionArr
} from './optionArr';
import AddShape, { changeObjectValue } from './AddShape'
import { message } from 'antd';

/**
 * canvas 实例，单例模式
 */
export default class CanvasSprite {

  static instance = null

  constructor() {
    this.currentOptionArr = _.cloneDeep(newOptionArr); //当前图像数据集合
    this.canvas_sprite = new fabric.Canvas('merge', {
      ...this.currentOptionArr[0].css,
      backgroundColor: this.currentOptionArr[0].css.background
    });
    this.views = []; //所有元素的信息
    this.importCodeJson = '' /* importCodeJson */;
    this.activeObject = {}; //当前激活对象
    this.observers = {}
  }

  /**
   * 获取单例对象
   * @param {*} options 
   */
  static getInstances() {
    if (!this.instance) {
      this.instance = new CanvasSprite();
    }
    return this.instance;
  }

  /**
   * 添加到观察者中
   * @param {*} key 
   * @param {*} observer 
   */
  attach(key, observer) {
    this.observers[key] = observer
  }


  getActiveObject() {
    return this.activeObject
  }

  /**
   * 监听移动
   * @param {Function} callback 回调
   */
  onMoving(callback) {
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
      callback();
    });
  }

  /**
   * 监听缩放
   * @param {Function} callback 回调
   */
  onScaling(callback) {
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
      callback();
    });
  }

  /**
   * 监听鼠标点击
   * @param {Function} callback 回调
   */
  onDown() {
    this.canvas_sprite.on('mouse:down', (e) => {
      const target = e.target
      if (target) {
        this.activeObject = target
        this.observers.app.changeActiveObjectValue()
      } else {
        this.observers.app.changeState({visible: false})
      }
    });
  }

  /**
   * 监听缩放完毕
   * @param {Function} callback 回调
   */
  onScaled(callback) {
    //解决放大缩小元素位置不对的问题
    this.canvas_sprite.on('object:scaled', function (e) {
      callback(e.target)
    });
  }

  /**
   * 监听修改完毕
   * @param {Function} callback 回调
   */
  onModified(callback) {
    this.canvas_sprite.on('object:modified', function () {
      callback()
    });
  }

  /**
   * 监听添加完毕
   * @param {Function} callback 回调
   */
  onAdded(callback) {
    this.canvas_sprite.on('object:added', function () {
      callback();
    });
  }

  /**
   * 监听键盘
   * @param {Function} callback 回调
   */
  onKeydown(event, callback) {
    const activeObject = this.canvas_sprite.getActiveObject();
    if (activeObject) {
      if (event.which === 37) {
        //左
        this.activeObject.set({
          left: this.activeObject.left - 1
        });
        this.observers.app.changeActiveObjectValue()
      } else if (event.which === 39) {
        //右
        this.activeObject.set({
          left: this.activeObject.left + 1
        });
        this.observers.app.changeActiveObjectValue()
      } else if (event.which === 40) {
        //上
        this.activeObject.set({
          top: this.activeObject.top + 1
        });
        this.observers.app.changeActiveObjectValue()
      } else if (event.which === 38) {
        //下
        this.activeObject.set({
          top: this.activeObject.top - 1
        });
      } else if (event.which === 221) {
        //[ 层级降低
        this.canvas_sprite.discardActiveObject();
        this.activeObject.bringForward(true);
        this.observers.app.changeActiveObjectValue()
      } else if (event.which === 219) {
        //] 层级提高
        this.canvas_sprite.discardActiveObject();
        this.activeObject.sendBackwards(true);
        this.observers.app.changeActiveObjectValue()
      } else if (event.which === 90 && event.ctrlKey) {
        //ctrl+z
        this.observers.app.handerUndo()
        this.observers.app.changeActiveObjectValue()
      } else if (event.which === 89 && event.ctrlKey) {
        //ctrl+y
        this.observers.app.handerRedo()
        this.observers.app.changeActiveObjectValue()
      } else if (event.which === 46 || event.which === 8) {
        //delete backspace
        this.observers.app.changeState({ visible: false })
        this.canvas_sprite.remove(activeObject);
      }
      this.canvas_sprite.renderAll();
    }
  }

  /**
   * 获取当前画布所有对象
   */
  getObjects(times) {
    this.views = [];

    function changeShadowTimes(shadow, times) {
      if (!shadow) return '';
      let arr = shadow.trim().split(/\s+/);
      return `${arr[0] * times} ${arr[1] * times} ${arr[2] * times} ${arr[3]}`;
    }
    this.canvas_sprite.getObjects().forEach((item2, index) => {
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
          if (ele.type === 'rect') {} else {
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

    return {
      width: `${this.canvas_sprite.width * times}px`,
      height: `${this.canvas_sprite.height * times}px`,
      background: this.canvas_sprite.backgroundColor,
      views: this.views
    };
  }

  /**
   * 向画布添加元素
   * @param {*} param0 
   */
  async addShape({type , css}) {
    const Shape = await AddShape(type, css)
    this.canvas_sprite.setActiveObject(Shape);
    this.activeObject = Shape;
    this.canvas_sprite.add(Shape);
  }

  importJsonCode (importCodeJson, callback) {
    if (JSON.stringify(importCodeJson).indexOf('3.4.0') === -1) {
      message.error(`请输入正确的json导出数据`, 2);
      return;
    }
    if (typeof importCodeJson === 'string') {
      importCodeJson = JSON.parse(importCodeJson);
    }
    console.log(importCodeJson)
    //延时函数 解决setstate异步加载问题
    const delay = ms =>
    new Promise(resolve => {
      clearTimeout(this.delayT);
      this.delayT = setTimeout(resolve, ms);
    });
    this.canvas_sprite.setWidth(importCodeJson.canvas ? importCodeJson.canvas.width : '654'); //默认值
    this.canvas_sprite.setHeight(importCodeJson.canvas ? importCodeJson.canvas.height : '1000'); //默认值
    this.currentOptionArr[0].css['width'] = importCodeJson.canvas ? importCodeJson.canvas.width : '654';
    this.currentOptionArr[0].css['height'] = importCodeJson.canvas ? importCodeJson.canvas.height : '1000';
    this.currentOptionArr[0].css['background'] = importCodeJson.background;
    this.canvas_sprite.loadFromJSON(importCodeJson, async () => {
      let Objects = this.canvas_sprite.getObjects();
      console.log(Objects)
      for (let index = 0; index < Objects.length; index++) {
        const element = Objects[index];
        this.activeObject = element;
        await delay(0);
        await this.observers.app.updateObject();
      }
      message.success(`画面加载成功`, 2);
      callback()
    });
  }

}