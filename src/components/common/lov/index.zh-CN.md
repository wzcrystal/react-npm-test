
# lov
> 由Select及ListSelector组件组合而成，用于需要点击输入框，弹窗选择数据的场景

## API

| 参数              | 说明                                                                                                                                                                                     | 默认值      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| allowClear        | boolean; 是否允许清除（为true时在select上会出现小×）                                                                                                                                     | true        |
| placeholder       | string; 文本提示                                                                                                                                                                         | '请选择'    |
| disabled          | boolean;是否禁用                                                                                                                                                                         | false       |
| extraParams/listExtraParams | object, 弹框接口额外参数                                                                                                                                                                 | {}          |
| single            | boolean;    是否单选弹窗中的值                                                                                                                                                           | false       |
| onChange?         | 弹窗中确定事件，回调抛出选择的值                                                                                                                                                         | value => {} |
| labelKey          | string; 单选时指定select上展示的文本从value中的哪个字段获取                                                                                                                              | -           |
| value | selectedData  | any;                                                                                                                                                                                     | -           |
| hideColumns       | 用于隐藏列表中不需要展示的列                                                                                                                                                             | []          |
| hideSearchList    | 用于隐藏搜索区中不需要展示的搜索表单                                                                                                                                                     | []          |
| valueKey          | 指定弹窗行数据的rowKey取行数据中字段为valueKey值的值                                                                                                                                     | -           |
| code              | lov的Code，来自lov管理                                                                                                                                                                   | -           |
| title             | 弹窗的title                                                                                                                                                                              | -           |
| showDetail        | 弹窗中是否要以tag形式展示已选值                                                                                                                                                          | true        |
| twiceSearchFlag   | 弹窗搜索时是否要过滤空值                                                                                                                                                                 | false       |
| lovType           | lov的类型是lov还是chooser（chooser并入lov组件，但传值需要兼容）或listSelector                                                                                                                          | 'lov'       |
| cancelDoubleClick | 取消行数据双击自动选中事件  (双击自动选中（单选情况下）)                                                                                                                                 | false       |
| selectorItem      | 支持从外部定义弹窗的搜索区，列表区，url，key，调用接口的method                                                                                                                           | -           |
| searchList        | 支持从外部传入搜索区成员，该数组将与外部传入的selectorItem或接口获取的selectorItem中的searchForm数组合并                                                                                 | -           |
| columnsList       | 支持重写columns数组中的成员，原有在columns里的会以columnsList为主，覆写掉，在columnsList而不在原columns里的会添加到columns数组里，与searchList的一致| -           |
| hideRowSelect | 是否隐藏行勾选(原list-selector组件支持的东西) | false |
| hideFooter | 是否隐藏底部按钮 | false |
| diyFooter  | 是否在隐藏底部按钮后添加一个返回按钮 | false |
| onReturn   | 隐藏底部按钮后添加的返回按钮绑定的事件 | () => {} |
| onRowMouseEnter | 鼠标移出行事件 | (record,index,e) => {} |
| onRowMouseEnter | 鼠标移入行事件 | (record,index,e) => {} |
| isPage | 是否后端分页 | true |
| paramAsBody | 搜索区参数是否放入请求体 | false |


## 提示

1. lov组件为了兼容chooser，需要额外添加lovType属性，默认为`lov`，只有将chooser组件改为lov组件时，lovType才需要设置为 `chooser`,另外listSelector组件也可使用本组件下的list-selector,只需要将lovType设置为`listSelector`即可
2. 默认情况下需要使用`code`去调接口获取弹窗配置信息，但由于目前 弹窗搜索区只支持`输入框`,因此将 `selectorItem` 抛出，可由外部传入

## 示例

```tsx
  <Lov 
    code="company"
    labelKey="name"
    valueKey="id"
    value={value}
  >
  // -------------
  <Lov
    selectorItem={selectorItem}
    valueKey="id"
    labelKey="name"
    value={value}
    single
    lovType="chooser"
  />
  // ---------------------
  const selectorItem = {
      title: 'chooser.data.selectPerson',
      url: `${config.baseUrl}/api/user/search/all`,
      searchForm: [
        {
          type: 'input',
          id: 'keyword',
          label: '用户名、名称、邮箱、手机号',
        },
      ],
      columns: [
        {
          title: '用户代码',
          dataIndex: 'userCode',
          width: 100,
          tooltips: true,
        },
        {
          title: '用户名称',
          dataIndex: 'userName',
          width: 100,
          tooltips: true,
        },
      ],
      key: 'id',
    }
   <Lov
      selectorItem={selectorItem}
      labelKey="${userCode}-${userName}"
      valueKey="id"
      listExtraParams={{ ignoreUserId: user.id }}
      single
      placeholder={this.$t({ id: 'common.please.select' })}
      searchList={[
        {
          type: 'input',
          id: 'userName',
          label: '用户名',
        },
        {
          type: 'select',
          id: 'status',
          label: '状态',
          options: [{label: '启用', value: true},{label: '禁用', value: false}]
        }
      ]}
      columnsList={[{dataIndex: 'userCode',title: "用户代码", render: (value) => 123}]}
    />


   list-selector: 

   import ListSelector from 'components/common/lov/list-selector';

   <ListSelector
    visible={addCenterVisible}
    selectorItem={addCenterItem}
    onOk={this.handleAddCenter}
    labelKey={''}
    valueKey={'id'}
    selectedData={selectedData} // 或者下方 value={selectedData}
    // value={selectedData}
    onCancel={() => this.addResponsibility(false)}
    showSelectTotal={true}
    single={false}
    lovType="listSelector"
  />

   <ListSelector
    visible={addCenterVisible}
    code="company_lov"
    onOk={this.handleAddCenter}
    labelKey='name'
    valueKey='id'
    selectedData={selectedData} // 或者下方 value={selectedData}
    // value={selectedData}
    onCancel={() => this.addResponsibility(false)}
    showSelectTotal={true}
    single={false}
    lovType="listSelector"
  />
```

```text
ps: chooser换lov，引用路径修改为components/common/lov,组件上添加lovType属性，值为chooser，然后如果有type的统一更换后端重订的code，code找后端要文档，如果是selectorItem，定义在本页面的可以保留，这样改动小一点。listSelector同样的修改方式，只是注意lovType值为listSelector
```



