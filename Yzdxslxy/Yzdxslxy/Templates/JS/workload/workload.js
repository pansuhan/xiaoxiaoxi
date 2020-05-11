$(function () {
    $("#workload_datagrid").datagrid({
        url: '../../../Src/workload/workload.ashx?action=getWorkload',
        singleSelect: true,
        toolbar: '#workload_tb',
        striped: true,
        nowrap: false,
        pagination: true,
        pageList: [10, 20, 50, 100],
        pageSize: 10,
        columns: [
            [{
                field: "ID",
                width: 50,
                title: "ID",
                align: "center"
            },
            {
                field: "姓名",
                width: 80,
                title: "姓名",
                align: "center"
            },
            {
                field: "工资号",
                width: 80,
                title: "工资号",
                align: "center"
            },
            {
                field: "本科生教学工作量",
                width: 200,
                title: "本科生教学工作量",
                align: "center"
            },
            {
                field: "研究生教学工作量",
                width: 200,
                title: "研究生教学工作量",
                align: "center"
            },
            {
                field: "本科生研究工作量",
                width: 200,
                title: "本科生教学工作量",
                align: "center"
            },
            {
                field: "研究生研究工作量",
                width: 200,
                title: "研究生研究工作量",
                align: "center"
            },
            {
                field: "科研项目工作量",
                width: 200,
                title: "科研项目工作量",
                align: "center"
            },
            {
                field: "学术论文工作量",
                width: 200,
                title: "学术论文工作量",
                align: "center"
            },
            {
                field: "专著教材工作量",
                width: 200,
                title: "专著教材工作量",
                align: "center"
            },
            {
                field: "获奖成果工作量",
                width: 200,
                title: "获奖成果工作量",
                align: "center"
            },
            {
                field: "知识产权工作量",
                width: 200,
                title: "知识产权工作量",
                align: "center"
            },
            {
                field: "合计工作量",
                width: 200,
                title: "合计工作量",
                align: "center"
            }
            ]
        ]
    });
    //点击修改类别弹出dialog，后期独立出去
    $("#update_type_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '等级类别',
        top: '5px',
        left: '0px',
        height: window.screen.height - 257,
        width: window.screen.width - 200,
        draggable: false,
        modal: true
    });
    //添加的dialog
    $("#update_type_add_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '等级类别',
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
                if ($("#update_type_add_form").form('validate')) {
                    $('#update_type_add_form').form('submit', {
                        url: "../../../Src/workload/workload.ashx?action=insert_type",
                        success: function (data) {
                            if (data > 0) {
                                $.messager.alert({
                                    icon: 'info',
                                    msg: '添加成功',
                                    left: 400,
                                    top: 150, //与上边距的距离
                                    fn: function () {
                                        $('#update_type_add_dialog').dialog('close');//关闭dialog 
                                        $("#workload_datagrid").datagrid("reload");//datagrid 加载返回的数据
                                    }
                                });
                            }
                            else {
                                $.messager.alert({
                                    icon: 'error',
                                    msg: '添加失败!',
                                    left: 400,
                                    top: 150, //与上边距的距离
                                    fn: function () {
                                        $('#update_type_add_dialog').dialog('close');//关闭dialog 
                                        return false;
                                    }
                                });
                            }
                        }
                    });
                }
                
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#update_type_add_dialog').dialog('close');
            }
        }]
    });

    //修改的dialog
    $("#update_type_update_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '等级类别',
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
                submit_type_update();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#update_type_update_dialog').dialog('close');
            }
        }]
    });

})

function update_type() {
    $("#update_type_dialog").dialog('open');
    $("#type_datagrid").datagrid({
        url: "../../../Src/workload/workload.ashx?action=get_type_data",
        singleSelect: true,
        striped: true,
        fitColumns: true,
        collapsible: true,
        fit: true,
        nowrap: false,
        toolbar: '#type_tb',
        pagination: true,
        pageList: [10, 20, 50, 100],
        pageSize: 10,
        columns: [
            [{
                field: "ID",
                width: 40,
                title: "ID",
                align: "center"
            },{
                field: "等级",
                width: 200,
                title: "等级",
                align: "center"
            },{
                field: "业绩点",
                width: 100,
                title: "业绩点",
                align: "center"
            },{
                field: "项目类别系数",
                width: 100,
                title: "项目类别系数",
                align: "center"
            },{
                field: "所属类别",
                width: 200,
                title: "所属类别",
                align: "center"
            }]
                ],
                
            })
        }

//点击增加
function type_add() {
    $("#update_type_add_dialog").dialog('open');
}

function type_remove() {
    var row = $('#type_datagrid').datagrid('getSelected');
    var index = $('#type_datagrid').datagrid("getRowIndex", row);
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
                        url: "../../../Src/workload/workload.ashx?action=deleteType&ID=" + row.ID,
                        //请求成功
                        success: function (result) {
                            if (result > 0) {
                                $.messager.alert({
                                    title: '提示',
                                    msg: '删除成功！',
                                    left: 400,
                                    top: 150, //与上边距的距离
                                });
                                $('#type_datagrid').datagrid("reload");//jqgrid列表刷新
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
//点击修改
function type_update() {
    
    var row = $('#type_datagrid').datagrid('getSelected');
    var index = $('#type_datagrid').datagrid("getRowIndex", row);
    if (index != -1) {
        $("#update_type_update_dialog").dialog('open');
        $("#update_type").combobox('setValue', row.所属类别);
        $("#update_name").textbox('setValue', row.等级);
        $("#update_point").numberbox('setValue', row.业绩点);
        $("#update_ratio").numberbox('setValue', row.项目类别系数);
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
//点击保存实现提交，对应执行的函数
function submit_type_update() {
    var row = $('#type_datagrid').datagrid('getSelected');
    if ($("#update_type_update_form").form('validate')) {
        $('#update_type_update_form').form('submit', {
            url: "../../../Src/workload/workload.ashx?action=update_type&update_ID=" + row.ID,
            success: function (data) {
                if (data > 0) {
                    $.messager.alert({
                        icon: 'info',
                        msg: '修改成功',
                        left: 400,
                        top: 150, //与上边距的距离
                        fn: function () {
                            $('#update_type_add_dialog').dialog('close');//关闭dialog 
                            $("#type_datagrid").datagrid("reload");//datagrid 加载返回的数据
                        }
                    });
                }
                else {
                    $.messager.alert({
                        icon: 'error',
                        msg: '修改失败!',
                        left: 400,
                        top: 150, //与上边距的距离
                        fn: function () {
                            $('#update_type_add_dialog').dialog('close');//关闭dialog 
                            return false;
                        }
                    });
                }
            }
        });
    }
}