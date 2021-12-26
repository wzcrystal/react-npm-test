/* eslint-disable */
/**
 * create 2019-01-14 fudebao
 */
import httpFetch from '@/share/httpFetch';
import { messages } from '@/utils/utils';
// import { Tag } from 'antd';
import React, { Component } from 'react';
import SearchArea from 'widget/search-area-lov';
import Table from 'widget/table';
import { ILovProps, ILovState } from './interface';

class Lov extends Component<ILovProps, ILovState> {
  static defaultProps = {
    extraParams: {},
    single: false,
    onSelectAll: () => { return; },
    isPage: true,
  };
  formRef: any;
  constructor(props: ILovProps) {
    super(props);
    this.state = {
      tableData: [],
      loading: false,
      page: 0,
      size: props.pagination ? props.pagination.pageSize : 10,
      pagination: {
        total: 0,
        current: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        // @ts-ignore
        showLessItems: true,
        pageSize: props.pagination ? props.pagination.pageSize : 10,
        // @ts-ignore
        pageSizeOptions: this.$pageSizeOptions,
        showTotal: (total, range) =>
          messages('common.show.total', {
            range0: `${range[0]}`,
            range1: `${range[1]}`,
            total,
          }),
      },
      searchParams: {},
      selectedRows: [],
      selectedRowKeys: [],
      frontPagination: {
        total: 0,
        showTotal: (total, range) =>
          messages('common.show.total', {
            range0: `${range[0]}`,
            range1: `${range[1]}`,
            total,
          }),
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20', '30', '40'],
      },
      // @ts-ignore
      sorters: undefined,
    };
  }

  componentDidMount() {
    const { lov, selectedData, single, lovType } = this.props;
    let data = [];
    if (selectedData) {
      data = single && lovType === 'lov' ? [selectedData] : selectedData;
    }
    this.setState(
      {
        selectedRows: JSON.parse(JSON.stringify(data)),
        selectedRowKeys: data.map(item => item[lov.key] ?item[lov.key] : item),
      },
      this.getList
    );
  }

  // 滤过对象中的空值
  filterEmptyValue = (values) => {
    if (values.constructor === Object) {
      const temp = {};
      Object.keys(values).forEach(key => {
        if (values[key] || String(values[key]) === 'false') {
          temp[key] = values[key]
        }
      })
      return temp;
    } return values;
  }

  // 获取表格数据
  getList = () => {
    const {
      lov: { url, key, method },
      extraParams,
      twiceSearchFlag,
      listExtraParams,
      lov,
    } = this.props;
    let { requestBody } = this.props;

    const {
      page,
      size,
      pagination: { current, pageSize },
      pagination,
      searchParams,
      selectedRows,
      selectedRowKeys,
      // @ts-ignore
      sorters,
    } = this.state;

    const finalExtraParams = listExtraParams && listExtraParams.constructor === Object
      ? listExtraParams
      : extraParams;

    const tempSearchParams = twiceSearchFlag ? this.filterEmptyValue(searchParams) : searchParams;
    const params = { ...finalExtraParams, ...tempSearchParams, sort: sorters };
    this.setState({ loading: true });
    if (!url || !method) { return; }

    let newUrl = url;
    const reg = /\?+/;
    let flag = false;
    // 检测是否已经有参数了，如果有直接加&
    newUrl = reg.test(newUrl)
      ? `${newUrl}&page=${current - 1}&size=${pageSize}`
      : `${newUrl}?page=${current - 1}&size=${pageSize}`;

    if (lov && lov.paramAsBody) {
      requestBody = params;
    } else if (method === 'get') {
      // get请求，params放到requestBody上， 原本的requestBody绝对不可能需要使用
      requestBody = params;
    } else if (method === 'post' && (params.constructor === Object && Object.keys(params).length)) {
      flag = !!(params.constructor === Object && Object.keys(params).length);
      // post请求，且有额外参数要放到请求头上，那么将flag置为true,在axios上传第五参数
    }

    httpFetch[method](newUrl, requestBody, null, null, flag ? params : {})
      .then(res => {
        const isAllFlag = false;
        if (isAllFlag) {
          if (res.data) {
            res.data.forEach(o => {
              if (selectedRowKeys.indexOf(o[key]) < 0) {
                selectedRowKeys.push(o[key]);
                selectedRows.push(o);
              }
            });
          }
          this.setState({
            selectedRowKeys: [...selectedRowKeys],
            selectedRows,
          });
        }
        this.setState({
          tableData: res.data || [],
          loading: false,
          pagination: { ...pagination, total: Number(res.headers['x-total-count']) || 0 },
        });
      })
      .catch(err => {
        console.error(err)
        this.setState({ loading: false });
      });
  };

  // 搜素
  search = values => {
    const { pagination, searchParams } = this.state;
    pagination.current = 1;
    this.setState({ searchParams: { ...searchParams, ...values }, page: 0, pagination }, this.getList);
  };

  // 清除搜索条件
  clear = () => {
    this.setState({ searchParams: {} });
  };

  // 分页改变
  indexChange = (page: number, size?: number): void => {
    const { pagination } = this.state;
    pagination.current = page;
    this.setState({ page: page - 1, pagination }, this.getList);
  };

  sizeChange = (page: number, size: number): void => {
    const { pagination } = this.state;
    pagination.current = 1;
    pagination.pageSize = size;
    this.setState({ page: 0, size, pagination }, this.getList);
  };

  // table行点击事件console.log(record);
  onTableClick = (record): void => {
    const { selectedRows, selectedRowKeys } = this.state;
    // @ts-ignore
    const { single, getCheckboxProps,disabled } = this.props;
    const {
      lov: { key },
    } = this.props;

    if (getCheckboxProps) {
      const { disabled } = getCheckboxProps(record, { selectedRows, selectedRowKeys }) || {};
      if (disabled) return;
    }

    // 多选
    if(!single && disabled) return;

    // 单选
    if (single) {
      this.setState({ selectedRows: [record], selectedRowKeys: [record[key]] });
      return;
    }

    const index = selectedRowKeys.indexOf(record[key]);
    if (index >= 0) {
      selectedRows.splice(index, 1);
      selectedRowKeys.splice(index, 1);
    } else {
      selectedRows.push(record);
      selectedRowKeys.push(record[key]);
    }
    this.setState({ selectedRows, selectedRowKeys: [...selectedRowKeys] });
  };

  // 取消选中
  onTagClose = (index: number) => {
    const { selectedRows, selectedRowKeys } = this.state;
    selectedRows.splice(index, 1);
    selectedRowKeys.splice(index, 1);
    this.setState({ selectedRows, selectedRowKeys: [...selectedRowKeys] });
  };

  // 取消
  onCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  // 确定
  onOk = () => {
    const { onOk, single, lovType } = this.props;
    const { selectedRows, type } = this.state;
    if (onOk) {
      if (single && lovType === 'lov') {
        onOk({
          result: selectedRows[0] || {},
          type,
        });
      } else {
        onOk({
          result: selectedRows,
          type,
        });
      }
    }
  };

  // 全选/取消全选
  onSelectAll = (selected: boolean, rows: any[], changeRows: any[]): void => {
    const { tableData, selectedRowKeys, selectedRows } = this.state;
    const {
      lov: { key },
    } = this.props;
    if (selected) {
      tableData.forEach(o => {
        if (selectedRowKeys.indexOf(o[key]) < 0) {
          selectedRowKeys.push(o[key]);
          selectedRows.push(o);
        }
      });
    } else {
      tableData.forEach(o => {
        const index = selectedRows.findIndex(item => item[key] === o[key]);
        selectedRowKeys.splice(index, 1);
        selectedRows.splice(index, 1);
      });
    }
    this.setState({ selectedRowKeys: [...selectedRowKeys], selectedRows });

    const { onSelectAll } = this.props;
    if (onSelectAll) {
      onSelectAll(selected, selectedRows, changeRows);
    }
  };

  handleSingleRowData = (record) => {
    const { onOk, lov: { key }, lovType, code } = this.props;
    this.setState({
      selectedRows: [record],
      selectedRowKeys: [record[key]],
    }, () => {
      if (lovType === 'lov') {
        onOk(record || null);
      } else if (lovType === 'listSelector') {
        onOk({
          type: code || '',
          result: [record],
        });
      } else {
        // @ts-ignore
        onOk([record]);
      }
    });
  }

  getDataLabel = (data: object, keys: string) => {
    let isMatch = false;
    keys = keys.replace(/\$\{(.*?)\}/g, (target, value) => {
      isMatch = true;
      return data[value] || '';
    });

    if (isMatch) {
      return keys;
    } else {
      return data[keys] || '';
    }
  }

  onTableChange = (pagination, filters, sorter) => {
    let sorters;
    if (sorter.field && sorter.order) {
      sorters = `${sorter.field}${sorter.order === "ascend" ? "" : ",desc"}`
    }
    // @ts-ignore
    this.setState({ sorters, pagination }, () => {
      this.getList();
    });
  }

  render() {
    const {
      lov: { columns, key, searchForm },
      labelKey,
      single,
      showDetail,
      width,
      hideRowSelect,
      onRowMouseEnter,
      onRowMouseLeave,
      isPage,
      // @ts-ignore
      getCheckboxProps, hideSelectAll, maxLength,
      disabled,
    } = this.props;

    const { tableData, loading, pagination, selectedRows, selectedRowKeys, frontPagination } = this.state;

    const rowSelection = {
      hideSelectAll,
      type: single ? 'radio' : 'checkbox',
      selectedRowKeys,
      onSelect: this.onTableClick,
      onSelectAll: this.onSelectAll,
      getCheckboxProps: (!single && disabled)
        ? () => ({ disabled: disabled })
        : getCheckboxProps
          ? record => getCheckboxProps(record, rowSelection)
          : undefined,
    };
    const scrollX = columns.reduce((pre, cur): number => pre + parseInt(String(cur.width || 200), 10), 0);

    return (
      <div>
        {searchForm &&
          !!searchForm.length && (
            <SearchArea
              searchForm={searchForm}
              submitHandle={this.search}
              clearHandle={this.clear}
              maxLength={maxLength}
              // eslint-disable-next-line no-return-assign
              wrappedComponentRef={inst => { this.formRef = inst }}
            />
          )}
        {/* <div style={{ minHeight: '30px' }}>
          {showDetail && (
            <div id="tag-box" style={{ marginBottom: 12 }}>
              {selectedRows.map((item, index) => {
                return (
                  <Tag
                    key={item[key]}
                    onClose={() => this.onTagClose(index)}
                    closable={!single}
                    style={{ marginBottom: 8 }}
                  >
                    {this.getDataLabel(item, labelKey)}
                  </Tag>
                );
              })}
            </div>
          )}
        </div> */}
        <div style={{ marginBottom: 12, fontSize: '12px' }}>
          {messages('common.total', { total: pagination.total || tableData.length })}
        </div>
        {columns &&
          !!columns.length && (
            <div>
              <Table
                tableLayout="fixed"
                rowKey={record => record[key]}
                columns={columns}
                dataSource={tableData}
                loading={loading}
                size="middle"
                pagination={isPage ? pagination : frontPagination}
                rowSelection={hideRowSelect ? null : rowSelection || null}
                onRow={(record, index) => ({
                  onClick: () => this.onTableClick(record),
                  onDoubleClick: (e) => {
                    e.preventDefault();
                    if (single) { this.handleSingleRowData(record) }
                  },
                  onMouseEnter: e => {
                    if (Object.prototype.toString.call(onRowMouseEnter) === '[object Function]') {
                      onRowMouseEnter(record, index, e);
                    }
                  },
                  onMouseLeave: e => {
                    if (Object.prototype.toString.call(onRowMouseLeave) === '[object Function]') {
                      onRowMouseLeave(record, index, e);
                    }
                  },
                })}
                scroll={{
                  x: scrollX > width ? scrollX : false,
                }}
                onChange={this.onTableChange}
              />
            </div>
          )}
      </div>
    );
  }
}

export default Lov;
