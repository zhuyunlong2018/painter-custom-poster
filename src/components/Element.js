import React from 'react';
import _ from 'lodash';
import { Input, Select, Drawer } from 'antd';
import CanvasSprite from '../CanvasSprite'
import { optionArr } from '../optionArr';

const { Option } = Select;
const { TextArea } = Input;


let canvasSprite

/**
 * 当前操作对象对应到表单数据
 */
export default class Element extends React.Component {

  componentDidMount() {
    canvasSprite = CanvasSprite.getInstances()
  }

  changeValue(index, item, value) {
    let currentOptionArr = _.cloneDeep(this.props.currentOptionArr);
    currentOptionArr[index].css[item] = value;
    this.props.changeState({ currentOptionArr }, () => {
      canvasSprite.updateShape(currentOptionArr[index])
    })
  }

  render() {
    const { 
      currentOptionArr,
      visible,
      changeState,
    } = this.props
    return (
      <Drawer
        title='当前激活对象'
        width={400}
        onClose={() => {
          changeState({visible: false})
        }}
        visible={visible}
        mask={false}
        placement='right'
      >
        <div className='option option-drawer'>
          {canvasSprite && canvasSprite.activeObject && currentOptionArr.map((item, i) => {
            let type = canvasSprite.activeObject.mytype;
            if (type === 'textGroup') {
              type = 'text';
            }
            if (item.type === type) {
              return (
                <div key={i} className='option-li'>
                  <div className='row'>
                    <div className='h3'>当前{item.name} </div>
                  </div>
                  {Object.keys(item.css).map((item2, i2) => {
                    return (
                      <div className='row' key={i2}>
                        <div className='h3'>{item2} </div>
                        {!_.isArray(optionArr[i].css[item2]) && item2 !== 'text' && (
                          <Input
                            defaultValue={item.css[item2]}
                            value={item.css[item2]}
                            onChange={event => {
                              this.changeValue(i, item2, event.target.value)
                            }}
                          />
                        )}
                        {!_.isArray(optionArr[i].css[item2]) && item2 === 'text' && (
                          <TextArea
                            value={item.css[item2]}
                            onChange={event => {
                              this.changeValue(i, item2, event.target.value)
                            }}
                          />
                        )}
                        {_.isArray(optionArr[i].css[item2]) && (
                          <Select
                            defaultValue={item.css[item2]}
                            value={item.css[item2]}
                            style={{ width: 120 }}
                            onChange={value => {
                              this.changeValue(i, item2, value)
                            }}
                          >
                            {optionArr[i].css[item2].map((item3, i3) => {
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
            } else {
              return ''
            }
          })}
        </div>
      </Drawer>
    )
  }

}