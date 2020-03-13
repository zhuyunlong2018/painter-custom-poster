import React from 'react';
import { Modal } from 'antd';
import exampleData from '../example/index';

/**
 * 海报例子、模板列表
 */
export default class Example extends React.Component {

  componentWillMount() {}


  render() {
    const { changeState, callable } = this.props
    return (
      <div className='example'>
        <div className='example-header'>
          <div className='example-header-h3'>例子展示</div>
        </div>
        <div className='ul'>
          {exampleData.map((item, i) => {
            //console.log('item', item);
            return (
              <div
                className='li'
                key={i}
                onClick={() => {
                  Modal.confirm({
                    title: '提示',
                    content: '确定要导入这个模板吗?',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                      changeState(
                        {
                          importCodeJson: item.json
                        }, callable
                      )
                    },
                    onCancel() { }
                  });
                }}
              >
                <img src={item.src} alt='' />
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}