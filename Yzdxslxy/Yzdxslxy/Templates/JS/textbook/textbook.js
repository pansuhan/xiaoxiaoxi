﻿$(function () {
    $("#textbook_datagrid").datagrid({
        url: '../../../Src/textbook/textbook.ashx?action=getData',
        singleSelect: true,
        toolbar: '#textbook_tb',
        striped: true,
        nowrap: false,
        columns: [
            [{
                field: "ID",
                width: 50,
                title: "ID",
                align: "center"
            },
            {
                field: "论著名称",
                width: 300,
                title: "论著名称",
                align: "center"
            },
            {
                field: "参与人数",
                width: 70,
                title: "参与人数",
                align: "center",
                hidden:'true'
            }, {
                field: "第1完成人",
                width: 100,
                title: "第1完成人",
                align: "center"
            },
             {
                 field: "完成人单位1",
                 width: 100,
                 title: "完成人单位1",
                 align: "center"
             },
            {
                field: "工资号1",
                width: 70,
                title: "工资号1",
                align: "center",
                hidden: 'true'
            },
            {
                field: "奖金比例1",
                width: 70,
                title: "奖金比例1",
                align: "center",
                hidden: 'true'
            },
            {
                field: "第2完成人",
                width: 100,
                title: "第2完成人",
                align: "center"
            },
             {
                 field: "完成人单位2",
                 width: 100,
                 title: "完成人单位2",
                 align: "center"
             },
            {
                field: "工资号2",
                width: 70,
                title: "工资号2",
                align: "center",
                hidden: 'true'
            },
            {
                field: "奖金比例2",
                width: 70,
                title: "奖金比例2",
                align: "center",
                hidden: 'true'
            },
            {
                field: "第3完成人",
                width: 100,
                title: "第3完成人",
                align: "center"
            },
             {
                 field: "完成人单位3",
                 width: 100,
                 title: "完成人单位3",
                 align: "center"
             },
            {
                field: "工资号3",
                width: 70,
                title: "工资号3",
                align: "center",
                hidden: 'true'
            },
            {
                field: "奖金比例3",
                width: 70,
                title: "奖金比例3",
                align: "center",
                hidden: 'true'
            },
            {
                field: "第4完成人",
                width: 100,
                title: "第4完成人",
                align: "center"
            },
             {
                 field: "完成人单位4",
                 width: 100,
                 title: "完成人单位4",
                 align: "center"
             },
            {
                field: "工资号4",
                width: 70,
                title: "工资号4",
                align: "center",
                hidden: 'true'
            },
            {
                field: "第5完成人",
                width: 100,
                title: "第5完成人",
                align: "center",
                hidden: 'true'
            },
             {
                 field: "完成人单位5",
                 width: 100,
                 title: "完成人单位5",
                 align: "center",
                 hidden: 'true'
             },
            {
                field: "工资号5",
                width: 70,
                title: "工资号5",
                align: "center",
                hidden: 'true'
            },
            {
                field: "奖金比例5",
                width: 70,
                title: "奖金比例5",
                align: "center",
                hidden: 'true'
            },
            {
                field: "第6完成人",
                width: 100,
                title: "第6完成人",
                align: "center",
                hidden: 'true'
            },
             {
                 field: "完成人单位6",
                 width: 100,
                 title: "完成人单位6",
                 align: "center",
                 hidden: 'true'
             },
            {
                field: "工资号6",
                width: 70,
                title: "工资号6",
                align: "center",
                hidden: 'true'
            },
            {
                field: "奖金比例6",
                width: 70,
                title: "奖金比例6",
                align: "center",
                hidden: 'true'
            },
            {
                field: "第7完成人",
                width: 100,
                title: "第7完成人",
                align: "center",
                hidden: 'true'
            },
             {
                 field: "完成人单位7",
                 width: 100,
                 title: "完成人单位7",
                 align: "center",
                 hidden: 'true'
             },
            {
                field: "工资号7",
                width: 70,
                title: "工资号7",
                align: "center",
                hidden: 'true'
            },
            {
                field: "奖金比例7",
                width: 70,
                title: "奖金比例7",
                align: "center",
                hidden: 'true'
            },
           {
               field: "第8完成人",
               width: 100,
               title: "第8完成人",
               align: "center",
               hidden: 'true'
           },
             {
                 field: "完成人单位8",
                 width: 100,
                 title: "完成人单位8",
                 align: "center",
                 hidden: 'true'
             },
            {
                field: "工资号8",
                width: 70,
                title: "工资号8",
                align: "center",
                hidden: 'true'
            },
            {
                field: "奖金比例8",
                width: 70,
                title: "奖金比例8",
                align: "center",
                hidden: 'true'
            },
            {
                field: "第9完成人",
                width: 100,
                title: "第9完成人",
                align: "center",
                hidden: 'true'
            },
             {
                 field: "完成人单位9",
                 width: 100,
                 title: "完成人单位9",
                 align: "center",
                 hidden: 'true'
             },
            {
                field: "工资号9",
                width: 70,
                title: "工资号9",
                align: "center",
                hidden: 'true'
            },
            {
                field: "奖金比例9",
                width: 70,
                title: "奖金比例9",
                align: "center",
                hidden: 'true'
            },
            {
                field: "第10完成人",
                width: 100,
                title: "第10完成人",
                align: "center",
                hidden: 'true'
            },
             {
                 field: "完成人单位10",
                 width: 100,
                 title: "完成人单位10",
                 align: "center",
                 hidden: 'true'
             },
            {
                field: "工资号10",
                width: 70,
                title: "工资号10",
                align: "center",
                hidden: 'true'
            },
            {
                field: "奖金比例10",
                width: 70,
                title: "奖金比例10",
                align: "center",
                hidden: 'true'
            },
            {
                field: "出版社",
                width: 100,
                title: "出版社",
                align: "center"
            },
            {
                field: "出版时间",
                width: 100,
                title: "出版时间",
                align: "center"
            },
            {
                field: "论著类别",
                width: 100,
                title: "论著类别",
                align: "center"
            },
            {
                field: "年度",
                width: 70,
                title: "年度",
                align: "center"
            },
            {
                field: "备注",
                width: 70,
                title: "备注",
                align: "center"
            }]
        ]
    });

    //jquery渲染textbook_add_dialog
    $("#textbook_add_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '添加论著信息',
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
                $("#textbook_add_iframe")[0].contentWindow.textbook_submitForm_add();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#textbook_add_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#textbook_add_iframe").attr("src", "");
        }
    });


    //jquery渲染textbook_update_dialog
    $("#textbook_update_dialog").dialog({
        bgiframe: true,
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '修改论著信息',
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
                $("#textbook_update_iframe")[0].contentWindow.textbook_submitForm_update();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#textbook_update_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#textbook_update_iframe").attr("src", "");
        }
    });
    $("#textbook_update_iframe").attr("src", 'textbook_update.html'); //设置IFRAME的SRC;

    //jquery渲染textbook_search_dialog
    $("#textbook_search_dialog").dialog({
        bgiframe: true,
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '查询论著信息',
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
                $("#textbook_search_iframe")[0].contentWindow.submit_textbook_search();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#textbook_search_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#textbook_search_iframe").attr("src", "");
        }
    });
})


// 添加论著信息
function textbook_add() {
    $("#textbook_add_dialog").dialog('open');
    $("#textbook_add_iframe").attr("src", 'textbook_add.html'); //设置IFRAME的SRC;
}


// 删除论著信息
function textbook_reject() {
    var row = $('#textbook_datagrid').datagrid('getSelected');
    var index = $('#textbook_datagrid').datagrid("getRowIndex", row);
    if (index != -1) {
        $.messager.confirm({
            title: '删除',
            msg: '确定删除该条记录吗?',
            left: 300,
            top: 150, //与上边距的距离
            fn: function (r) {
                if (r) {
                    var row = $('#textbook_datagrid').datagrid('getSelected');
                    var index = $('#textbook_datagrid').datagrid("getRowIndex", row);
                    // 根据行中的ID进行数据库删除操作,发送ajax请求
                    $.ajax({
                        //请求方式
                        type: "get",
                        //请求地址
                        url: "../../../Src/textbook/textbook.ashx?action=deleteData&ID=" + row.ID,
                        //请求成功
                        success: function (result) {
                            if (result > 1) {
                                $.messager.alert({
                                    title: '提示',
                                    msg: '删除成功！',
                                    left: 400,
                                    top: 150, //与上边距的距离
                                });
                                $('#textbook_datagrid').datagrid("reload");//jqgrid列表刷新
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


// 修改论著信息
function textbook_update() {
    var row = $('#textbook_datagrid').datagrid('getSelected');
    var index = $('#textbook_datagrid').datagrid("getRowIndex", row);
    if (index != -1) {
        $("#textbook_update_dialog").dialog('open');
        $("#textbook_update_iframe")[0].contentWindow.update_ID = row.ID;
        $("#textbook_update_iframe")[0].contentWindow.textbook_title = row.论著名称;
        $("#textbook_update_iframe")[0].contentWindow.author_num = row.参与人数;
        var jsonstr = '[';
        for (var i = 1; i <= parseInt(row.参与人数) ; i++) {
            jsonstr = jsonstr + '{"author_order":' + '\"第' + parseInt(i) + '完成人\"' + "," + '"name":' + '\"' + row["第" + i + "完成人"] + '\"' + ',"department":' + '\"' + row["完成人单位" + i] + '\"' + ',"wage_number":' + '\"' + row["工资号" + i] + '\"' + ',"bonusratio":' + row["奖金比例" + i] + '},';
        }
        jsonstr = jsonstr.substring(0, jsonstr.length - 1);
        jsonstr = jsonstr + ']';
        var data_json = $.parseJSON(jsonstr);
        $("#textbook_update_iframe")[0].contentWindow.table_json = data_json;
        $("#textbook_update_iframe")[0].contentWindow.textbook_publishing_house = row.出版社; 
        $("#textbook_update_iframe")[0].contentWindow.textbook_date = row.出版时间;
        $("#textbook_update_iframe")[0].contentWindow.textbook_type = row.论著类别;
        $("#textbook_update_iframe")[0].contentWindow.yearChoose = row.年度;
        $("#textbook_update_iframe")[0].contentWindow.textbook_remarks = row.备注;
        $("#textbook_update_iframe")[0].contentWindow.parentData();
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


// 查询论著信息
function textbook_search() {
    $("#textbook_search_dialog").dialog('open');
    $("#textbook_search_iframe").attr("src", 'textbook_search.html'); //设置IFRAME的SRC;
}

