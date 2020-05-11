$(function () {
    //用ajax访问数据库
    $.ajax({
        //请求方式
        type: "get",
        //请求地址
        url: "../../Src/paper/paper.ashx?action=get_grade&grade_type=" + '本科生研究工作量',
        //数据，json字符串
        //请求成功
        success: function (result) {
            $("#undergraduateResearch_grade").combogrid({
                panelWidth: 500,
                nowrap: false,
                multiple: false,
                data: JSON.parse(result),
                idField: '等级',
                textField: '等级',
                method: 'get',
                editable: false,
                columns: [[
                              { field: '等级', title: '类别名称', width: 400 },
                              { field: '业绩点', title: '业绩点', width: 80 },
                ]],
                onChange: function (newValue, oldValue) {
                    var type_name = newValue.split(':');
                    if ($.trim(type_name[0]) == "本科生教研论文") {
                        $.messager.show({
                            title: '提示信息',
                            msg: '教务处负责认定(论文如被检索、收录、转载，其基本分值按科研论文检索、收录、转载计算)',
                            showType: 'show'
                        });
                        if ($("#undergraduateResearch_journalName_td").length == 0) {
                            $("#undergraduateResearch_grade_tr").after('<tr id="undergraduateResearch_journalName_tr"><td class="left" style="width: 110px;">期刊名称:</td><td id="undergraduateResearch_journalName_td"><input id="undergraduateResearch_journalname" name="undergraduateResearch_journalname" class="easyui-textbox" type="text" style="width:500px"/></td></tr>');
                            $.parser.parse($("#undergraduateResearch_journalName_td").parent());
                        }
                    }
                    else {
                        $("#undergraduateResearch_journalName_tr").remove();
                    }
                    if ($.trim(type_name[0]) == "本科生成果验收") {
                        $.messager.show({
                            title: '提示信息',
                            msg: '教务处负责认定！',
                            showType: 'show'
                        });
                    }
                    if ($.trim(type_name[0]) == "本科生项目立项") {
                        $.messager.show({
                            title: '提示信息',
                            msg: '教务处负责认定！',
                            showType: 'show'
                        });
                    }
                }
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

//新增信息的提交   与修改信息的提交一样，为了便于阅读，分开写
function submit_undergraduateResearch_add() {
    var rows = $('#datagrid').datagrid("getRows");
    for (var i = 0; i < rows.length; i++) {
        $('#datagrid').datagrid('endEdit', i);
        $('#datagrid').datagrid('selectRow', i).datagrid('endEdit', i);//关闭第i行的编辑
    }
    var isValid = $("#undergraduateResearchInfo_form").form('validate');
    var param = $("#datagrid").datagrid("getRows");
    var FieldCount = 0;
    var Maxcount = parseInt(param.length);
    while (Maxcount >= 0) {
        FieldCount++;
        $("#undergraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="undergraduateResearch_table_author_order_' + FieldCount + '"' + 'id="undergraduateResearch_table_author_order_' + FieldCount + '"' + '/>');
        $("#undergraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="undergraduateResearch_table_name_' + FieldCount + '"' + 'id="undergraduateResearch_table_name_' + FieldCount + '"' + '/>');
        $("#undergraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="undergraduateResearch_table_department_' + FieldCount + '"' + 'id="undergraduateResearch_table_department_' + FieldCount + '"' + '/>');
        $("#undergraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="undergraduateResearch_table_wage_number_' + FieldCount + '"' + 'id="undergraduateResearch_table_wage_number_' + FieldCount + '"' + '/>');
        $("#undergraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="undergraduateResearch_table_bonusratio_' + FieldCount + '"' + 'id="undergraduateResearch_table_bonusratio_' + FieldCount + '"' + '/>');
        Maxcount--;
    }
    for (var i = 0; i < param.length; i++) {
        $("#undergraduateResearch_table_author_order_" + parseInt(i + 1)).val(param[i].author_order);
        $("#undergraduateResearch_table_name_" + parseInt(i + 1)).val(param[i].name);
        $("#undergraduateResearch_table_department_" + parseInt(i + 1)).val(param[i].department);
        $("#undergraduateResearch_table_wage_number_" + parseInt(i + 1)).val(param[i].wage_number);
        $("#undergraduateResearch_table_bonusratio_" + parseInt(i + 1)).val(param[i].bonusratio);
    }
    if (isValid) {
        $('#undergraduateResearchInfo_form').form('submit', {
            url: "../../../Src/undergraduateResearch/undergraduateResearch.ashx?action=insertundergraduateResearchData",
            success: function (data) {
                if (data > 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '添加成功',
                        fn: function () {
                            parent.$('#undergraduateResearch_add_dialog').dialog('close');//关闭dialog 
                            parent.$('#undergraduateResearch_datagrid').datagrid("reload");//datagrid 加载返回的数据 
                        }
                    });
                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '添加失败!',
                        fn: function () {
                            parent.$('#undergraduateResearch_add_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
            }
        });
    }
}

//修改的信息提交
function submit_undergraduateResearch_update() {
    var rows = $('#datagrid').datagrid("getRows");
    for (var i = 0; i < rows.length; i++) {
        $('#datagrid').datagrid('endEdit', i);
        $('#datagrid').datagrid('selectRow', i).datagrid('endEdit', i);//关闭第i行的编辑
    }
    var isValid = $("#undergraduateResearchInfo_form").form('validate');
    var param = $("#datagrid").datagrid("getRows");
    var FieldCount = 0;
    var Maxcount = parseInt(param.length);
    while (Maxcount >= 0) {
        FieldCount++;
        $("#undergraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="undergraduateResearch_table_author_order_' + FieldCount + '"' + 'id="undergraduateResearch_table_author_order_' + FieldCount + '"' + '/>');
        $("#undergraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="undergraduateResearch_table_name_' + FieldCount + '"' + 'id="undergraduateResearch_table_name_' + FieldCount + '"' + '/>');
        $("#undergraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="undergraduateResearch_table_department_' + FieldCount + '"' + 'id="undergraduateResearch_table_department_' + FieldCount + '"' + '/>');
        $("#undergraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="undergraduateResearch_table_wage_number_' + FieldCount + '"' + 'id="undergraduateResearch_table_wage_number_' + FieldCount + '"' + '/>');
        $("#undergraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="undergraduateResearch_table_bonusratio_' + FieldCount + '"' + 'id="undergraduateResearch_table_bonusratio_' + FieldCount + '"' + '/>');
        Maxcount--;
    }
    for (var i = 0; i < param.length; i++) {
        $("#undergraduateResearch_table_author_order_" + parseInt(i + 1)).val(param[i].author_order);
        $("#undergraduateResearch_table_name_" + parseInt(i + 1)).val(param[i].name);
        $("#undergraduateResearch_table_department_" + parseInt(i + 1)).val(param[i].department);
        $("#undergraduateResearch_table_wage_number_" + parseInt(i + 1)).val(param[i].wage_number);
        $("#undergraduateResearch_table_bonusratio_" + parseInt(i + 1)).val(param[i].bonusratio);
    }

    if (isValid) {
        $('#undergraduateResearchInfo_form').form('submit', {
            url: "../../../Src/undergraduateResearch/undergraduateResearch.ashx?action=UpdateundergraduateResearchData&update_ID=" + window.update_ID,
            success: function (data) {
                if (data >= 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '修改成功！',
                        fn: function () {
                            parent.$('#undergraduateResearch_update_dialog').dialog('close');//关闭dialog 
                            parent.$('#undergraduateResearch_datagrid').datagrid("reload");//datagrid 加载返回的数据
                            parent.$("#undergraduateResearch_update_iframe").attr("src", 'undergraduateResearch_update.html'); //设置IFRAME的SRC;
                        }
                    });

                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '修改失败!',
                        fn: function () {
                            parent.$('#undergraduateResearch_update_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
            }
        });
    }
}

//利用form进行本科生研究工作量信息查询
function submit_undergraduateResearch_search() {
    $('#undergraduateResearchInfo_form').form('submit', {
        url: "../../../Src/undergraduateResearch/undergraduateResearch.ashx?action=SearchundergraduateResearchData",
        success: function (data) {
            var json_obj = $.parseJSON(data);
            if (json_obj.length > 0) {
                parent.$('#undergraduateResearch_search_dialog').dialog('close');//关闭dialog 
                parent.$('#undergraduateResearch_datagrid').datagrid("loadData", json_obj);//datagrid 加载返回的数据               
            }
            else {
                $.messager.alert({
                    icon: 'error',
                    msg: '查询失败',
                    fn: function () {
                        parent.$('#undergraduateResearch_search_dialog').dialog('close');//关闭dialog 
                        return false;
                    }
                });
            }
        }
    });
}

function parentData() {
    $("#undergraduateResearch_title").textbox('setValue', window.undergraduateResearch_title);
    $("#undergraduateResearch_grade").textbox('setValue', window.undergraduateResearch_grade);
    $("#undergraduateResearch_journalname").textbox('setValue', window.undergraduateResearch_journalname);
    $("#author_num").combobox('setValue', window.author_num);
    $("#datagrid").datagrid("loadData", window.table_json);
    $("#undergraduateResearch_time").datebox('setValue', window.undergraduateResearch_time);
    $("#yearChoose").combobox('setValue', window.yearChoose);
    $("#undergraduateResearch_remarks").textbox('setValue', window.undergraduateResearch_remarks);

}

