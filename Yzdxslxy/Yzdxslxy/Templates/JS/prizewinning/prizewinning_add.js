$(function () {
    //用ajax访问数据库
    $.ajax({
        //请求方式
        type: "get",
        //请求地址
        url: "../../Src/paper/paper.ashx?action=get_grade&grade_type=" + '获奖成果',
        //数据，json字符串
        //请求成功
        success: function (result) {
            $("#prizewinning_type").combogrid({
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

    //文件上传加载
    $("#file").on("change", function () {
        var fileImg = $("#file")[0];
        var fileList = fileImg.files;
        for (var i = 0; i < fileList.length; i++) {
            var imgSrcI = getObjectURL(fileList[i]);
            imgName.push(fileList[i].name);
            imgSrc.push(imgSrcI);
            imgFile.push(fileList[i]);
        }
        addNewContent($("#imgBox"));
    })
})



var imgSrc = []; //图片路径
var imgFile = []; //文件流
var imgName = []; //图片名字

//图片展示
function addNewContent(obj) {
    $(imgBox).html("");
    for (var a = 0; a < imgSrc.length; a++) {
        var oldBox = $(obj).html();
        $(obj).html(oldBox + '<div class="imgContainer"><img title=' + imgName[a] + ' alt=' + imgName[a] + ' src=' + imgSrc[a] + ' onclick="imgDisplay(this)"><p onclick="removeImg(this,' + a + ')" class="imgDelete">删除</p></div>');
    }
}
//删除
function removeImg(obj, index) {
    imgSrc.splice(index, 1);
    imgFile.splice(index, 1);
    imgName.splice(index, 1);
    var boxId = "#" + $(obj).parent('.imgContainer').parent().attr("id");
    addNewContent(boxId);
}

//图片灯箱
function imgDisplay(obj) {
    var src = $(obj).attr("src");
    var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;"><img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p></div>'
    $('body').append(imgHtml);
}
//关闭
function closePicture(obj) {
    $(obj).parent("div").remove();
}

//图片预览路径
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

//上传(将文件流数组传到后台)
function prizewinning_submitForm_add() {
    
    //var reader = new FileReader();
    //var prizewinning_name = $("#prizewinning_name").textbox('getValue');//项目名称
    //var prizewinning_type = $("#prizewinning_type").textbox('getValue');//获奖类别
    //var prizewinning_personname = $("#prizewinning_personname").textbox('getValue');//获奖人名称
    //var prizewinning_time = $("#prizewinning_time").textbox('getValue');//获奖时间
    //var yearChoose = $("#yearChoose").textbox('getValue');//获奖年度
    //var filePath = $("#file").val();//附件
    //var prizewinning_remarks = $("#prizewinning_remarks").textbox('getValue');//获奖备注

    //var formData = new FormData();

    //formData.append('prizewinning_name', prizewinning_name);
    //formData.append('prizewinning_type', prizewinning_type);
    //formData.append('prizewinning_personname', prizewinning_personname);
    //formData.append('prizewinning_time', prizewinning_time);
    //formData.append('yearChoose', yearChoose);

    for (var i = 0; i < imgFile.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(imgFile[i]);
        reader.onload = function (e) {
            console.log(e.target.result);
            $("prizewinning_remarks").textbox("setValues", e.target.result);
        }
        
    }
    $('#prizewinningInfo_form').form('submit', {
        url: '../../../Src/prizewinning/prizewinning.ashx?action=insertprizewinningData',
        success: function (data) {
            console.log(data);
        }

    });
    //console.log(arrayObj);
    //formData.append('prizewinning_remarks', prizewinning_remarks);

    //    data: $('#prizewinningInfo_form').serialize(),



    //$.ajax({
    //    type: 'post',
    //    dataType: 'json',
    //    //data: formData,
    //    cache: false, //上传文件不需要缓存
    //    url: '../../../Src/prizewinning/prizewinning.ashx?action=insertprizewinningData',
    //    processData: false, 
    //    contentType: false, 
    //    success: function (data) {
    //        console.log(data);
            
    //    },
    //    error: function (e) {
    //        console.log(e);
    //    }
    //});

    
}
