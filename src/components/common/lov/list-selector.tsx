import { Modal, Popover, Spin, Button } from 'antd';
import config from 'config';
import { connect } from 'dva';
import debounce from 'lodash.debounce';
import moment from 'moment';
import React, { Component } from 'react';
// tslint:disable-next-line: ordered-imports
import { formatMoney, messages } from '@/utils/utils';
// tslint:disable-next-line: ordered-imports
import httpFetch from '@/share/httpFetch';
import { IListSelectorProps, ILov } from './interface';
import Lov from './lov';

interface IListSelectorState {
  lov: ILov;
  loading: boolean;
  saveLoading: boolean;
}

class ListSelector extends Component<IListSelectorProps, IListSelectorState> {
  static defaultProps = {
    width: 800,
  }

  lovRef: any;

  constructor(props: IListSelectorProps) {
    super(props);
    this.state = {
      lov: {},
      loading: true,
      saveLoading: false,
    };
    this.onOk = debounce(this.onOk, props.delay ? 200 : 0);
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;
    // lov显示
    if (nextProps.visible && !visible) {
      this.getLovByCode(nextProps);
    }
  }

  // 获取lov详情
  getLovByCode = (nextProps: IListSelectorProps): void => {
     /* @ts-ignore */
    const { code, lovData, dispatch, selectorItem, searchList = [], searchListIndex, columnsList = [] } = nextProps;

    const columnsMap = {};

    if (Array.isArray(columnsList) && columnsList.length) {
      columnsList.forEach(column => { if (column.dataIndex) { columnsMap[column.dataIndex] = column } })
    }

    const columnsFlag = !!Object.keys(columnsMap).length;

    if (selectorItem && selectorItem.constructor === Object) {
      selectorItem.columns = selectorItem.columns.map(item => {
        let tempItem = item;
        tempItem.title = messages(item.title);
        if (item.tooltips) {
          tempItem.render = value => <Popover content={value}>{value}</Popover>;
        }
        if (columnsFlag && columnsMap[item.dataIndex]) {
          tempItem = { ...tempItem, ...columnsMap[item.dataIndex] }
        };
        return tempItem;
      });


      if (Array.isArray(searchList)) {
        const exitIds = selectorItem.searchForm.map(item => item.id);
        const tempSearchList = searchList.filter(item => !exitIds.includes(item.id));
        if (searchListIndex || searchListIndex === 0) {
          selectorItem.searchForm.splice(searchListIndex, 0, ...tempSearchList);
        } else {
          selectorItem.searchForm = selectorItem.searchForm.concat(tempSearchList);
        }
      }
      const { paramAsBody = false } = this.props;
      this.setState({ lov: { method: 'get', paramAsBody, ...selectorItem }, loading: true }, () => {
        this.setState({ loading: false });
      })

    } else if (code) {
      if (code in lovData) {
        // loading 的切换不仅时为了旋转加载，同时也是重挂载lov组件
        this.setState({ lov: { ...lovData[code], key: nextProps.valueKey }, loading: true }, () => {
          this.setState({ loading: false })
        });
        return;
      }

      this.setState({ loading: true });
      httpFetch
        .get(`${config.baseUrl}/api/lov/detail/${code}`)
        .then(({ data }) => {
          if (data) {
            const tempData = data;
            const { hideColumns = [], hideSearchList = [], paramAsBody = false } = this.props;

            tempData.columns = data.columns.reduce((pre, cur) => {
              if (!cur) { return pre; }
              if (hideColumns.includes(cur.dataIndex)) { return pre; }
              if (cur.dataIndex in columnsMap) { return pre; }

              const temp = { ...cur, title: messages(cur.title), width: cur.width || 200 }
              const tempObjAfterAdd = this.addRenderFnc(temp);
              pre.push(tempObjAfterAdd);
              return pre;
            }, []).concat(columnsList);

            const tempSearchMap = {}

            searchList.forEach(item => { if (item.id) { tempSearchMap[item.id] = item } });

            tempData.searchForm = [
              ...data.searchForm.reduce((pre, cur) => {
                if (hideSearchList.includes(cur.id)) { return pre; }
                if (cur.id in tempSearchMap) {
                  return pre;
                }
                pre.push({ ...cur, label: messages(cur.label) })
                return pre;
              }, []),
            ];

            if (searchListIndex || searchListIndex === 0) {
              tempData.searchForm.splice(searchListIndex, 0, ...searchList);
            } else {
              tempData.searchForm = tempData.searchForm.concat(searchList);
            }

            this.setState({ lov: { ...tempData, key: nextProps.valueKey, paramAsBody }, loading: false }, () => {
              const { lov } = this.state;
              dispatch({
                type: "lov/addLovData",
                payload: { [code]: lov },
              })
            });
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  };

  onOk = () => {
    const { onOk, single, lovType, code } = this.props;
    if (onOk) {
      this.setState({ saveLoading: true })
      if (single && lovType === 'lov') {
        onOk(this.lovRef.state.selectedRows[0] || null);
      } else if (lovType === 'listSelector') {
        onOk({
          type: code || '',
          result: this.lovRef.state.selectedRows,
        });
      } else {
        onOk(this.lovRef.state.selectedRows);
      }
    }
  };

  cancelHandle = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  // 为columns的每个成员添加一个render函数
  addRenderFnc = (column) => {
    const temp = column;
    if (temp.fieldType) {
      const { fieldType } = temp;
      switch (fieldType) {
        case 'time':
          temp.align = "center";
          temp.render = (value) => {
            return value ? moment(value).format('YYYY-MM-DD') : '-';
          }
          break;
        case 'amount':
          temp.align = "right";
          temp.render = (value) => {
            return formatMoney(value, 2, true)
          }
          break;
        default:
          temp.align = "left";
          temp.render = (value) => {
            return (
              <Popover content={value}>{value}</Popover>
            )
          }
      }
    }
    return temp;
  }

  render() {
    const { loading, lov } = this.state;
     /* @ts-ignore */
    const { single, disabled, visible, width, value, title, selectedData, hideFooter, diyFooter, onReturn, okText, cancelText, confirmLoading } = this.props;

    const foot = (diyFooter && hideFooter)
      ? { footer: (<Button onClick={onReturn || this.cancelHandle}>{messages('budgetJournal.return')}</Button>) }
      : hideFooter ? { footer: null } : {};

    return (
      <Modal
        title={messages(title || lov.title)}
        visible={visible}
        bodyStyle={{ maxHeight: '65vh', overflow: 'auto', minHeight: '200px' }}
        onOk={this.onOk}
        confirmLoading={confirmLoading}
        onCancel={this.cancelHandle}
        width={typeof width === 'number' ? width : parseInt(width, 10)}
        okText={okText || messages('common.ok')}
        cancelText={cancelText || messages('common.cancel')}
        okButtonProps={{ style: { display: (!single && disabled) ? 'none' : 'inline-block' } }}
        {...foot}
        afterClose={() => { this.setState({ saveLoading: false }) }}
      >
        {loading ? (
          <Spin />
        ) : (
          <Lov {...this.props} width={typeof width === 'number' ? width : parseInt(width, 10)} ref={ref => { this.lovRef = ref }} lov={lov} selectedData={value || selectedData} />
        )}
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    lovData: state.lov.data,
  }
}

export default connect(mapStateToProps)(ListSelector);
