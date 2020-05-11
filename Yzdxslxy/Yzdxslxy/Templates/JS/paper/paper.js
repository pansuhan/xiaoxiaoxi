$(function () {
    $("#paper_datagrid").datagrid({
        url: '../../../Src/paper/paper.ashx?action=getData',
        singleSelect: true,
        toolbar: '#paper_tb',
        //nowrap: true,//设置为false，单元格内容会换行显示
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
                field: "论文名称",
                width: 300,
                title: "论文名称",
                align: "center"
            },
            {
                field: "作者人数",
                width: 70,
                title: "作者人数",
                align: "center",
                hidden:'true'
            },
            {
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
                field: "发表刊物",
                width: 300,
                title: "发表刊物",
                align: "center"
            },
            {
                field: "发表时间",
                width: 100,
                title: "发表时间",
                align: "center"
            },
            {
                field: "发表刊物卷期",
                width: 100,
                title: "发表刊物卷期",
                align: "center"
            },
            {
                field: "起页码",
                width: 60,
                title: "起页码",
                align: "center"
            },
            {
                field: "止页码",
                width: 60,
                title: "止页码",
                align: "center"
            },
            {
                field: "收录级别",
                width: 200,
                title: "收录级别",
                align: "center"
            },
            {
                field: "业绩点",
                width: 60,
                title: "业绩点",
                align: "center"
            },
            {
                field: "单位信息",
                width: 120,
                title: "单位信息",
                align: "center"
            },
            {
                field: "年度",
                width: 80,
                title: "年度",
                align: "center"
            },
            {
                field: "备注",
                width: 80,
                title: "备注",
                align: "center"
            }]
        ]
    });
    //添加dialog
    $("#paper_add_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '论文信息添加',
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
                $("#paper_add_iframe")[0].contentWindow.paper_add_submit();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#paper_add_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#paper_add_iframe").attr("src", "");
        }
    });

    //修改dialog
    $("#paper_update_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '论文信息修改',
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
                $("#paper_update_iframe")[0].contentWindow.paper_update_submit();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#paper_update_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#paper_update_iframe").attr("src", "");
        }
    });
    $("#paper_update_iframe").attr("src", 'paper_update.html'); //设置IFRAME的SRC;

    //dialog查询功能部分
    $("#paper_search_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '论文信息查询',
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
                $("#paper_search_iframe")[0].contentWindow.submit_search_paper();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#paper_search_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#paper_search_iframe").attr("src", "");
        }
    });

})


// 删除论文信息
function paper_reject() {
    var row = $('#paper_datagrid').datagrid('getSelected');
    var index = $('#paper_datagrid').datagrid("getRowIndex", row);
    if (index != -1) {
        $.messager.confirm({
            title: '删除',
            msg: '确定删除该条记录吗?',
            left: 300,
            top: 150, //与上边距的距离
            fn: function (r) {
                if (r) {
                    var row = $('#paper_datagrid').datagrid('getSelected');
                    var index = $('#paper_datagrid').datagrid("getRowIndex", row);
                    // 根据行中的ID进行数据库删除操作,发送ajax请求
                    $.ajax({
                        //请求方式
                        type: "get",
                        //请求地址
                        url: "../../../Src/paper/paper.ashx?action=deleteData&ID=" + row.ID,
                        //请求成功
                        success: function (result) {
                            if (result > 1) {
                                $.messager.alert({
                                    title: '提示',
                                    msg: '删除成功！',
                                    left: 400,
                                    top: 150, //与上边距的距离
                                });
                                $('#paper_datagrid').datagrid("reload");//jqgrid列表刷新
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

//添加论文信息
function paper_add() {
    $("#paper_add_dialog").dialog('open');
    $("#paper_add_iframe").attr("src", 'paper_add.html'); //设置IFRAME的SRC;
}

//修改论文信息
function paper_update() {
    var row = $('#paper_datagrid').datagrid('getSelected');
    var index = $('#paper_datagrid').datagrid("getRowIndex", row);
    if (index != -1) {
        $("#paper_update_dialog").dialog('open');
        $("#paper_update_iframe")[0].contentWindow.update_ID = row.ID;
        $("#paper_update_iframe")[0].contentWindow.paper_title = row.论文名称;
        $("#paper_update_iframe")[0].contentWindow.author_num = row.作者人数;
        var jsonstr = '[';
        for (var i = 1; i <= parseInt(row.作者人数) ; i++) {
            jsonstr = jsonstr + '{"author_order":' + '\"第' + parseInt(i) + '完成人\"' + "," + '"name":' + '\"' + row["第" + i + "完成人"] + '\"' + ',"department":' + '\"' + row["完成人单位" + i] + '\"' + ',"wage_number":' + '\"' + row["工资号" + i] + '\"' + ',"bonusratio":' + row["奖金比例" + i] + '},';
        }
        jsonstr = jsonstr.substring(0, jsonstr.length - 1);
        jsonstr = jsonstr + ']';
        var data_json = $.parseJSON(jsonstr);
        $("#paper_update_iframe")[0].contentWindow.table_json = data_json;
        $("#paper_update_iframe")[0].contentWindow.paper_journal = row.发表刊物;
        $("#paper_update_iframe")[0].contentWindow.paper_date = row.发表时间;
        $("#paper_update_iframe")[0].contentWindow.paper_journal_vol = row.发表刊物卷期;
        $("#paper_update_iframe")[0].contentWindow.paper_startpage = row.起页码;
        $("#paper_update_iframe")[0].contentWindow.paper_endpage = row.止页码;
        $("#paper_update_iframe")[0].contentWindow.paper_grade = row.收录级别;
        $("#paper_update_iframe")[0].contentWindow.paper_departmentinfo = row.单位信息;
        $("#paper_update_iframe")[0].contentWindow.yearChoose = row.年度;
        $("#paper_update_iframe")[0].contentWindow.paper_remarks = row.备注;
        $("#paper_update_iframe")[0].contentWindow.parentData();
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

    
// 查询论文信息
function paper_search() {
    $("#paper_search_dialog").dialog('open');
    $("#paper_search_iframe").attr("src", 'paper_search.html'); //设置IFRAME的SRC;
}
