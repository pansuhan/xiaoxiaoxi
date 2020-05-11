$(function () {
    $("#intellectualProperty_datagrid").datagrid({
        url: '../../../Src/intellectualProperty/intellectualProperty.ashx?action=getData',
        singleSelect: true,
        toolbar: '#intellectualProperty_tb',
        striped: true,
        nowrap: true,
        columns: [
            [{
                field: "ID",
                width: 40,
                title: "ID",
                align: "center"
            }, {
                field: "产权名称",
                width: 200,
                title: "产权名称",
                align: "center"
            },
            {
                field: "产权登记号",
                width: 150,
                title: "产权登记号",
                align: "center"
            },
             {
                 field: "产权类别",
                 width: 150,
                 title: "产权类别",
                 align: "center"
             },
              {
                  field: "权利人",
                  width: 100,
                  title: "权利人",
                  align: "center"
              },
               {
                  field: "工资号",
                  width: 100,
                  title: "工资号",
                  align: "center"
               },
               {
                   field: "单位名称",
                   width: 150,
                   title: "单位名称",
                   align: "center"
               },
              {
                field: "取得时间",
                width: 100,
                title: "取得时间",
                align: "center"
            },
             {
                 field: "年度",
                 width: 70,
                 title: "年度",
                 align: "center"
             },
              {
                  field: "业绩点",
                  width: 80,
                  title: "业绩点",
                  align: "center"
              },
              {
                  field: "备注",
                  width: 200,
                  title: "备注",
                  align: "center"
              }
            ]
        ]
    });
    //添加信息dialog
    $("#intellectualProperty_add_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '知识产权成果信息添加',
        top: '5px',
        left: '0px',
        height: window.screen.height-257,
        width: window.screen.width-200,
        draggable: false,
        modal: true,
        toolbar:[{
            text:'保存',
            iconCls:'icon-save',
            handler: function () {
                $("#intellectualProperty_add_iframe")[0].contentWindow.intellectualProperty_submitForm_add();
            }
        },{
            text:'返回',
            iconCls:'icon-undo',
            handler: function () {
                $('#intellectualProperty_add_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#intellectualProperty_add_iframe").attr("src", "");
        }
    });


    //修改信息dialog
    $("#intellectualProperty_update_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '知识产权成果信息修改',
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
                $("#intellectualProperty_update_iframe")[0].contentWindow.intellectualProperty_submitForm_update();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#intellectualProperty_update_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#intellectualProperty_update_iframe").attr("src", "");
        }
    });
    $("#intellectualProperty_update_iframe").attr("src", 'intellectualProperty_update.html'); //设置IFRAME的SRC;

    //查询功能dialog
    $("#intellectualProperty_search_dialog").dialog({
        autoOpen: false, //默认为false隐藏掉
        closed: true,
        resizable: false,
        title: '知识产权成果信息查询',
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
                $("#intellectualProperty_search_iframe")[0].contentWindow.submit_intellectualProperty_search();
            }
        }, {
            text: '返回',
            iconCls: 'icon-undo',
            handler: function () {
                $('#intellectualProperty_search_dialog').dialog('close');
            }
        }],
        close: function () {
            $("#intellectualProperty_search_iframe").attr("src", "");
        }
    });
})


// 删除本科生研究工作量信息
function intellectualProperty_reject() {
    var row = $('#intellectualProperty_datagrid').datagrid('getSelected');
    var index = $('#intellectualProperty_datagrid').datagrid("getRowIndex", row);
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
                        url: "../../../Src/intellectualProperty/intellectualProperty.ashx?action=deleteData&ID=" + row.ID,
                        //请求成功
                        success: function (result) {
                            if (result > 1) {
                                $.messager.alert({
                                    title: '提示',
                                    msg: '删除成功！',
                                    left: 400,
                                    top: 150, //与上边距的距离
                                });
                                $('#intellectualProperty_datagrid').datagrid("reload");//jqgrid列表刷新
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


//添加知识产权成果信息
function intellectualProperty_add() {
    $("#intellectualProperty_add_dialog").dialog('open');
    $("#intellectualProperty_add_iframe").attr("src", 'intellectualProperty_add.html'); //设置IFRAME的SRC;

}

//修改知识产权成果信息
function intellectualProperty_update() {
    var row = $('#intellectualProperty_datagrid').datagrid('getSelected');
    var index = $('#intellectualProperty_datagrid').datagrid("getRowIndex", row);
    if (index != -1) {
        $("#intellectualProperty_update_dialog").dialog('open');
        $("#intellectualProperty_update_iframe")[0].contentWindow.update_ID = row.ID;
        $("#intellectualProperty_update_iframe")[0].contentWindow.intellectualProperty_name = row.产权名称;
        $("#intellectualProperty_update_iframe")[0].contentWindow.intellectualProperty_identifier = row.产权登记号;
        $("#intellectualProperty_update_iframe")[0].contentWindow.intellectualProperty_type = row.产权类别;
        $("#intellectualProperty_update_iframe")[0].contentWindow.intellectualProperty_personname = row.权利人;
        $("#intellectualProperty_update_iframe")[0].contentWindow.intellectualProperty_datetime = row.取得时间;
        $("#intellectualProperty_update_iframe")[0].contentWindow.yearChoose = row.年度;
        $("#intellectualProperty_update_iframe")[0].contentWindow.intellectualProperty_remarks = row.备注;
        $("#intellectualProperty_update_iframe")[0].contentWindow.parentData();
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


// 查询知识产权成果信息
function intellectualProperty_search() {
    $("#intellectualProperty_search_dialog").dialog('open');
    $("#intellectualProperty_search_iframe").attr("src", 'intellectualProperty_search.html'); //设置IFRAME的SRC;
}




