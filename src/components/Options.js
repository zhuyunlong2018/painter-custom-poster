import React from 'react';
import _ from 'lodash';
import { optionArr } from '../optionArr';
import { Button, Input, Select, Radio } from 'antd';
import CanvasSprite from '../CanvasSprite'

const { Option } = Select;
const { TextArea } = Input;

/**
 * 添加、创建元素到表单配置
 */
export default class Options extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentObjectType: 'text', //当前要添加对象的类型
    }
  }
  componentWillMount() {
  }


  render() {
    const { currentObjectType } = this.state;
    const { 
      currentOptionArr, 
      addShape,
      updateThisCurrentOptionArr,
      handleOptionsChange
    } = this.props
    return (
      <div className='option'>
        <div className='box'>
          <div className='btns'>
            <Radio.Group
              value={currentObjectType}
              onChange={e => {
                this.setState({ currentObjectType: e.target.value });
                //this.currentOptionArr = _.cloneDeep(newOptionArr);  //复原数据
              }}
            >
              {optionArr.map((item, i) => {
                return (
                  <Radio.Button value={item.type} key={i}>
                    {item.name}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </div>
        </div>
        {currentOptionArr.map((item, i) => {
          if (item.type === currentObjectType) {
            return (
              <div key={i} className='option-li'>
                <div className='row'>
                  <div className='h3'>{item.name} </div>
                  {item.type !== 'canvas' && (
                    <div className='btn'>
                      <Button type='primary' onClick={() => addShape(i)}>
                        添加
                          </Button>
                    </div>
                  )}
                </div>
                {Object.keys(item.css).map((item2, i2) => {
                  return (
                    <div className='row' key={i2}>
                      <div className='h3'>{item2} </div>
                      {!_.isArray(item.css[item2]) && item2 !== 'text' && (
                        <Input
                          defaultValue={item.css[item2]}
                          //value={item.css[item2]}
                          onChange={event => {
                            updateThisCurrentOptionArr(i, item2, event.target.value)
                            if (item.type === 'canvas') {
                              handleOptionsChange(item2, event.target.value)
                            }
                          }}
                        />
                      )}
                      {!_.isArray(item.css[item2]) && item2 === 'text' && (
                        <TextArea
                          defaultValue={item.css[item2]}
                          onChange={event => {
                            updateThisCurrentOptionArr(i, item2, event.target.value)
                            if (item.type === 'canvas') {
                              handleOptionsChange(item2, event.target.value)
                            }
                          }}
                        />
                      )}
                      {_.isArray(item.css[item2]) && (
                        <Select
                          defaultValue={item.css[item2][0]}
                          style={{ width: 120 }}
                          onChange={value => {
                            updateThisCurrentOptionArr(i, item2, value)
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
          } else {
            return ''
          }
        })}
      </div>
    )
  }

}