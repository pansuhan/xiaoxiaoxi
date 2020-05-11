$(function () {
    $("#project_datagrid").datagrid({
        url: '../../../Src/project/project.ashx?action=getData',
        singleSelect: true,
        toolbar: '#project_tb',
        striped: true,
        nowrap: true,
        columns: [
            [{
                field: "ID",
                width: 40,
                title: "ID",
                align: "center"
            },
            {
                field: "项目名称",
                width: 150,
                title: "项目名称",
                align: "center"
            },
            {
                field: "项目级别",
                width: 150,
                title: "项目级别",
                align: "center"
            },
            {
                field: "负责人人数",
                width: 80,
                title: "负责人人数",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人姓名1",
                width: 80,
                title: "负责人姓名1",
                align: "center"
            },
            {
                field: "负责人单位1",
                width: 100,
                title: "负责人单位1",
                align: "center"
            },
            {
                field: "负责人工资号1",
                width: 70,
                title: "负责人工资号1",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人奖金比例1",
                width: 70,
                title: "负责人奖金比例1",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人姓名2",
                width: 80,
                title: "负责人姓名2",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人单位2",
                width: 100,
                title: "负责人单位2",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人工资号2",
                width: 70,
                title: "负责人工资号2",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人奖金比例2",
                width: 70,
                title: "负责人奖金比例2",
                align: "center",
                hidden: 'true'
            },
           {
               field: "负责人姓名3",
               width: 80,
               title: "负责人姓名3",
               align: "center",
               hidden: 'true'
           },
            {
                field: "负责人单位3",
                width: 100,
                title: "负责人单位3",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人工资号3",
                width: 70,
                title: "负责人工资号3",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人奖金比例3",
                width: 70,
                title: "负责人奖金比例3",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人姓名4",
                width: 80,
                title: "负责人姓名4",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人单位4",
                width: 100,
                title: "负责人单位4",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人工资号4",
                width: 70,
                title: "负责人工资号4",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人奖金比例4",
                width: 70,
                title: "负责人奖金比例4",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人姓名5",
                width: 80,
                title: "负责人姓名5",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人单位5",
                width: 100,
                title: "负责人单位5",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人工资号5",
                width: 70,
                title: "负责人工资号5",
                align: "center",
                hidden: 'true'
            },
            {
                field: "负责人奖金比例5",
                width: 70,
                title: "负责人奖金比例5",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人人数",
                width: 80,
                title: "参与人人数",
                align: "center",
            },
            {
                field: "参与人姓名1",
                width: 80,
                title: "参与人姓名1",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人单位1",
                width: 100,
                title: "参与人单位1",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人工资号1",
                width: 70,
                title: "参与人工资号1",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人奖金比例1",
                width: 70,
                title: "参与人奖金比例1",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人姓名2",
                width: 80,
                title: "参与人姓名2",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人单位2",
                width: 100,
                title: "参与人单位2",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人工资号2",
                width: 70,
                title: "参与人工资号2",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人奖金比例2",
                width: 70,
                title: "参与人奖金比例2",
                align: "center",
                hidden: 'true'
            },
           {
               field: "参与人姓名3",
               width: 80,
               title: "参与人姓名3",
               align: "center",
               hidden: 'true'
           },
            {
                field: "参与人单位3",
                width: 100,
                title: "参与人单位3",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人工资号3",
                width: 70,
                title: "参与人工资号3",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人奖金比例3",
                width: 70,
                title: "参与人奖金比例3",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人姓名4",
                width: 80,
                title: "参与人姓名4",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人单位4",
                width: 100,
                title: "参与人单位4",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人工资号4",
                width: 70,
                title: "参与人工资号4",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人奖金比例4",
                width: 70,
                title: "参与人奖金比例4",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人姓名5",
                width: 80,
                title: "参与人姓名5",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人单位5",
                width: 100,
                title: "参与人单位5",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人工资号5",
                width: 70,
                title: "参与人工资号5",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人奖金比例5",
                width: 70,
                title: "参与人奖金比例5",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人姓名6",
                width: 80,
                title: "参与人姓名6",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人单位6",
                width: 100,
                title: "参与人单位6",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人工资号6",
                width: 70,
                title: "参与人工资号6",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人奖金比例6",
                width: 70,
                title: "参与人奖金比例6",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人姓名7",
                width: 80,
                title: "参与人姓名7",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人单位7",
                width: 100,
                title: "参与人单位7",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人工资号7",
                width: 70,
                title: "参与人工资号7",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人奖金比例7",
                width: 70,
                title: "参与人奖金比例7",
                align: "center",
                hidden: 'true'
            },
           {
               field: "参与人姓名8",
               width: 80,
               title: "参与人姓名8",
               align: "center",
               hidden: 'true'
           },
            {
                field: "参与人单位8",
                width: 100,
                title: "参与人单位8",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人工资号8",
                width: 70,
                title: "参与人工资号8",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人奖金比例8",
                width: 70,
                title: "参与人奖金比例8",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人姓名9",
                width: 80,
                title: "参与人姓名9",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人单位9",
                width: 100,
                title: "参与人单位9",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人工资号9",
                width: 70,
                title: "参与人工资号9",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人奖金比例9",
                width: 70,
                title: "参与人奖金比例9",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人姓名10",
                width: 80,
                title: "参与人姓名10",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人单位10",
                width: 100,
                title: "参与人单位10",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人工资号10",
                width: 70,
                title: "参与人工资号10",
                align: "center",
                hidden: 'true'
            },
            {
                field: "参与人奖金比例10",
                width: 70,
                title: "参与人奖金比例10",
                align: "center",
                hidden: 'true'
            },
            {
                field: "立项时间",
                width: 80,
                title: "立项时间",
                align: "center"
            },
            {
                field: "起时间",
                width: 80,
                title: "起时间",
                align: "center"
            },
            {
                field: "止时间",
                width: 80,
                title: "止时间",
                align: "center"
            },
            {
                field: "年度",
                width: 60,
                title: "年度",
                align: "center"
            },
            {
                field: "总经费",
                width: 80,
                title: "总经费",
                align: "center"
            },
            {
                field: "到账经费",
                width: 80,
                title: "到账经费",
                align: "center"
            },
             {
                 field: "批准编号",
                 width: 80,
                 title: "批准编号",
                 align: "center"
             },
             {
                 field: "业绩点",
                 width: 60,
                 title: "业绩点",
                 align: "center"
             },
            {
                field: "备注",
                width: 100,
                title: "备注",
                align: "center"
            }]
        ]
    });
    //添加信息dialog
    $("#project_add_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '科研项目工作量信息添加',
        top: '5px',
        left: '0px',
        height: window.screen.height - 257,
        width: window.screen.width - 200,
        draggable: false,
        modal: true,
        toolbar: [{
            text: '保存',
            iconCls: 'icon-save',
            handler: function () {
                $("#project_add_iframe")[0].contentWindow.project_submitForm_add();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#project_add_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#project_add_iframe").attr("src", "");
        }
    });


    //修改信息dialog
    $("#project_update_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '科研项目工作量信息修改',
        top: '5px',
        left: '0px',
        height: window.screen.height - 257,
        width: window.screen.width - 200,
        draggable: false,
        modal: true,
        toolbar: [{
            text: '保存',
            iconCls: 'icon-save',
            handler: function () {
                $("#project_update_iframe")[0].contentWindow.project_submitForm_update();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#project_update_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#project_update_iframe").attr("src", "");
        }
    });
    $("#project_update_iframe").attr("src", 'project_update.html'); //设置IFRAME的SRC;

    //查询功能dialog
    $("#project_search_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '科研项目工作量信息查询',
        top: '5px',
        left: '0px',
        height: window.screen.height - 257,
        width: window.screen.width - 200,
        draggable: false,
        modal: true,
        toolbar: [{
            text: '保存',
            iconCls: 'icon-save',
            handler: function () {
                $("#project_search_iframe")[0].contentWindow.submit_project_search();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#project_search_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#project_search_iframe").attr("src", "");
        }
    });

})


// 删除科研项目工作量信息
function project_reject() {
    var row = $('#project_datagrid').datagrid('getSelected');
    var index = $('#project_datagrid').datagrid("getRowIndex", row);
    if (index != -1) {
        $.messager.confirm({
            title: '删除',
            msg: '确定删除该条记录吗?',
            left: 300,
            top: 150, //与上边距的距离
            fn: function (r) {
                if (r) {
                    $.ajax({
                        //请求方式
                        type: "get",
                        //请求地址
                        url: "../../../Src/project/project.ashx?action=deleteData&ID=" + row.ID,
                        //请求成功
                        success: function (result) {
                            if (result > 1) {
                                $.messager.alert({
                                    title: '提示',
                                    msg: '删除成功！',
                                    left: 400,
                                    top: 150, //与上边距的距离
                                });
                                $('#project_datagrid').datagrid("reload");//jqgrid列表刷新
                            }
                            else {
                                $.messager.alert({
                                    title: '提示',
                                    msg: '删除失败！',
                                    left: 400,
                                    top: 150, //与上边距的距离
                                });
                            }
                        },
                        //请求失败，包含具体的错误信息
                        error: function (e) {
                            console.log(e.status);
                            console.log(e.responseText);
                        }
                    });
                }
            }
        });
    }
    else {
        $.messager.alert({
            title: '错误',
            msg: '没有选择对应记录!',
            icon: 'error',
            left: 400,
            top: 150, //与上边距的距离
        });
    }
}


//添加科研项目工作量信息
function project_add() {
    $("#project_add_dialog").dialog('open');
    $("#project_add_iframe").attr("src", 'project_add.html'); //设置IFRAME的SRC;

}


//修改本科生研究工作量信息
function project_update() {
    var row = $('#project_datagrid').datagrid('getSelected');
    var index = $('#project_datagrid').datagrid("getRowIndex", row);
    if (index != -1) {
        $("#project_update_dialog").dialog('open');
        $("#project_update_iframe")[0].contentWindow.update_ID = row.ID;
        $("#project_update_iframe")[0].contentWindow.project_name = row["项目名称"];
        $("#project_update_iframe")[0].contentWindow.project_grade = row["项目级别"];
        $("#project_update_iframe")[0].contentWindow.project_leadersnum = row["负责人人数"];
        
        for (var i = 1; i <= parseInt(row.负责人人数) ; i++) {
            $("#project_update_iframe")[0].contentWindow["project_leaders_name" + i] = row["负责人姓名" + i];
            $("#project_update_iframe")[0].contentWindow["project_leaders_department" + i] = row["负责人单位" + i];
            $("#project_update_iframe")[0].contentWindow["project_leaders_wagenum" + i] = row["负责人工资号" + i];
            $("#project_update_iframe")[0].contentWindow["project_leaders_bonusratio" + i] = row["负责人奖金比例" + i];
        }
        $("#project_update_iframe")[0].contentWindow.project_participantnum = row.参与人人数;

        for (var i = 1; i <= parseInt(row.参与人人数) ; i++) {
            $("#project_update_iframe")[0].contentWindow["project_participant_name" + i] = row["参与人姓名" + i];
            $("#project_update_iframe")[0].contentWindow["project_participant_department" + i] = row["参与人单位" + i];
            $("#project_update_iframe")[0].contentWindow["project_participant_wagenum" + i] = row["参与人工资号" + i];
            $("#project_update_iframe")[0].contentWindow["project_participant_bonusratio" + i] = row["参与人奖金比例" + i];
        }
        $("#project_update_iframe")[0].contentWindow["project_time"] = row["立项时间"];
        $("#project_update_iframe")[0].contentWindow["project_starttime"] = row["起时间"];
        $("#project_update_iframe")[0].contentWindow["project_endtime"] = row["止时间"];
        $("#project_update_iframe")[0].contentWindow["yearChoose"] = row["年度"];
        $("#project_update_iframe")[0].contentWindow["project_totalfunds"] = row["总经费"];
        $("#project_update_iframe")[0].contentWindow["project_finishedfunds"] = row["到账经费"];
        $("#project_update_iframe")[0].contentWindow["project_identifier"] = row["批准编号"];
        $("#project_update_iframe")[0].contentWindow["project_remarks"] = row["备注"];
        $("#project_update_iframe")[0].contentWindow.parentData();
    }
    else {
        $.messager.alert({
            title: '错误',
            msg: '没有选择对应记录!',
            icon: 'error',
            left: 400,
            top: 150, //与上边距的距离
        });
    }

}


// 查询科研项目工作量信息
function project_search() {
    $("#project_search_dialog").dialog('open');
    $("#project_search_iframe").attr("src", 'project_search.html'); //设置IFRAME的SRC;
}
