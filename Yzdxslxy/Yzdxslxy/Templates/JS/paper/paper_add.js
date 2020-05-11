$(function () {
    //用ajax访问数据库
    $.ajax({
        //请求方式
        type: "get",
        //请求地址
        url: "../../Src/paper/paper.ashx?action=get_grade&grade_type=" + '学术论文',
        //数据，json字符串
        //请求成功
        success: function (result) {
            $("#paper_grade").combogrid({
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

//提交表单，添加论文信息
function paper_add_submit() {
    var rows = $('#datagrid').datagrid("getRows");
    for (var i = 0; i < rows.length; i++) {
        $('#datagrid').datagrid('endEdit', i);
        $('#datagrid').datagrid('selectRow', i).datagrid('endEdit', i);//关闭第i行的编辑
    }

    var isValid = $("#paper_info").form('validate');
    var param = $("#datagrid").datagrid("getRows");
    var FieldCount = 0;
    var Maxcount = parseInt(param.length);
    while (Maxcount >= 0) {
        FieldCount++;
        $("#paper_info_table").append('<input class="easyui-textbox" type="hidden" name="paper_table_author_order_' + FieldCount + '"' + 'id="paper_table_author_order_' + FieldCount + '"' + '/>');
        $("#paper_info_table").append('<input class="easyui-textbox" type="hidden" name="paper_table_name_' + FieldCount + '"' + 'id="paper_table_name_' + FieldCount + '"' + '/>');
        $("#paper_info_table").append('<input class="easyui-textbox" type="hidden" name="paper_table_department_' + FieldCount + '"' + 'id="paper_table_department_' + FieldCount + '"' + '/>');
        $("#paper_info_table").append('<input class="easyui-textbox" type="hidden" name="paper_table_wage_number_' + FieldCount + '"' + 'id="paper_table_wage_number_' + FieldCount + '"' + '/>');
        $("#paper_info_table").append('<input class="easyui-textbox" type="hidden" name="paper_table_bonusratio_' + FieldCount + '"' + 'id="paper_table_bonusratio_' + FieldCount + '"' + '/>');
        Maxcount--;
    }
    for (var i = 0; i < param.length; i++) {
        $("#paper_table_author_order_" + parseInt(i + 1)).val(param[i].author_order);
        $("#paper_table_name_" + parseInt(i + 1)).val(param[i].name);
        $("#paper_table_department_" + parseInt(i + 1)).val(param[i].department);
        $("#paper_table_wage_number_" + parseInt(i + 1)).val(param[i].wage_number);
        $("#paper_table_bonusratio_" + parseInt(i + 1)).val(param[i].bonusratio);
    }
    if (isValid && ($("input[name=paper_departmentinfo]:checked").length = 1)) {
        $('#paper_info').form('submit', {
            url: "../../../Src/paper/paper.ashx?action=insertPaperData",
            success: function (data) {
                if (data > 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '添加成功',
                        fn: function () {
                            parent.$('#paper_add_dialog').dialog('close');//关闭dialog 
                            parent.$('#paper_datagrid').datagrid("reload");//datagrid 加载返回的数据
                        }
                    });
                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '添加失败!',
                        fn: function () {
                            parent.$('#paper_add_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
            }
        });
    }
    else {
        $.messager.alert({
            icon: 'error',
            msg: '信息填写不全!',
            fn: function () {
                parent.$('#paper_add_dialog').dialog('close');//关闭dialog 
                return false;
            }
        });
    }
}

//论文信息修改提交
function paper_update_submit() {
    var rows = $('#datagrid').datagrid("getRows");
    for (var i = 0; i < rows.length; i++) {
        $('#datagrid').datagrid('endEdit', i);
        $('#datagrid').datagrid('selectRow', i).datagrid('endEdit', i);//关闭第i行的编辑
    }

    var isValid = $("#paper_info").form('validate');
    var param = $("#datagrid").datagrid("getRows");
    var FieldCount = 0;
    var Maxcount = parseInt(param.length);
    while (Maxcount >= 0) {
        FieldCount++;
        $("#paper_info_table").append('<input class="easyui-textbox" type="hidden" name="paper_table_author_order_' + FieldCount + '"' + 'id="paper_table_author_order_' + FieldCount + '"' + '/>');
        $("#paper_info_table").append('<input class="easyui-textbox" type="hidden" name="paper_table_name_' + FieldCount + '"' + 'id="paper_table_name_' + FieldCount + '"' + '/>');
        $("#paper_info_table").append('<input class="easyui-textbox" type="hidden" name="paper_table_department_' + FieldCount + '"' + 'id="paper_table_department_' + FieldCount + '"' + '/>');
        $("#paper_info_table").append('<input class="easyui-textbox" type="hidden" name="paper_table_wage_number_' + FieldCount + '"' + 'id="paper_table_wage_number_' + FieldCount + '"' + '/>');
        $("#paper_info_table").append('<input class="easyui-textbox" type="hidden" name="paper_table_bonusratio_' + FieldCount + '"' + 'id="paper_table_bonusratio_' + FieldCount + '"' + '/>');
        Maxcount--;
    }
    for (var i = 0; i < param.length; i++) {
        $("#paper_table_author_order_" + parseInt(i + 1)).val(param[i].author_order);
        $("#paper_table_name_" + parseInt(i + 1)).val(param[i].name);
        $("#paper_table_department_" + parseInt(i + 1)).val(param[i].department);
        $("#paper_table_wage_number_" + parseInt(i + 1)).val(param[i].wage_number);
        $("#paper_table_bonusratio_" + parseInt(i + 1)).val(param[i].bonusratio);
    }
    if (isValid && ($("input[name=paper_departmentinfo]:checked").length == 1)) {

        $('#paper_info').form('submit', {
            url: "../../../Src/paper/paper.ashx?action=UpdatePaperData&update_ID=" + window.update_ID,
            success: function (data) {
                if (data >= 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '修改成功！',
                        fn: function () {
                            parent.$('#paper_update_dialog').dialog('close');//关闭dialog 
                            parent.$('#paper_datagrid').datagrid("reload");//datagrid 加载返回的数据
                            parent.$("#paper_update_iframe").attr("src", 'paper_update.html'); //设置IFRAME的SRC;
                        }
                    });
                               
                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '修改失败!',
                        fn: function () {
                            parent.$('#paper_update_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
            }
        });
    }  
    else {
        $.messager.alert({
            icon: 'error',
            msg: '信息填写不全!',
            fn: function () {
                parent.$('#paper_update_dialog').dialog('close');//关闭dialog 
                return false;
            }
        });
    }

}

//论文数据信息查询
function submit_search_paper() {
    $('#search_paper_info').form('submit', {
        url: "../../../Src/paper/paper.ashx?action=searchPaperData",
        success: function (data) {
            var json_obj = $.parseJSON(data);
            if (json_obj.length > 0) {
                parent.$('#paper_search_dialog').dialog('close');//关闭dialog 
                parent.$('#paper_datagrid').datagrid("loadData", json_obj);//datagrid 加载返回的数据               
            }
            else {
                $.messager.alert({
                    icon: 'error',
                    msg: '查询失败',
                    fn: function () {
                        parent.$('#paper_search_dialog').dialog('close');//关闭dialog 
                        return false;
                    }
                });
            }
        }
    });
}


function parentData() {
    $("#paper_title").textbox('setValue', window.paper_title);
    $("#author_num").combobox('setValue', window.author_num);
    $("#datagrid").datagrid("loadData", window.table_json);
    $("#paper_journal").textbox('setValue', window.paper_journal);
    $("#paper_date").datebox('setValue', window.paper_date);
    $("#paper_journal_vol").textbox('setValue', window.paper_journal_vol);
    $("#paper_startpage").textbox('setValue', window.paper_startpage);
    $("#paper_endpage").textbox('setValue', window.paper_endpage);
    $("#paper_grade").textbox('setValue', window.paper_grade);

    if (window.paper_departmentinfo != null) {
        $("input[name='paper_departmentinfo'][value=" + "'" + window.paper_departmentinfo + "'" + "]").prop("checked", true);
    }
    else {
        $("input[name='paper_departmentinfo']").prop("checked", false);
    }
   
    $("#yearChoose").combobox('setValue', window.yearChoose);
    $("#paper_remarks").textbox('setValue', window.paper_remarks);

}