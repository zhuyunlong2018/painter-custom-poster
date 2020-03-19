import {
  fabric
} from 'fabric'
import {
  newOptionArr
} from './optionArr'
import _ from 'lodash'
import AddShape from './AddShape'
import {
  message
} from 'antd'


let _config = {
  canvasState: [],
  currentStateIndex: -1,
  undoStatus: false,//撤销状态
  redoStatus: false,// 重做状态
  undoFinishedStatus: 1,
  redoFinishedStatus: 1
};

/**
 * canvas 实例，单例模式
 */
export default class CanvasSprite {

  /**
   * 单例模型
   */
  static instance = null

  constructor() {
    this.currentOptionArr = _.cloneDeep(newOptionArr); //当前图像数据集合
    this.canvas = new fabric.Canvas('merge', {
      ...this.currentOptionArr[0].css,
      backgroundColor: this.currentOptionArr[0].css.background
    });
    this.views = []; //所有元素的信息
    this.importCodeJson = '' /* importCodeJson */;
    this.activeObject = null; //当前激活对象
    this.observers = {} //观察者集合
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

  setActiveObject(object) {
    if (typeof object === 'function') {
      object()
    } else {
      this.activeObject = object
    }
    //此处通知观察者
    this.observers.app.changeActiveObjectValue(this.activeObject)
  }

  /**
   * 监听移动
   */
  onMoving() {
    const setActiveObject = _.throttle((e) => {
      let obj = e.target;
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
      this.setActiveObject(obj)
    }, 100);
    this.canvas.on('object:moving', setActiveObject);
  }

  /**
   * 监听缩放
   */
  onScaling() {
    const setActiveObject = _.throttle(e => {
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
      this.setActiveObject(obj)
    })
    this.canvas.on('object:scaling', setActiveObject);
  }

  /**
   * 监听鼠标点击
   */
  onDown() {
    this.canvas.on('mouse:down', (e) => {
      const target = e.target
      this.setActiveObject(target)
    });
  }

  /**
   * 监听缩放完毕
   */
  onScaled() {
    //解决放大缩小元素位置不对的问题
    this.canvas.on('object:scaled', () => {
      this.updateCanvasState()
    });
  }

  /**
   * 监听修改完毕
   */
  onModified() {
    this.canvas.on('object:modified', () => {
      console.log('modified')
      this.updateCanvasState()
    });
  }

  /**
   * 监听添加完毕
   */
  onAdded() {
    this.canvas.on('object:added', e => {
      console.log('added')
      this.setActiveObject(e.target)
    })
  }

  /**
   * 监听键盘
   */
  onKeydown(event) {
    const activeObject = this.activeObject;
    if (activeObject) {
      if (event.which === 37) {
        //左
        this.setActiveObject(() => {
          this.activeObject.set({
            left: this.activeObject.left - 1
          });
        })
      } else if (event.which === 39) {
        //右
        this.setActiveObject(() => {
          this.activeObject.set({
            left: this.activeObject.left + 1
          });
        })
      } else if (event.which === 40) {
        //上
        this.setActiveObject(() => {
          this.activeObject.set({
            top: this.activeObject.top + 1
          });
        })
      } else if (event.which === 38) {
        //下
        this.setActiveObject(() => {
          this.activeObject.set({
            top: this.activeObject.top - 1
          });
        })
      } else if (event.which === 221) {
        //[ 层级降低
        this.setActiveObject(() => {
          this.canvas.discardActiveObject();
          this.activeObject.bringForward(true);
        })
      } else if (event.which === 219) {
        //] 层级提高
        this.setActiveObject(() => {
          this.canvas.discardActiveObject();
          this.activeObject.sendBackwards(true);
        })
      } else if (event.which === 46 || event.which === 8) {
        //delete backspace
        this.canvas.remove(activeObject);
        this.setActiveObject(null)
      }
      this.canvas.renderAll();
    }
    if (event.which === 90 && event.ctrlKey) {
      //ctrl+z
      this.handerUndo()
    } else if (event.which === 89 && event.ctrlKey) {
      //ctrl+y
      this.handerRedo()
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
    this.canvas.getObjects().forEach((item2, index) => {
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
          if (ele.type === 'rect') { } else {
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
      width: `${this.canvas.width * times}px`,
      height: `${this.canvas.height * times}px`,
      background: this.canvas.backgroundColor,
      views: this.views
    };
  }

  /**
   * 向画布添加元素
   * @param {*} param0 
   */
  async addShape({
    type,
    css
  }) {
    const Shape = await AddShape(type, css)
    this.canvas.setActiveObject(Shape);
    this.canvas.add(Shape);
    //只有手动添加元素才进行更新历史记录，防止操作历史记录时冲突
    this.updateCanvasState();
  }

  /**
   * 更新画布中到元素
   * @param {*} param0 
   */
  async updateShape({
    type,
    css
  }) {
    this.canvas.remove(this.activeObject);
    this.addShape({
      type,
      css
    })
    this.canvas.renderAll();
  }

  importJsonCode(importCodeJson, callback) {
    // if (JSON.stringify(importCodeJson).indexOf('3.4.0') === -1) {
    //   message.error(`请输入正确的json导出数据`, 2);
    //   return;
    // }
    if (typeof importCodeJson === 'string') {
      importCodeJson = JSON.parse(importCodeJson);
    }
    //延时函数 解决setstate异步加载问题
    const delay = ms =>
      new Promise(resolve => {
        clearTimeout(this.delayT);
        this.delayT = setTimeout(resolve, ms);
      });
    this.canvas.setWidth(importCodeJson.canvas ? importCodeJson.canvas.width : '654'); //默认值
    this.canvas.setHeight(importCodeJson.canvas ? importCodeJson.canvas.height : '1000'); //默认值
    this.currentOptionArr[0].css['width'] = importCodeJson.canvas ? importCodeJson.canvas.width : '654';
    this.currentOptionArr[0].css['height'] = importCodeJson.canvas ? importCodeJson.canvas.height : '1000';
    this.currentOptionArr[0].css['background'] = importCodeJson.background;
    this.canvas.loadFromJSON(importCodeJson, async () => {
      let Objects = this.canvas.getObjects();
      for (let index = 0; index < Objects.length; index++) {
        this.setActiveObject({ ...Objects[index] })
        await delay(0);
      }
      message.success(`画面加载成功`, 2);
      callback && callback()
    });
  }

  /**
   * 更新canvas存储到步骤状态信息
   */
  updateCanvasState() {
    if (!this.activeObject) {
      return
    }
    //todo 限制步骤，防止内存占用过量
    if (_config.undoStatus === false && _config.redoStatus === false) {
      //此处应该重构，存储步骤改为单独元素，而不是整个画布
      const shape = this.activeObject.toJSON()
      shape.id = this.activeObject.id
      const shapeAsJson = JSON.stringify(shape);
      if (_config.currentStateIndex < _config.canvasState.length - 1) {
        const indexToBeInserted = _config.currentStateIndex + 1;
        _config.canvasState[indexToBeInserted] = shapeAsJson;
        const numberOfElementsToRetain = indexToBeInserted + 1;
        _config.canvasState = _config.canvasState.splice(0, numberOfElementsToRetain);
      } else {
        _config.canvasState.push(shapeAsJson);
      }
      _config.currentStateIndex = _config.canvasState.length - 1;
      if (_config.currentStateIndex === _config.canvasState.length - 1 && _config.currentStateIndex !== -1) {
        //todo success handle
        console.log('update', _config)
      }
    }
  }

  /**
   * 后退一步
   */
  handerUndo() {
    if (_config.undoFinishedStatus) {
      if (_config.currentStateIndex === -1) {
        _config.undoStatus = false;
      } else {
        if (_config.canvasState.length >= 1) {
          _config.undoFinishedStatus = 0;
          if (_config.currentStateIndex !== 0) {
            _config.undoStatus = true;
            //todo 此处后退操作，需要防止继续被记录
            //后退操作，删除画布上前几步到图形，然后直接取第几步骤的图形导入
            //TODO 需要考虑撤回到是删除步骤
            const objects = this.canvas.getObjects()
            //保存的最后一个状态
            const lastShape = JSON.parse(_config.canvasState[_config.currentStateIndex])
            //倒数第二个状态
            const nextShape = JSON.parse(_config.canvasState[_config.currentStateIndex - 1])
            outter:
            for (let i = 0; i < _config.currentStateIndex; i++) {
              for (let j = 0; j < objects.length; j++) {
                if (lastShape.id === objects[j].id) {
                  //移除最后一个元素
                  this.canvas.remove(objects[j]);
                  break outter
                }
              }
            }
            if (lastShape.id === nextShape.id) {
              //如果相邻两个元素ID相等，说明是修改，则要向画布添加倒数第二元素
              fabric.util.enlivenObjects([nextShape], objects => {
                const origRenderOnAddRemove = this.canvas.renderOnAddRemove
                this.canvas.renderOnAddRemove = false
                objects.forEach(shape => {
                  this.canvas.add(shape);
                });
                this.canvas.renderOnAddRemove = origRenderOnAddRemove;
                this.canvas.renderAll();
              });
            }

            _config.undoStatus = false;
            _config.currentStateIndex -= 1;
            console.log('currentStateIndex', _config.currentStateIndex)
            //todo 
            if (_config.currentStateIndex !== _config.canvasState.length - 1) {
              //todo 
            }
            _config.undoFinishedStatus = 1;
          } else if (_config.currentStateIndex === 0) {
            this.canvas.clear();
            _config.undoFinishedStatus = 1;
            //todo state
            _config.currentStateIndex -= 1;
          }
        }
      }
    }
  }

  /**
   * 前进一步
   */
  handerRedo() {
    if (_config.redoFinishedStatus) {
      if (_config.currentStateIndex === _config.canvasState.length - 1 && _config.currentStateIndex !== -1) {
        //state
      } else {
        console.log('currentStateIndex', _config.currentStateIndex)
        if (_config.canvasState.length > _config.currentStateIndex && _config.canvasState.length !== 0) {
          _config.redoFinishedStatus = 0;
          _config.redoStatus = true;
          //TODO 需要考虑撤回到是删除步骤

          //前进一步时，之前保留的元素
          const nextShape = JSON.parse(_config.canvasState[_config.currentStateIndex + 1])

          if (_config.currentStateIndex !== -1) {
            //已经撤销到清空画布到情况，直接将第一个元装载在进去
            const objects = this.canvas.getObjects()
            //当前画布上停留到最后一个元素
            const currentShape = JSON.parse(_config.canvasState[_config.currentStateIndex])

            if (currentShape.id === nextShape.id) {
              //ID相同，说明上一步是修改步骤，
              outter:
              for (let i = 0; i < _config.currentStateIndex; i++) {
                for (let j = 0; j < objects.length; j++) {
                  if (currentShape.id === objects[j].id) {
                    //移除当前一个元素
                    this.canvas.remove(objects[j]);
                    break outter
                  }
                }
              }
            }
          }
          //将上一个步骤元素添加进去
          fabric.util.enlivenObjects([nextShape], objects => {
            const origRenderOnAddRemove = this.canvas.renderOnAddRemove
            this.canvas.renderOnAddRemove = false
            objects.forEach(shape => {
              this.canvas.add(shape);
              this.setActiveObject(shape)
            });
            this.canvas.renderOnAddRemove = origRenderOnAddRemove;
            this.canvas.renderAll();
          });
          _config.redoStatus = false;
          _config.currentStateIndex += 1;
          if (_config.currentStateIndex !== -1) {
            //state
          }
          _config.redoFinishedStatus = 1;
          if (_config.currentStateIndex === _config.canvasState.length - 1 && _config.currentStateIndex !== -1) {
            //state
          }
        }
      }
    }
  }
}