## 表格

### 表格属性

| 参数                                   | 说明                                                   | 默认值 | 类型                  | 参数 |
| -------------------------------------- | ------------------------------------------------------ | ------ | --------------------- | ---- |
| columns                                | 列                                                     | []     | Array                 |      |
| datas                                  | 表格数据                                               | []     | Array                 |      |
| headerHeight                           | 表头高度                                               | 30     | Number                |      |
| rowHeight                              | 单元格高度                                             | 25     | Number                |      |
| defaultColDef                          | 所有列都将继承的列属性                                 | {}     | Object                |      |
| suppressMovableColumns                 | 抑制列移动                                             | false  | Boolean               |      |
| quickFilterText                        | 使用此文本作为快速过滤器过滤行                         |        | String                |      |
| singleClickEdit                        | 启用单元格的单击编辑                                   | false  | Boolean               |      |
| suppressClickEdit                      | 设置为 true，以便单击或双击都不会开始编辑              | false  | Boolean               |      |
| editType                               | 设置为`fullRow`以启用`全行编辑`                        | ''     | `fullRow`             |      |
| stopEditingWhenGridLosesFocus          | 网格失去焦点时停止单元格编辑                           | false  | Boolean               |      |
| enterMovesDown enterMovesDownAfterEdit | 两个属性都设置为 true 以使 Enter 键具有 Excel 样式行为 | false  | Boolean               |      |
| pinnedTopRowData                       | 要在网格中显示为固定顶行的数据                         | []     | Array                 |      |
| pinnedBottomRowData                    | 要在网格中显示为固定底部行的数据。                     | []     | Array                 |      |
| pagination                             | 启用分页                                               | false  | Boolean               |      |
| paginationPageSize                     | 每页加载多少行                                         | 100    | Number                |      |
| paginationAutoPageSize                 | 每页加载的行数自动调整                                 | false  | Boolean               |      |
| suppressPaginationPanel                | 隐藏分页控件                                           | false  | Boolean               |      |
| cellStyle                              | 单元格样式                                             |        | Object                |      |
| cellClass                              | 单元格类名                                             |        | String                |      |
| rowStyle                               | 行样式                                                 |        | Object                |      |
| rowClass                               | 行类名                                                 |        | String                |      |
| rowSelection                           | 单选或多选                                             |        | `single` 、`multiple` |      |
| rowMultiSelectWithClick                | 允许单击选择多行                                       | false  | Boolean               |      |
| suppressRowClickSelection              | 单击行时不会发生行选择                                 | false  | Boolean               |      |

### `columns`列属性

| 参数              | 说明                        | 默认值 | 类型                      | 参数 |
| ----------------- | --------------------------- | ------ | ------------------------- | ---- |
| headerName        | 表头文字                    |        | String                    |      |
| field             | 绑定字段                    |        | String                    |      |
| pinned            | 设置为`left`或`right`以固定 |        | `left`,`right`            |      |
| headerClass       | 标题单元格的类              |        | String                    |      |
| width             | 宽度                        |        | Number                    |      |
| hide              | 吃否隐藏列                  | false  | Boolean                   |      |
| resizable         | 允许调整列的大小            | false  | Boolean                   |      |
| checkboxSelection | 在列中呈现选择复选框        | false  | Boolean Function(Boolean) |      |
| cellClass         | 单元格的类                  |        | String, Function(String)  |      |
| cellStyle         | 单元格样式                  |        | Object, Function(Object)  |      |
| editable          | 是否允许编辑                | false  | Boolean                   |      |
| singleClickEdit   | 单击后进入编辑模式          | false  | Boolean                   |      |
