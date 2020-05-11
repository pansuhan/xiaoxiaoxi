$(function () {
    var jsonstr = '[{"author_order":"第1完成人","name":"","wage_number":"","bonusratio":100}]';
    var data_json = $.parseJSON(jsonstr);
    $("#datagrid").datagrid("loadData", data_json);
    var total_bonusratio = 0;
    var temp_value = [];
    var wage_num_json = [{
        工资号: ""
    }];
    var department_json = [{
        单位名称: ""
    }];

    $("#datagrid").datagrid({
        data: data_json,
        singleSelect: true,
        rownumbers: true,
        nowrap: true,
        fitColumns: true,
        columns: [
            [
                {
                    field: "author_order",
                    width: 100,
                    title: '完成人',
                    align: "center",
                },
                {
                    field: "name",
                    width: 100,
                    title: '完成人姓名',
                    align: "center",
                    editor: {
                        type: "textbox",
                    }
                },
                {
                    field: "department",
                    width: 100,
                    title: '完成人单位',
                    align: "center",
                    editor: {
                        type: "combobox",
                        options: {
                            data: department_json,
                            textField: "单位名称",
                            valueField: "单位名称",
                            panelHeight: "auto",
                            editable: true
                        }
                    }
                },
                {
                    field: "wage_number",
                    width: 100,
                    title: '工资号',
                    align: "center",
                    editor: {
                        type: "combobox",
                        options: {
                            data: wage_num_json,
                            textField: "工资号",
                            valueField: "工资号",
                            panelHeight: "auto",
                            editable: false
                        }
                    }
                },
                {
                    field: "bonusratio",
                    width: 110,
                    title: '奖金比例',
                    align: "center",
                    editor: {
                        type: "numberbox"
                    }
                },
            ]
        ],

        onLoadSuccess: function (data) {
            for (var i = 0; i < data.total; i++) {
                $(this).datagrid("beginEdit", i);
                $('#datagrid').datagrid('getEditors', 0)[3].target.textbox('textbox').attr('readonly', true);  //设置输入框为禁用
            }
        },
        onBeginEdit: function (rowIndex, rowData) {
            total_bonusratio = 0;
            temp_value = [];
            var editors = $('#datagrid').datagrid('getEditors', rowIndex);
            var editors_1 = $('#datagrid').datagrid('getEditors', 0);
            var lendEditor = editors[0];
            var loadEditor1 = editors[1];
            var loadEditor2 = editors[2];
            var lastEditor = editors[3];
            var lastEditor_1 = editors_1[3];
            $('#datagrid').datagrid('getEditors', 0)[3].target.textbox('textbox').attr('readonly', true);  //设置输入框为禁用
            //target属性就用于返回最初触发事件的DOM元素
            lendEditor.target.textbox({
                onChange: function (newValue, oldValue) {
                    $.ajax({
                        //请求方式
                        type: "get",
                        //请求地址
                        url: "../../Src/paper/paper.ashx?action=get_author_num&name=" + newValue,
                        //数据，json字符串
                        //请求成功
                        success: function (result) {
                            if (JSON.parse(result).length > 0) {
                                if ((JSON.parse(result).length == 1)) {
                                    loadEditor1.target.combobox('setValue', JSON.parse(result)[0].单位名称);
                                    loadEditor2.target.combobox('setValue', JSON.parse(result)[0].工资号);
                                }
                                else {
                                        loadEditor1.target.combobox('loadData', JSON.parse(result));
                                        loadEditor2.target.combobox('loadData', JSON.parse(result));
                                    
                                }
                                
                            }
                            else {
                                loadEditor1.target.combobox('setValue', "无单位信息");
                                loadEditor2.target.combobox('setValue', "0");
                            }
                        },
                        //请求失败，包含具体的错误信息
                        error: function (e) {
                            console.log(e.status);
                            console.log(e.responseText);
                        }
                    });
                }
            });
            lastEditor.target.numberbox({
                onChange: function (newValue, oldValue) {
                    if (rowIndex != 0) {
                        var editors_temp = $('#datagrid').datagrid('getEditors', 0);
                        var lastEditor_temp = editors_temp[3];
                        temp_value.push(Number(lastEditor_temp.oldHtml));
                        if (temp_value.length == 1) {
                            total_bonusratio = Number(newValue) - Number(oldValue);
                            lastEditor_1.target.numberbox('setValue', Number(temp_value[0]) - Number(total_bonusratio));
                            temp_value.push(Number(temp_value[0]) - Number(total_bonusratio));
                        }

                        else {
                            total_bonusratio = Number(newValue) - Number(oldValue);
                            lastEditor_1.target.numberbox('setValue', temp_value[temp_value.length - 2] - Number(total_bonusratio));
                            temp_value.push(temp_value[temp_value.length - 2] - Number(total_bonusratio));
                        }
                        if (temp_value[temp_value.length - 1] < 0) {
                            $.messager.alert('', '奖金比例不能超过100%!', 'error', function () {
                                total_bonusratio = 0;
                                temp_value = [];
                                parent.close();
                                return false;
                            });

                        }
                    }


                }
            });

        }
    });

    $('#author_num').combobox({
        onChange: function (newValue, oldValue) {
            total_bonusratio = 0;
            var jsonstr_copy = jsonstr.substring(0, jsonstr.length - 1);
            for (var i = 1; i < newValue; i++) {
                jsonstr_copy = jsonstr_copy + "," + '{"author_order":' + '\"第' + parseInt(i + 1) + '完成人\"' + "," + '"name":"","wage_number":"","bonusratio":0}';
            }
            jsonstr_copy = jsonstr_copy + ']';
            data_json = $.parseJSON(jsonstr_copy);
            $("#datagrid").datagrid("loadData", data_json);
        }
    });
})

// 判断是否存在编辑中的行
var editIndex = null;
function endEditing() {
    if (editIndex == null) {
        return true
    }
    if ($('#datagrid').datagrid('validateRow', editIndex)) {
        $('#datagrid').datagrid('endEdit', editIndex);
        editIndex = null;
        return true;
    } else {
        return false;
    }
}