$(function () {
    //用ajax访问数据库
    $.ajax({
        //请求方式
        type: "get",
        //请求地址
        url: "../../Src/paper/paper.ashx?action=get_grade&grade_type=" + '专著教材',
        //数据，json字符串
        //请求成功
        success: function (result) {
            $("#textbook_type").combogrid({
                panelWidth: 500,
                multiple: false,
                nowrap: false,
                data: JSON.parse(result),
                idField: '等级',
                textField: '等级',
                method: 'get',
                editable: false,
                columns: [[
                              { field: '等级', title: '知识产权成果类别名称', width: 400 },
                              { field: '业绩点', title: '业绩点', width: 80 },
                ]],
            });
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });

    $("#yearChoose").combobox({
        valueField: 'year',
        textField: 'year',
        panelHeight: 'auto'
    });
    var data = [];//创建年度数组
    var startYear;//起始年份
    var thisYear = new Date().getUTCFullYear();//今年
    var endYear = thisYear + 1;//结束年份
    for (startYear = endYear - 4; startYear <= endYear; startYear++) {
        data.push({ "year": startYear });
    }
    $("#yearChoose").combobox("loadData", data);//下拉框加载数据
    $("#yearChoose").combobox("setValue", thisYear);//设置默认值为今年

})


//提交表单信息，上传论著教材信息
function textbook_submitForm_add() {
    var rows = $('#datagrid').datagrid("getRows");
    for (var i = 0; i < rows.length; i++) {
        $('#datagrid').datagrid('endEdit', i);
        $('#datagrid').datagrid('selectRow', i).datagrid('endEdit', i);//关闭第i行的编辑
    }
    var isValid = $("#textbookInfo_form").form('validate');
    var param = $("#datagrid").datagrid("getRows");
    var FieldCount = 0;
    var Maxcount = parseInt(param.length);
    while (Maxcount >= 0) {
        FieldCount++;
        $("#textbook_info_table").append('<input class="easyui-textbox" type="hidden" name="textbook_table_author_order_' + FieldCount + '"' + 'id="textbook_table_author_order_' + FieldCount + '"' + '/>');
        $("#textbook_info_table").append('<input class="easyui-textbox" type="hidden" name=textbook_table_name_' + FieldCount + '"' + 'id="textbook_table_name_' + FieldCount + '"' + '/>');
        $("#textbook_info_table").append('<input class="easyui-textbox" type="hidden" name="textbook_table_department_' + FieldCount + '"' + 'id="textbook_table_department_' + FieldCount + '"' + '/>');
        $("#textbook_info_table").append('<input class="easyui-textbox" type="hidden" name="textbook_table_wage_number_' + FieldCount + '"' + 'id="textbook_table_wage_number_' + FieldCount + '"' + '/>');
        $("#textbook_info_table").append('<input class="easyui-textbox" type="hidden" name="textbook_table_bonusratio_' + FieldCount + '"' + 'id="textbook_table_bonusratio_' + FieldCount + '"' + '/>');
        Maxcount--;
    }
    for (var i = 0; i < param.length; i++) {
        $("#textbook_table_author_order_" + parseInt(i + 1)).val(param[i].author_order);
        $("#textbook_table_name_" + parseInt(i + 1)).val(param[i].name);
        $("#textbook_table_department_" + parseInt(i + 1)).val(param[i].department);
        $("#textbook_table_wage_number_" + parseInt(i + 1)).val(param[i].wage_number);
        $("#textbook_table_bonusratio_" + parseInt(i + 1)).val(param[i].bonusratio);
    }
    if (isValid) {
        $('#textbookInfo_form').form('submit', {
            url: "../../../Src/textbook/textbook.ashx?action=insertTextbookData",
            success: function (data) {
                if (data > 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '添加成功',
                        fn: function () {
                            parent.$('#textbook_add_dialog').dialog('close');//关闭dialog 
                            parent.$('#textbook_datagrid').datagrid("reload");//datagrid 加载返回的数据 
                        }
                    });
                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '添加失败!',
                        fn: function () {
                            parent.$('#textbook_add_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
            }
        });
    }
}

//论著修改的信息提交
function textbook_submitForm_update() {
    var rows = $('#datagrid').datagrid("getRows");
    for (var i = 0; i < rows.length; i++) {
        $('#datagrid').datagrid('endEdit', i);
        $('#datagrid').datagrid('selectRow', i).datagrid('endEdit', i);//关闭第i行的编辑
    }
    var isValid = $("#textbookInfo_form").form('validate');
    var param = $("#datagrid").datagrid("getRows");
    var FieldCount = 0;
    var Maxcount = parseInt(param.length);
    while (Maxcount >= 0) {
        FieldCount++;
        $("#textbook_info_table").append('<input class="easyui-textbox" type="hidden" name="textbook_table_author_order_' + FieldCount + '"' + 'id="textbook_table_author_order_' + FieldCount + '"' + '/>');
        $("#textbook_info_table").append('<input class="easyui-textbox" type="hidden" name="textbook_table_name_' + FieldCount + '"' + 'id="textbook_table_name_' + FieldCount + '"' + '/>');
        $("#textbook_info_table").append('<input class="easyui-textbox" type="hidden" name="textbook_table_department_' + FieldCount + '"' + 'id="textbook_table_department_' + FieldCount + '"' + '/>');
        $("#textbook_info_table").append('<input class="easyui-textbox" type="hidden" name="textbook_table_wage_number_' + FieldCount + '"' + 'id="textbook_table_wage_number_' + FieldCount + '"' + '/>');
        $("#textbook_info_table").append('<input class="easyui-textbox" type="hidden" name="textbook_table_bonusratio_' + FieldCount + '"' + 'id="textbook_table_bonusratio_' + FieldCount + '"' + '/>');
        Maxcount--;
    }
    for (var i = 0; i < param.length; i++) {
        $("#textbook_table_author_order_" + parseInt(i + 1)).val(param[i].author_order);
        $("#textbook_table_name_" + parseInt(i + 1)).val(param[i].name);
        $("#textbook_table_department_" + parseInt(i + 1)).val(param[i].department);
        $("#textbook_table_wage_number_" + parseInt(i + 1)).val(param[i].wage_number);
        $("#textbook_table_bonusratio_" + parseInt(i + 1)).val(param[i].bonusratio);
    }

    if (isValid) {
        $('#textbookInfo_form').form('submit', {
            url: "../../../Src/textbook/textbook.ashx?action=UpdateTextbookData&update_ID=" + window.update_ID,
            success: function (data) {
                if (data >= 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '修改成功！',
                        fn: function () {
                            parent.$('#textbook_update_dialog').dialog('close');//关闭dialog 
                            parent.$('#textbook_datagrid').datagrid("reload");//datagrid 加载返回的数据
                            parent.$("#textbook_update_iframe").attr("src", 'textbook_update.html'); //设置IFRAME的SRC;
                        }
                    });

                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '修改失败!',
                        fn: function () {
                            parent.$('#textbook_update_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
            }
        });
    }
}

//查询论著信息
function submit_textbook_search() {
    $('#textbookInfo_form').form('submit', {
        url: "../../../Src/textbook/textbook.ashx?action=SearchtextbookData",
        success: function (data) {
            var json_obj = $.parseJSON(data);
            if (json_obj.length > 0) {
                parent.$('#textbook_search_dialog').dialog('close');//关闭dialog 
                parent.$('#textbook_datagrid').datagrid("loadData", json_obj);//datagrid 加载返回的数据               
            }
            else {
                $.messager.alert({
                    icon: 'error',
                    msg: '查询失败',
                    fn: function () {
                        parent.$('#textbook_search_dialog').dialog('close');//关闭dialog 
                        return false;
                    }
                });
            }
        }
    });
}


function parentData() {
    $("#textbook_title").textbox('setValue', window.textbook_title);
    $("#author_num").combobox('setValue', window.author_num);
    $("#datagrid").datagrid("loadData", window.table_json);
    $("#textbook_publishing_house").textbox('setValue', window.textbook_publishing_house);
    $("#textbook_date").datebox('setValue', window.textbook_date);
    $("#textbook_type").textbox('setValue', window.textbook_type);
    $("#yearChoose").combobox('setValue', window.yearChoose);
    $("#textbook_remarks").textbox('setValue', window.textbook_remarks);

}
