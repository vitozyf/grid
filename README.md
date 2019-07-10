## 表格

### 表格属性

| 参数                  | 说明                                                            | 默认值                    | 类型                                      | 参数 |
| --------------------- | --------------------------------------------------------------- | ------------------------- | ----------------------------------------- | ---- |
| columns               | 列                                                              | []                        | Array                                     |      |
| datas                 | 表格数据                                                        | []                        | Array                                     |      |
| headerHeight          | 表头高度                                                        | 30                        | Number                                    |      |
| rowHeight             | 单元格高度                                                      | 25                        | Number                                    |      |
| getRowHeight          | 单元格高度回调                                                  |                           | Function                                  |      |
| pinnedTopRowData      | 要在网格中显示为固定顶行的数据                                  | []                        | Array                                     |      |
| pinnedBottomRowData   | 要在网格中显示为固定底部行的数据。                              | []                        | Array                                     |      |
| pageSize              | 每页行数                                                        | 20                        | Number                                    |      |
| pageIndex             | 当前页                                                          | 1                         | Number                                    |      |
| totalCount            | 总条数                                                          | 1                         | Number                                    |      |
| onPageChanged         | 翻页方法                                                        |                           | Function                                  |      |
| cellStyle             | 单元格样式                                                      |                           | Object                                    |      |
| cellClass             | 单元格类名                                                      |                           | String                                    |      |
| rowStyle              | 行样式                                                          |                           | Object                                    |      |
| getRowStyle           | 行样式回调                                                      |                           | Function                                  |      |
| rowClass              | 行类名                                                          |                           | String                                    |      |
| getRowClass           | 行类名回调                                                      |                           | Function                                  | data |
| isRowSelectable       | 回调用于确定哪些行是可选择的                                    |                           | Function                                  |      |
| domLayout             | 设置为`autoHeight`根据数据调整高度否则必须给容器高度            | normal                    | String（`normal`、`autoHeight`或`print`） |      |
| context               | 上下文对象,传递给大多数回调(内部不使用)                         |                           | Any                                       |      |
| --                    | --                                                              | --                        | --                                        | --   |
| type                  | 表格类型                                                        | base                      | String<`base`, `edit`>                    |      |
| selection             | 是否开启数据选择                                                | false                     | Boolean                                   |      |
| defaultColPro         | 列的重复定义属性(如设置最小列宽不用每列单独设置)                | {}                        | Object                                    |      |
| overlayNoRowsTemplate | 空数据 html 模版                                                | `'<span>暂无数据</span>'` | String                                    |      |
| selectConfig          | 选择项(选择本页(type='CurrentPage')，选择全部(type='AllPages')) |                           | Object                                    |      |

#### 注意问题

- 属性`datas`在组件内部有数据缓存，因此每次整体更换数据时需要调用`setRowData(datas)`方法设置数据，以清除缓存。
- 属性`columns`需要经过内部过滤器处理，因此如果初始设置后，还需要更改列配置（如从服务端获取某些列配置）需要调用`changeColumns(columns)`方法重新设置列

### `columns`列属性

| 参数                     | 说明                                     | 默认值         | 类型                      | 参数 |
| ------------------------ | ---------------------------------------- | -------------- | ------------------------- | ---- |
| headerName               | 表头文字                                 |                | String                    |      |
| field                    | 绑定字段                                 |                | String                    |      |
| pinned                   | 设置为`left`或`right`以固定              |                | `left`,`right`            |      |
| headerClass              | 标题单元格的类                           |                | String                    |      |
| width                    | 宽度(未设置或设置为 0 时自动调整宽度)    |                | Number                    |      |
| hide                     | 是否隐藏列                               | false          | Boolean                   |      |
| resizable                | 允许调整列的大小                         | false          | Boolean                   |      |
| checkboxSelection        | 在列中呈现选择复选框                     | false          | Boolean Function(Boolean) |      |
| headerCheckboxSelection  | 在表头中呈现选择复选框                   | false          | Boolean Function(Boolean) |      |
| cellClass                | 单元格的类                               |                | String, Function(String)  |      |
| cellStyle                | 单元格样式                               |                | Object, Function(Object)  |      |
| editable                 | 是否允许编辑                             | false          | Boolean                   |      |
| dataMap                  | 单元格编辑格式为选择项                   | [{key, value}] | Array                     |      |
| valueFormatter           | 数据过滤器(简单数据展示尽量使用此过滤器) |                | Function                  |      |
| cellRenderer             | 渲染方法(直接返回数据或返回 html 字符串) |                | Function                  |      |
| cellRendererFramework    | 渲染组件                                 |                | String                    |      |
| cellRendererParams       | 渲染组件参数                             |                | Any                       |      |
| headerComponentFramework | 表头渲染组件                             |                | String                    |      |
| headerComponentParams    | 表头渲染组件参数                         |                | Any                       |      |

### API(调用必须在表格组件挂载后)

| 方法                               | 说明                                                                |
| ---------------------------------- | ------------------------------------------------------------------- |
| setRowData(datas)                  | 修改表格数据（初始化赋值、翻页或整体修改时，清除缓存的已更新数据）  |
| getUpdatedDatas()                  | 获取修改的数据                                                      |
| changeColumns()                    | 修改列配置                                                          |
| getSelectedRows()                  | 获取选择的数据                                                      |
| selectAll()                        | 全选                                                                |
| deselectAll()                      | 清除选择                                                            |
| forEachNode(callBack)              | 遍历 node 节点(选择部分数据时，调用回调方法参数的`setSelected`方法) |
| updateRowData()                    | 外部更新数据， 参数（数据 Array 或单条数据）                        |
| setFocusedCell(rowIndex, colKey)   | 设置单元格焦点                                                      |
| startEditingCell(rowIndex, colKey) | 开始编辑单元格                                                      |

### 事件

| 事件名                                         | 说明                 | 参数 |
| ---------------------------------------------- | -------------------- | ---- |
| onCellClicked                                  | 单击单元格           |      |
| onCellDoubleClicked                            | 双击单元格           |      |
| onCellFocused                                  | 单元格获取焦点       |      |
| onCellMouseOver,onCellMouseOut,onCellMouseDown | 鼠标进入、离开、点击 |      |
| onRowClicked, onRowDoubleClicked               | 行单击、双击         |
| onSelectionChanged                             | API 选择行           |      |
| onCellContextMenu                              | 右键单击单元格       |      |
| onCellValueChanged                             | 编辑后               |      |
| onCellEditingStarted                           | 编辑开始             |      |
| onCellEditingStopped                           | 编辑结束             |      |
| onGridReady                                    | 表格准备就绪         |      |
| onRowSelected                                  | 行选择、取消选择后   |      |
| onCellValueChanged                             | 单元格值改变         |      |
| onFirstDataRendered                            | 数据第一次渲染后     |      |

### 更新记录

#### 1.0.7

- 优化`setRowData`方法数据缓存有时不及时的问题

#### 1.0.6

- 增加`setFocusedCell`、`startEditingCell` API

#### 1.0.5

- 增加`updateRowData`外部数据更新方法

#### 1.0.4

- 选择项增加（选择本页，选择全部的配置）， 需要服务端配合使用
- 调整列宽自动计算的初始化问题

#### 1.0.3

- 优化选择编辑器
- 增加修改数据后的单元格样式

#### 1.0.2

- 优化选择编辑器

#### 1.0.1

- 将列调整提前，取消`setColumnDefs`方法的执行，提高初始渲染效率
