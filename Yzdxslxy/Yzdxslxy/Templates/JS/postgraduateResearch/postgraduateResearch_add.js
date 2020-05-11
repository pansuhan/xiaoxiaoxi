$(function () {
    //用ajax访问数据库
    $.ajax({
        //请求方式
        type: "get",
        //请求地址
        url: "../../Src/paper/paper.ashx?action=get_grade&grade_type=" + '研究生研究工作量',
        //数据，json字符串
        //请求成功
        success: function (result) {
            $("#postgraduateResearch_grade").combogrid({
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
                    if ($.trim(type_name[0]) == "研究生教改论文") {
                        if ($("#postgraduateResearch_journalName_td").length == 0) {
                            $("#postgraduateResearch_grade_tr").after('<tr id="postgraduateResearch_journalName_tr"><td class="left" style="width: 110px;">期刊名称:</td><td id="postgraduateResearch_journalName_td"><input id="postgraduateResearch_journalname" name="postgraduateResearch_journalname" class="easyui-textbox" type="text" style="width:500px"/></td></tr>');
                            $.parser.parse($("#postgraduateResearch_journalName_td").parent());
                        }
                    }
                    else {
                        $("#postgraduateResearch_journalName_tr").remove();
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

    //年度下拉框动态渲染
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
function submit_postgraduateResearch_add() {
    var rows = $('#datagrid').datagrid("getRows");
    for (var i = 0; i < rows.length; i++) {
        $('#datagrid').datagrid('endEdit', i);
        $('#datagrid').datagrid('selectRow', i).datagrid('endEdit', i);//关闭第i行的编辑
    }
    var isValid = $("#postgraduateResearchInfo_form").form('validate');
    var param = $("#datagrid").datagrid("getRows");
    var FieldCount = 0;
    var Maxcount = parseInt(param.length);
    while (Maxcount >= 0) {
        FieldCount++;
        $("#postgraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="postgraduateResearch_table_author_order_' + FieldCount + '"' + 'id="postgraduateResearch_table_author_order_' + FieldCount + '"' + '/>');
        $("#postgraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="postgraduateResearch_table_name_' + FieldCount + '"' + 'id="postgraduateResearch_table_name_' + FieldCount + '"' + '/>');
        $("#postgraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="postgraduateResearch_table_department_' + FieldCount + '"' + 'id="postgraduateResearch_table_department_' + FieldCount + '"' + '/>');
        $("#postgraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="postgraduateResearch_table_wage_number_' + FieldCount + '"' + 'id="postgraduateResearch_table_wage_number_' + FieldCount + '"' + '/>');
        $("#postgraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="postgraduateResearch_table_bonusratio_' + FieldCount + '"' + 'id="postgraduateResearch_table_bonusratio_' + FieldCount + '"' + '/>');
        Maxcount--;
    }
    for (var i = 0; i < param.length; i++) {
        $("#postgraduateResearch_table_author_order_" + parseInt(i + 1)).val(param[i].author_order);
        $("#postgraduateResearch_table_name_" + parseInt(i + 1)).val(param[i].name);
        $("#postgraduateResearch_table_department_" + parseInt(i + 1)).val(param[i].department);
        $("#postgraduateResearch_table_wage_number_" + parseInt(i + 1)).val(param[i].wage_number);
        $("#postgraduateResearch_table_bonusratio_" + parseInt(i + 1)).val(param[i].bonusratio);
    }
    if (isValid) {
        $('#postgraduateResearchInfo_form').form('submit', {
            url: "../../../Src/postgraduateResearch/postgraduateResearch.ashx?action=insertpostgraduateResearchData",
            //onSubmit: function (param) {                        
            //},
            success: function (data) {
                if (data > 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '添加成功',
                        fn: function () {
                            parent.$('#postgraduateResearch_add_dialog').dialog('close');//关闭dialog 
                            parent.$('#postgraduateResearch_datagrid').datagrid("reload");//datagrid 加载返回的数据 
                        }
                    });
                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '添加失败!',
                        fn: function () {
                            parent.$('#postgraduateResearch_add_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
            }
        });
    }
}

//修改的信息提交
function submit_postgraduateResearch_update() {
    var rows = $('#datagrid').datagrid("getRows");
    for (var i = 0; i < rows.length; i++) {
        $('#datagrid').datagrid('endEdit', i);
        $('#datagrid').datagrid('selectRow', i).datagrid('endEdit', i);//关闭第i行的编辑
    }
    var isValid = $("#postgraduateResearchInfo_form").form('validate');
    var param = $("#datagrid").datagrid("getRows");
    var FieldCount = 0;
    var Maxcount = parseInt(param.length);
    while (Maxcount >= 0) {
        FieldCount++;
        $("#postgraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="postgraduateResearch_table_author_order_' + FieldCount + '"' + 'id="postgraduateResearch_table_author_order_' + FieldCount + '"' + '/>');
        $("#postgraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="postgraduateResearch_table_name_' + FieldCount + '"' + 'id="postgraduateResearch_table_name_' + FieldCount + '"' + '/>');
        $("#postgraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="postgraduateResearch_table_department_' + FieldCount + '"' + 'id="postgraduateResearch_table_department_' + FieldCount + '"' + '/>');
        $("#postgraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="postgraduateResearch_table_wage_number_' + FieldCount + '"' + 'id="postgraduateResearch_table_wage_number_' + FieldCount + '"' + '/>');
        $("#postgraduateResearch_info_table").append('<input class="easyui-textbox" type="hidden" name="postgraduateResearch_table_bonusratio_' + FieldCount + '"' + 'id="postgraduateResearch_table_bonusratio_' + FieldCount + '"' + '/>');
        Maxcount--;
    }
    for (var i = 0; i < param.length; i++) {
        $("#postgraduateResearch_table_author_order_" + parseInt(i + 1)).val(param[i].author_order);
        $("#postgraduateResearch_table_name_" + parseInt(i + 1)).val(param[i].name);
        $("#postgraduateResearch_table_department_" + parseInt(i + 1)).val(param[i].department);
        $("#postgraduateResearch_table_wage_number_" + parseInt(i + 1)).val(param[i].wage_number);
        $("#postgraduateResearch_table_bonusratio_" + parseInt(i + 1)).val(param[i].bonusratio);
    }

    if (isValid) {
        $('#postgraduateResearchInfo_form').form('submit', {
            url: "../../../Src/postgraduateResearch/postgraduateResearch.ashx?action=UpdatepostgraduateResearchData&update_ID=" + window.update_ID,
            success: function (data) {
                if (data >= 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '修改成功！',
                        fn: function () {
                            parent.$('#postgraduateResearch_update_dialog').dialog('close');//关闭dialog 
                            parent.$('#postgraduateResearch_datagrid').datagrid("reload");//datagrid 加载返回的数据
                            parent.$("#postgraduateResearch_update_iframe").attr("src", 'postgraduateResearch_update.html'); //设置IFRAME的SRC;
                        }
                    });

                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '修改失败!',
                        fn: function () {
                            parent.$('#postgraduateResearch_update_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
            }
        });
    }
}

//利用form进行本科生研究工作量信息查询
function submit_postgraduateResearch_search() {
    $('#postgraduateResearchInfo_form').form('submit', {
        url: "../../../Src/postgraduateResearch/postgraduateResearch.ashx?action=SearchpostgraduateResearchData",
        success: function (data) {
            var json_obj = $.parseJSON(data);
            if (json_obj.length > 0) {
                parent.$('#postgraduateResearch_search_dialog').dialog('close');//关闭dialog 
                parent.$('#postgraduateResearch_datagrid').datagrid("loadData", json_obj);//datagrid 加载返回的数据               
            }
            else {
                $.messager.alert({
                    icon: 'error',
                    msg: '查询失败',
                    fn: function () {
                        parent.$('#postgraduateResearch_search_dialog').dialog('close');//关闭dialog 
                        return false;
                    }
                });
            }
        }
    });
}

function parentData() {
    $("#postgraduateResearch_title").textbox('setValue', window.postgraduateResearch_title);
    $("#postgraduateResearch_grade").textbox('setValue', window.postgraduateResearch_grade);
    $("#postgraduateResearch_journalname").textbox('setValue', window.postgraduateResearch_journalname);
    $("#author_num").combobox('setValue', window.author_num);
    $("#datagrid").datagrid("loadData", window.table_json);
    $("#postgraduateResearch_time").datebox('setValue', window.postgraduateResearch_time);
    $("#yearChoose").combobox('setValue', window.yearChoose);
    $("#postgraduateResearch_remarks").textbox('setValue', window.postgraduateResearch_remarks);

}