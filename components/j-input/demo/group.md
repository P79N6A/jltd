---
order: 3
title:
    zh-CN: 输入框组合
    en-US: Input Group
---

## zh-CN

输入框的组合展现。

注意：使用 `compact` 模式时，不需要通过 `Col` 来控制宽度。

## en-US

Input.Group example

Note: You don't need `Col` to control the width in the `compact` mode.

````jsx
import { JInput, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'jltd';
const InputGroup = JInput.Group;
const Option = Select.Option;

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class CompactDemo extends React.Component {
  state = {
    dataSource: [],
  }
  handleChange = (value) => {
    this.setState({
      dataSource: !value || value.indexOf('@') >= 0 ? [] : [
        `${value}@gmail.com`,
        `${value}@163.com`,
        `${value}@qq.com`,
      ],
    });
  }
  render() {
    return (
      <div>
        <InputGroup size="large">
          <Col span={5}>
            <JInput defaultValue="0571" />
          </Col>
          <Col span={8}>
            <JInput defaultValue="26888888" />
          </Col>
        </InputGroup>
        <br />
        <InputGroup compact>
          <JInput style={{ width: '20%' }} defaultValue="0571" />
          <JInput style={{ width: '30%' }} defaultValue="26888888" />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Zhejiang">
            <Option value="Zhejiang">Zhejiang</Option>
            <Option value="Jiangsu">Jiangsu</Option>
          </Select>
          <JInput style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Option1">
            <Option value="Option1">Option1</Option>
            <Option value="Option2">Option2</Option>
          </Select>
          <JInput style={{ width: '50%' }} defaultValue="input content" />
          <InputNumber />
        </InputGroup>
        <br />
        <InputGroup compact>
          <JInput style={{ width: '50%' }} defaultValue="input content" />
          <DatePicker />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Option1-1">
            <Option value="Option1-1">Option1-1</Option>
            <Option value="Option1-2">Option1-2</Option>
          </Select>
          <Select defaultValue="Option2-2">
            <Option value="Option2-1">Option2-1</Option>
            <Option value="Option2-2">Option2-2</Option>
          </Select>
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="1">
            <Option value="1">Between</Option>
            <Option value="2">Except</Option>
          </Select>
          <JInput style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
          <JInput style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
          <JInput style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="Maximum" />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Sign Up">
            <Option value="Sign Up">Sign Up</Option>
            <Option value="Sign In">Sign In</Option>
          </Select>
          <AutoComplete
            dataSource={this.state.dataSource}
            style={{ width: 200 }}
            onChange={this.handleChange}
            placeholder="Email"
          />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select style={{ width: '30%' }} defaultValue="Home">
            <Option value="Home">Home</Option>
            <Option value="Company">Company</Option>
          </Select>
          <Cascader style={{ width: '70%' }} options={options} placeholder="Select Address" />
        </InputGroup>
      </div>
    );
  }
}

ReactDOM.render(<CompactDemo />, mountNode);
````
