$(function () {
    //用ajax访问数据库
    $.ajax({
        //请求方式
        type: "get",
        //请求地址
        url: "../../Src/paper/paper.ashx?action=get_grade&grade_type=" + '科研项目',
        //数据，json字符串
        //请求成功
        success: function (result) {
            $("#project_grade").combogrid({
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

    //负责人人数默认选择为1，初始化一个负责人信息对应的input文本框
    $("#project_leaders_tr").after('<tr id="project_leaderstitle"><td></td><td><span>负责人名字:</span><span style="margin-left: 40px;">负责人单位:</span><span style="margin-left: 40px;">负责人工资号:</span><span style="margin-left: 40px;">奖金比例:</span></td></tr>');
    $("#project_leaderstitle").after('<tr class="project_leadersinfo"><td></td>' +
                    '<td id="project_leadersinfo_td">' +
                    '<span><input id="project_leaders_name1" name="project_leaders_name1" class="easyui-textbox name" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_leaders_department1" name="project_leaders_department1" class="easyui-combobox department" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_leaders_wagenum1" name="project_leaders_wagenum1" class="easyui-combobox wagenum" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_leaders_bonusratio1" name="project_leaders_bonusratio1" class="easyui-textbox bonusratio" type="text" style="width:119px" readonly="true" value="100"/></span></td></tr>');
    $.parser.parse($("#project_leadersinfo_td").parent());

    //根据负责人下拉框的change事件，动态加载对应数量的input文本框
    $('#project_leadersnum').combobox({
        onChange: function (newValue, oldValue) {
            if($("#project_leaderstitle").length>0){
                $("#project_leaderstitle").remove();
                $(".project_leadersinfo").remove();
            }   
            $("#project_leaders_tr").after('<tr id="project_leaderstitle"><td></td><td><span>负责人名字:</span><span style="margin-left: 40px;">负责人单位:</span><span style="margin-left: 40px;">负责人工资号:</span><span style="margin-left: 40px;">奖金比例:</span></td></tr>');
            
            while(newValue > 0)
            { 
                $("#project_leaderstitle").after('<tr class="project_leadersinfo"><td></td>' +
                    '<td id="project_leadersinfo_td">' +
                    '<span><input id="project_leaders_name' + newValue + '" name="project_leaders_name' + newValue + '" class="easyui-textbox name" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_leaders_department' + newValue + '" name="project_leaders_department' + newValue + '" class="easyui-combobox department" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_leaders_wagenum' + newValue + '" name="project_leaders_wagenum' + newValue + '" class="easyui-combobox wagenum" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_leaders_bonusratio' + newValue + '" name="project_leaders_bonusratio' + newValue + '" class="easyui-textbox bonusratio" type="text" style="width:119px" value="0"/></span></td></tr>');
                $.parser.parse($("#project_leadersinfo_td").parent());
                newValue--;
            }

            //第一个负责人的奖金比例默认值为100，并且设置为只读属性；
            $("#project_leaders_bonusratio1").textbox('setValue', '100')//赋值
            $('#project_leaders_bonusratio1').textbox({readonly: true});  //设置输入框为禁用

            //检测负责人姓名对应的input，发生change事件，根据负责人姓名获取对应的单位名称与工资号
            $('.name').textbox({
                onChange: function (newValue, oldValue) {
                    var num = $(this).attr("id").replace(/[^0-9]/g, "");
                    var type = $(this).attr("id").split('_')[1];
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
                                    $("#project_" + type + "_department" + num).combobox('setValue', JSON.parse(result)[0].单位名称);
                                    $("#project_" + type + "_wagenum" + num).combobox('setValue', JSON.parse(result)[0].工资号);
                                }
                                else {
                                    $("#project_" + type + "_department" + num).combobox({
                                        data: JSON.parse(result),
                                        textField: "单位名称",
                                        valueField: "单位名称",
                                    });
                                    $("#project_" + type + "_wagenum" + num).combobox({
                                        data: JSON.parse(result),
                                        textField: "工资号",
                                        valueField: "工资号",
                                    });
                                }
                            }
                            else {
                                $("#project_" + type + "_department" + num).combobox('setValue', "无单位信息");
                                $("#project_" + type + "_wagenum" + num).combobox('setValue', "0");
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

            //奖金比例加减
            $('.bonusratio').textbox({
                onChange: function (newValue, oldValue) {
                    var idname = $(this).attr("id");
                    if (idname != "project_leaders_bonusratio1") {
                        var result = parseFloat($("#project_leaders_bonusratio1").val()) - (parseFloat(newValue) - parseFloat(oldValue));
                        if (result < 0) {
                            $.messager.alert({
                                icon: 'error',
                                msg: '奖金比例总和不能超过100%',
                                fn: function () {
                                    parent.$('#project_add_dialog').dialog('close');//关闭dialog 
                                    return false;
                                }
                            });
                        }
                        else $("#project_leaders_bonusratio1").textbox('setValue', result)//赋值
                    }
                   
                }
            });

            
        }
    });
    //参与人input信息初始化
    $("#project_participantnum_tr").after('<tr id="project_participanttitle"><td></td><td><span>参与人名字:</span><span style="margin-left: 40px;">参与人单位:</span><span style="margin-left: 40px;">参与人工资号:</span><span style="margin-left: 40px;">奖金比例:</span></td></tr>');
    $("#project_participanttitle").after('<tr class="project_participantinfo"><td></td>' +
                    '<td id="project_participantinfo_td">' +
                    '<span><input id="project_participant_name1" name="project_participant_name1" class="easyui-textbox name" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_participant_department1" name="project_participant_department1" class="easyui-combobox department" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_participant_wagenum1" name="project_participant_wagenum1" class="easyui-combobox wagenum" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_participant_bonusratio1" name="project_participant_bonusratio1" class="easyui-textbox bonusratio" type="text" style="width:119px" value="0"/></span></td></tr>');
    $.parser.parse($("#project_participantinfo_td").parent());

    //根据输入的参与人名字信息获取对应的单位名称与工资号
    $('.name').textbox({
        onChange: function (newValue, oldValue) {
            var num = $(this).attr("id").replace(/[^0-9]/g, "");
            var type = $(this).attr("id").split('_')[1];

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
                            $("#project_" + type + "_department" + num).combobox('setValue', JSON.parse(result)[0].单位名称);
                            $("#project_" + type + "_wagenum" + num).combobox('setValue', JSON.parse(result)[0].工资号);
                        }
                        else {
                            $("#project_" + type + "_department" + num).combobox({
                                data: JSON.parse(result),
                                textField: "单位名称",
                                valueField: "单位名称",
                            });
                            $("#project_" + type + "_wagenum" + num).combobox({
                                data: JSON.parse(result),
                                textField: "工资号",
                                valueField: "工资号",
                            });
                        }
                    }
                    else {
                        $("#project_" + type + "_department" + num).combobox('setValue', "无单位信息");
                        $("#project_" + type + "_wagenum" + num).combobox('setValue', "0");
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
    $('.bonusratio').textbox({
        onChange: function (newValue, oldValue) {
            var idname = $(this).attr("id");
            if (idname != "project_leaders_bonusratio1") {
                var result = parseFloat($("#project_leaders_bonusratio1").val()) - (parseFloat(newValue) - parseFloat(oldValue));
                if (result < 0) {
                    $.messager.alert({
                        icon: 'error',
                        msg: '奖金比例总和不能超过100%',
                        fn: function () {
                            parent.$('#project_add_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
                else $("#project_leaders_bonusratio1").textbox('setValue', result)//赋值
            }

        }
    });
    //根据参与人人数下拉框动态添加对应input框信息
    $('#project_participantnum').combobox({
        onChange: function (newValue, oldValue) {
            if ($("#project_participanttitle").length > 0) {
                $("#project_participanttitle").remove();
                $(".project_participantinfo").remove();
            }   
            $("#project_participantnum_tr").after('<tr id="project_participanttitle"><td></td><td><span>参与人名字:</span><span style="margin-left: 40px;">参与人单位:</span><span style="margin-left: 40px;">参与人工资号:</span><span style="margin-left: 40px;">奖金比例:</span></td></tr>');
            while(newValue > 0)
            {
                $("#project_participanttitle").after('<tr class="project_participantinfo"><td></td>' +
                    '<td id="project_participantinfo_td">' +
                    '<span><input id="project_participant_name' + newValue + '" name="project_participant_name' + newValue + '" class="easyui-textbox name" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_participant_department' + newValue + '" name="project_participant_department' + newValue + '" class="easyui-combobox department" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_participant_wagenum' + newValue + '" name="project_participant_wagenum' + newValue + '" class=easyui-combobox wagenum" type="text" style="width:119px"/></span>' +
                    '<span style="margin-left:7px"><input id="project_participant_bonusratio' + newValue + '" name="project_participant_bonusratio' + newValue + '" class="easyui-textbox bonusratio" type="text" style="width:119px" value="0"/></span></td></tr>');
                $.parser.parse($("#project_participantinfo_td").parent());
                newValue--;
            }
            //发生变动时，初始化奖金比例的默认值
            $(".bonusratio").not("#project_leaders_bonusratio1").textbox('setValue', "0");
            $("#project_leaders_bonusratio1").textbox('setValue', "100");
            $('#project_leaders_bonusratio1').textbox({ readonly: true });
            $('.name').textbox({
                onChange: function (newValue, oldValue) {
                    var num = $(this).attr("id").replace(/[^0-9]/g, "");
                    var type = $(this).attr("id").split('_')[1];
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
                                    $("#project_" + type + "_department" + num).combobox('setValue', JSON.parse(result)[0].单位名称);
                                    $("#project_" + type + "_wagenum" + num).combobox('setValue', JSON.parse(result)[0].工资号);
                                }
                                else {
                                    $("#project_" + type + "_department" + num).combobox({
                                        data: JSON.parse(result),
                                        textField: "单位名称",
                                        valueField: "单位名称",
                                    });
                                    $("#project_" + type + "_wagenum" + num).combobox({
                                        data: JSON.parse(result),
                                        textField: "工资号",
                                        valueField: "工资号",
                                    });
                                }
                            }
                            else {
                                $("#project_" + type + "_department" + num).combobox('setValue', "无单位信息");
                                $("#project_" + type + "_wagenum" + num).combobox('setValue', "0");
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
            $('.bonusratio').textbox({
                onChange: function (newValue, oldValue) {
                    var idname = $(this).attr("id");
                    if (idname != "project_leaders_bonusratio1") {
                        var result = parseFloat($("#project_leaders_bonusratio1").val()) - (parseFloat(newValue) - parseFloat(oldValue));
                        if (result < 0) {
                            $.messager.alert({
                                icon: 'error',
                                msg: '奖金比例总和不能超过100%',
                                fn: function () {
                                    parent.$('#project_add_dialog').dialog('close');//关闭dialog 
                                    return false;
                                }
                            });
                        }
                        else $("#project_leaders_bonusratio1").textbox('setValue', result)//赋值
                    }

                }
            });
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



//添加信息，add页面的提交按钮
function project_submitForm_add() {
    var isValid = $("#projectInfo_form").form('validate');
    if (isValid) {
        $('#projectInfo_form').form('submit', {
            url: "../../../Src/project/project.ashx?action=insertprojectData",
            success: function (data) {
                if (data > 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '添加成功',
                        fn: function () {
                            parent.$('#project_add_dialog').dialog('close');//关闭dialog 
                            parent.$('#project_datagrid').datagrid("reload");//datagrid 加载返回的数据 
                        }
                    });
                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '添加失败!',
                        fn: function () {
                            parent.$('#project_add_dialog').dialog('close');//关闭dialog 
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
            msg: '格式错误!',
            fn: function () {
                parent.$('#project_add_dialog').dialog('close');//关闭dialog 
                return false;
            }
        });
    }

}

//修改信息，update页面的提交按钮
function project_submitForm_update() {
    var isValid = $("#projectInfo_form").form('validate');
    if (isValid) {
        $('#projectInfo_form').form('submit', {
            url: "../../../Src/project/project.ashx?action=UpdateprojectData&update_ID=" + window.update_ID,
            success: function (data) {
                if (data > 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '修改成功',
                        fn: function () {
                            parent.$('#project_update_dialog').dialog('close');//关闭dialog 
                            parent.$('#project_datagrid').datagrid("reload");//datagrid 加载返回的数据
                            parent.$("#project_update_iframe").attr("src", 'project_update.html'); //设置IFRAME的SRC;
                        }
                    });
                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '修改失败!',
                        fn: function () {
                            parent.$('#project_update_dialog').dialog('close');//关闭dialog 
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
            msg: '格式错误!',
            fn: function () {
                parent.$('#project_update_dialog').dialog('close');//关闭dialog 
                return false;
            }
        });
    }

}

//科研项目工作量信息查询表单提交
function submit_project_search() {
    $('#projectInfo_form').form('submit', {
        url: "../../../Src/project/project.ashx?action=SearchprojectData",
        success: function (data) {
            var json_obj = $.parseJSON(data);
            if (json_obj.length > 0) {
                parent.$('#project_search_dialog').dialog('close');//关闭dialog 
                parent.$('#project_datagrid').datagrid("loadData", json_obj);//datagrid 加载返回的数据               
            }
            else {
                $.messager.alert({
                    icon: 'error',
                    msg: '查询失败',
                    fn: function () {
                        parent.$('#project_search_dialog').dialog('close');//关闭dialog 
                        return false;
                    }
                });
            }
        }
    });

}


//父页面传过来的值进行渲染，渲染到编辑的dialog中对应的文本框中
function parentData() {
    $("#project_name").textbox('setValue', window["project_name"]);
    $("#project_grade").combogrid('setValue', window["project_grade"]);
    $("#project_leadersnum").combobox('setValue', window["project_leadersnum"]);
    for (var i = 1; i <= parseInt(window["project_leadersnum"]) ; i++) {
        $("#project_leaders_name" + i).textbox('setValue', window["project_leaders_name" + i]);
        $("#project_leaders_department" + i).textbox('setValue', window["project_leaders_department" + i]);
        $("#project_leaders_wagenum" + i).textbox('setValue', window["project_leaders_wagenum" + i]);
        $("#project_leaders_bonusratio" + i).textbox('setValue', window["project_leaders_bonusratio" + i]);
    }
    $("#project_participantnum").combobox('setValue', window["project_participantnum"]);
    for (var i = 1; i <= parseInt(window["project_participantnum"]) ; i++) {
        $("#project_participant_name" + i).textbox('setValue', window["project_participant_name" + i]);
        $("#project_participant_department" + i).textbox('setValue', window["project_participant_department" + i]);
        $("#project_participant_wagenum" + i).textbox('setValue', window["project_participant_wagenum" + i]);
        $("#project_participant_bonusratio" + i).textbox('setValue', window["project_participant_bonusratio" + i]);
    }
    $("#project_time").datebox('setValue', window.project_time);
    $("#project_starttime").datebox('setValue', window.project_starttime);
    $("#project_endtime").datebox('setValue', window.project_endtime);
    $("#yearChoose").combobox('setValue', window.yearChoose);
    $("#project_totalfunds").textbox('setValue', window.project_totalfunds);
    $("#project_finishedfunds").textbox('setValue', window.project_finishedfunds);
    $("#project_identifier").textbox('setValue', window.project_identifier);
    $("#project_remarks").textbox('setValue', window.project_remarks);
}

