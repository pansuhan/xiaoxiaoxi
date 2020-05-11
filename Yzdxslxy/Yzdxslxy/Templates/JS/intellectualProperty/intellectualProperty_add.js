$(function () {
    //用ajax访问数据库
    $.ajax({
        //请求方式
        type: "get",
        //请求地址
        url: "../../Src/paper/paper.ashx?action=get_grade&grade_type=" + '知识产权',
        //数据，json字符串
        //请求成功
        success: function (result) {
            $("#intellectualProperty_type").combogrid({
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

    //根据姓名确定工资号
    $('#intellectualProperty_personname').textbox({
        onChange: function (value) {
            $.ajax({
                //请求方式
                type: "get",
                //请求地址
                url: "../../../Src/paper/paper.ashx?action=get_author_num&name=" + value,
                //数据，json字符串
                //请求成功
                success: function (result) {
                    console.log(result);
                    if (JSON.parse(result).length > 0) {
                        if ((JSON.parse(result).length == 1)) {
                            $('#intellectualProperty_department').combobox('setValue', JSON.parse(result)[0].单位名称);
                            $('#intellectualProperty_wagenum').combobox('setValue', JSON.parse(result)[0].工资号);
                        }
                        else {
                            $('#intellectualProperty_department').combobox('loadData', JSON.parse(result));
                            $('#intellectualProperty_wagenum').combobox('loadData', JSON.parse(result));

                        }
                    }
                    else {
                        $('#intellectualProperty_department').combobox('setValue', "无单位信息");
                        $('#intellectualProperty_wagenum').combobox('setValue', "0");
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

})

//知识产权成果信息添加提交表单信息
function intellectualProperty_submitForm_add() {
    var isValid = $("#intellectualPropertyInfo_form").form('validate');
    if (isValid) {
        $('#intellectualPropertyInfo_form').form('submit', {
            url: "../../../Src/intellectualProperty/intellectualProperty.ashx?action=insertintellectualPropertyData",
            success: function (data) {
                if (data > 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '添加成功',
                        fn: function () {
                            parent.$('#intellectualProperty_add_dialog').dialog('close');//关闭dialog 
                            parent.$('#intellectualProperty_datagrid').datagrid("reload");//datagrid 加载返回的数据 
                        }
                    });
                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '添加失败!',
                        fn: function () {
                            parent.$('#intellectualProperty_add_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
            }
        });
    }
}
//知识产权成果信息修改提交表单信息
function intellectualProperty_submitForm_update() {
    var isValid = $("#intellectualPropertyInfo_form").form('validate');
    if (isValid) {
        $('#intellectualPropertyInfo_form').form('submit', {
            url: "../../../Src/intellectualProperty/intellectualProperty.ashx?action=UpdateintellectualPropertyData&update_ID=" + window.update_ID,
            success: function (data) {
                if (data >= 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '修改成功！',
                        fn: function () {
                            parent.$('#intellectualProperty_update_dialog').dialog('close');//关闭dialog 
                            parent.$('#intellectualProperty_datagrid').datagrid("reload");//datagrid 加载返回的数据 
                            parent.$("#intellectualProperty_update_iframe").attr("src", 'intellectualProperty_update.html'); //设置IFRAME的SRC;
                        }
                    });

                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '修改失败!',
                        fn: function () {
                            parent.$('#intellectualProperty_update_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
            }
        });
    }

}

//利用form进行知识产权成果信息查询
function submit_intellectualProperty_search() {
    $('#intellectualPropertyInfo_form').form('submit', {
        url: "../../../Src/intellectualProperty/intellectualProperty.ashx?action=SearchintellectualPropertyData",
        success: function (data) {
            var json_obj = $.parseJSON(data);
            if (json_obj.length > 0) {
                parent.$('#intellectualProperty_search_dialog').dialog('close');//关闭dialog 
                parent.$('#intellectualProperty_datagrid').datagrid("loadData", json_obj);//datagrid 加载返回的数据               
            }
            else {
                $.messager.alert({
                    icon: 'error',
                    msg: '查询失败',
                    fn: function () {
                        parent.$('#intellectualProperty_search_dialog').dialog('close');//关闭dialog 
                        return false;
                    }
                });
            }
        }
    });
}

function parentData() {
    $("#intellectualProperty_name").textbox('setValue', window.intellectualProperty_name);
    $("#intellectualProperty_identifier").textbox('setValue', window.intellectualProperty_identifier);
    $("#intellectualProperty_type").textbox('setValue', window.intellectualProperty_type);
    $("#intellectualProperty_personname").textbox('setValue', window.intellectualProperty_personname);
    $("#intellectualProperty_datetime").datebox('setValue', window.intellectualProperty_datetime);
    $("#yearChoose").combobox('setValue', window.yearChoose);
    $("#intellectualProperty_remarks").textbox('setValue', window.intellectualProperty_remarks);

}