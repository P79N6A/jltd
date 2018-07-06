import * as React from 'react';
import { Form, Input, Select, DatePicker, Checkbox, Radio } from 'antd';
import classnames from 'classnames';
import * as moment from 'moment';
const styles = require('./style/index.less');

// import DataDictionaryComponents from '../../DataDictionaryComponents/DataDictionaryComponents';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Search = Input.Search;
const Option = Select.Option;
const RadioGroup = Radio.Group;
// 获取FormItem
const FormItem = Form.Item;
export interface EditableCellProps {
  handleSubmit: Function; // 提交方法
  getEditRowFormRef?: any;
  rows?: any;
  placeholder?: any;
  className?: any;
  DateEnd?: any;
  DateBegin?: any;
  viewStyle?: any;
  filterOption?: any;
  radioData?: any;
  optionData?: any;
  fieldId?: any;
  defaultValue?: any;
  style?: any;
  dropdownMatchSelectWidth?: any;
  disabled?: boolean | string;
  onBlur?: (e?: any) => void;
  onChange: (e?: any, b?: any) => void | any;
  onClick?: (e?: any) => void;
  maxLength?: number;
  type?: string;
  editable?: any;
  value: string;
  field?: string;
  fieldOption?: any;
  form?: any;
  datas?: Array<{
    isRequire?: boolean; // 是否显示必填星号提示
    type: string; // 类型
    onChange: Function; // 状态变化方法
    value?: string; // 外部修改输入框的值
    codeType?: string; // 数据字典选择框的类型
    defaultValue?: string; // 默认值
    className?: string; // 样式修改
    dropdownMatchSelectWidth?: boolean;
    mode?: string;
    style?: Object;
    placeholder?: string; // 提示文字
    optionData?: Array<{ value: string; text: string }>; // 下拉框内容
    radioData?: Array<{ value: string; text: string }>; // 单选框内容
  }>;
}

class EditableCell extends React.Component<EditableCellProps> {
  private fieldOption: any;
  constructor(props: EditableCellProps) {
    super(props);
    this.state = {
      dataDictionaryList: [],
      loading: false,
    };
    this.fieldOption = {};
  }
  componentDidMount() {
    if (this.props.getEditRowFormRef != null) {
      this.props.getEditRowFormRef(this.props.form);
    }
  }
  componentWillReceiveProps(nextPorps: EditableCellProps) {
    if (nextPorps.fieldOption == null) {
      this.fieldOption = { initialValue: nextPorps.value };
    } else if (nextPorps.fieldOption.initialValue == null) {
      this.fieldOption = nextPorps.fieldOption;
      this.fieldOption.initialValue = nextPorps.value;
    }
  }
  /**
   * 创建FormItem
   * formItemProps: FormItem的属性
   * fieldId: 控件的id，唯一标识
   * fieldOption: getFieldDecorator方法传入的option
   * field： 组件
   */
  createFormItem = (field: any) => {
    const { fieldId, editable, value, form } = this.props;
    const { getFieldDecorator } = form;
    const options = this.fieldOption;
    if (!options.initialValue) {
      options.initialValue = value;
    }
    return (
      <div>
        {editable ? (
          <FormItem>
            {getFieldDecorator(fieldId == null ? '' : fieldId, options)(field)}
          </FormItem>
        ) : (
          <span>{value == null ? '' : value}</span>
        )}
      </div>
    );
  };
  createHiddenInput = (field: any) => {
    const { fieldId, editable, value, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        {editable ? (
          <FormItem>
            {getFieldDecorator(
              fieldId == null ? '' : fieldId,
              this.fieldOption
            )(field)}
          </FormItem>
        ) : (
          <span>{value == null ? '' : value}</span>
        )}
      </div>
    );
  };
  convertFormInfo = () => {
    let field;
    if (this.props.type === 'hidden') {
      field =
        this.props.field == null ? <Input type="hidden" /> : this.props.field;
      return this.createHiddenInput(field);
    }
    field = this.props.field == null ? this.editComponents() : this.props.field;
    return this.createFormItem(field);
  };
  editComponents = () => {
    switch (this.props.type) {
      case 'input':
        return (
          <Input
            maxLength={this.props.maxLength}
            placeholder={this.props.placeholder}
            className={styles['view-style']}
            disabled={this.props.disabled === true}
            style={this.props.style}
            onBlur={e => {
              if (this.props.onBlur) {
                this.props.onBlur(e.target.value);
              }
            }}
            onChange={e => {
              if (this.props.onChange) {
                this.props.onChange(e.target.value);
              }
            }}
          />
        );
      case 'textarea':
        return (
          <TextArea
            rows={this.props.rows === undefined ? 4 : this.props.rows}
            value={this.props.value}
            placeholder={this.props.placeholder}
            className={classnames(styles['view-style'], this.props.viewStyle)}
            disabled={this.props.disabled === true}
            style={this.props.style}
            onChange={e => {
              if (this.props.onChange) {
                this.props.onChange(e.target.value);
              }
            }}
          />
        );
      case 'search':
        return (
          <Search
            defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder}
            onSearch={this.props.onChange}
            className={styles['view-style']}
            onClick={this.props.onClick}
          />
        );
      case 'select':
        const {
          className,
          disabled,
          dropdownMatchSelectWidth,
          filterOption,
          onChange,
          optionData,
          placeholder,
          style,
        } = this.props;
        const renderOption = (optionData || []).map((option?: any) => {
          return (
            <Option key={option.value} value={option.value}>
              {option.text}
            </Option>
          );
        });
        // 输入搜索模式
        let showSearch = false;
        // 如果props.filterOption有方法，表示是带输入过滤的选择框模式
        if (filterOption) {
          showSearch = true;
        }
        return (
          <Select
            disabled={disabled === true || disabled === 'true'}
            showSearch={showSearch}
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            style={style || { width: 170 }}
            className={className || styles['view-style']}
            dropdownMatchSelectWidth={
              dropdownMatchSelectWidth === undefined
                ? true
                : dropdownMatchSelectWidth
            }
            placeholder={placeholder}
          >
            {renderOption}
          </Select>
        );
      case 'dataPicker':
        return (
          <DatePicker
            className={styles['view-style']}
            defaultValue={this.props.defaultValue}
            format={'YYYY/MM/DD'}
            onChange={(moments, dateStrings) => {
              console.log(moments);
              if (this.props.onChange) {
                this.props.onChange(dateStrings);
              }
            }}
            value={moment(this.props.value)}
          />
        );
      case 'rangePicker':
        return (
          <RangePicker
            value={
              this.props.DateBegin
                ? [moment(this.props.DateBegin), moment(this.props.DateEnd)]
                : []
            }
            onChange={(moments, dateStrings) => {
              console.log(moments);
              if (this.props.onChange) {
                this.props.onChange(dateStrings[0], dateStrings[1]);
              }
            }}
          />
        );
      case 'checkbox':
        return (
          <div
            className={classnames(
              styles['view-style'],
              styles['checkbox-style']
            )}
          >
            <Checkbox
              defaultChecked={this.props.defaultValue}
              onChange={this.props.onChange}
            />
          </div>
        );
      case 'radioGroup':
        const renderRadio = (this.props.radioData || []).map((radio: any) => {
          return (
            <Radio value={radio.value} key={radio.value}>
              {radio.text}
            </Radio>
          );
        });
        return (
          <div
            className={classnames(
              styles['view-style'],
              styles['radio-group-style']
            )}
          >
            <RadioGroup
              onChange={e => {
                this.props.onChange(e.target.value);
              }}
              value={this.props.value}
            >
              {renderRadio}
            </RadioGroup>
          </div>
        );
      /* case 'dataDictionary':
                return (
                    <DataDictionaryComponents
                        codeType={this.props.codeType}
                        disabled={this.props.disabled === true || this.props.disabled === 'true'}
                        value={this.props.value}
                        defaultValue={this.props.defaultValue}
                        className={this.props.className || styles['view-style']}
                        style={this.props.style || { width: 170 }}
                        onChange={this.props.onChange}
                        dropdownMatchSelectWidth={
                            this.props.dropdownMatchSelectWidth === undefined
                                ? true : this.props.dropdownMatchSelectWidth
                        }
                        mode={this.props.mode ? this.props.mode : ''}
                    />
                ); */
      default:
        break;
    }
  };
  render() {
    return <div>{this.convertFormInfo()}</div>;
  }
}
export default EditableCell;