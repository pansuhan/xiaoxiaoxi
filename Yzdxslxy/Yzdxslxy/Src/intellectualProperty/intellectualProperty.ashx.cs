using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
namespace Yzdxslxy.Src.intellectualProperty
{
    /// <summary>
    /// intellectualProperty 的摘要说明
    /// </summary>
    public class intellectualProperty : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.Params["action"];

            //intellectualProperty获取数据，数据库数据加载
            if (action.Equals("getData"))
            {
                string sql = "select * from intellectualProperty";
                string dt = DbHelper.SqlHelper.GetDataSet(sql);
                context.Response.Write(JsonConvert.DeserializeObject(dt));
            }
            //intellectualProperty中删除数据，将删除的数据插入的删除表中，原始表删除
            if (action.Equals("deleteData"))
            {
                string delete_ID = context.Request.Params["ID"];//从前端传过来需要删除数据的ID，根据ID值进行删除
                //将需要的删除的数据插入到删除表中
                string select_delete_id_sql = string.Format("insert into intellectualProperty_delete select * from intellectualProperty where ID = '{0}'", delete_ID.ToString().Trim());
                int responseNum = DbHelper.SqlHelper.OpDbData(select_delete_id_sql);
                //将数据表中的数据删除掉
                string delete_id_sql = string.Format("delete from intellectualProperty where ID = '{0}'", delete_ID.ToString().Trim());
                int dt = DbHelper.SqlHelper.OpDbData(delete_id_sql);
                context.Response.Write(dt + responseNum);
            }
            //知识产权成果信息添加，插入数据库
            if (action.Equals("insertintellectualPropertyData"))
            {
                List<string> table_data = new List<string>();
                string intellectualProperty_name = context.Request.Form["intellectualProperty_name"];//知识产权成果信息-产权名称
                table_data.Add(intellectualProperty_name);
                string intellectualProperty_identifier = context.Request.Form["intellectualProperty_identifier"];//知识产权成果信息-产权登记号
                table_data.Add(intellectualProperty_identifier);
                string intellectualProperty_type = context.Request.Form["intellectualProperty_type"];//知识产权成果信息-产权类别
                table_data.Add(intellectualProperty_type);
                string intellectualProperty_personname = context.Request.Form["intellectualProperty_personname"];//知识产权成果信息-权利人
                table_data.Add(intellectualProperty_personname);
                string intellectualProperty_wagenum = context.Request.Form["intellectualProperty_wagenum"];//知识产权成果信息-权利人工资号
                table_data.Add(intellectualProperty_wagenum);
                string intellectualProperty_department = context.Request.Form["intellectualProperty_department"];//知识产权成果信息-权利人单位名称
                table_data.Add(intellectualProperty_personname);
                string intellectualProperty_datetime = context.Request.Form["intellectualProperty_datetime"];//知识产权成果信息-取得时间
                table_data.Add(intellectualProperty_datetime);
                string yearChoose = context.Request.Form["yearChoose"];//知识产权成果信息-年度
                table_data.Add(yearChoose);
                string intellectualProperty_performance_point = GetPerformancePoint(intellectualProperty_type);//知识产权成果信息-论文级别对应的业绩点
                table_data.Add(intellectualProperty_performance_point);
                string intellectualProperty_remarks = context.Request.Form["intellectualProperty_remarks"];//知识产权成果信息-备注
                table_data.Add(intellectualProperty_remarks);
                string str = "insert into intellectualProperty (产权名称,产权登记号,产权类别,权利人,工资号,单位名称,取得时间,年度,业绩点,备注) values(";
                foreach (string s in table_data)
                {
                    str += "'" + s + "'" + ',';
                }
                str = str.Substring(0, str.Length - 1) + ")";
                int responseNum = DbHelper.SqlHelper.OpDbData(str);
                context.Response.Write(responseNum);
            }
            //intellectualProperty知识产权成果信息修改，更新数据库
            if (action.Equals("UpdateintellectualPropertyData"))
            {
                string update_ID = context.Request.Params["update_ID"];
                string intellectualProperty_name = context.Request.Form["intellectualProperty_name"];//知识产权成果信息-产权名称
                string sql_str = "update intellectualProperty set 产权名称 = " + "'" + intellectualProperty_name + "'";
                string intellectualProperty_identifier = context.Request.Form["intellectualProperty_identifier"];//知识产权成果信息-产权登记号
                sql_str += "," + "产权登记号 = " + "'" + intellectualProperty_identifier + "'";
                string intellectualProperty_type = context.Request.Form["intellectualProperty_type"];//知识产权成果信息-产权类别
                sql_str += "," + "产权类别 = " + "'" + intellectualProperty_type + "'";
                string intellectualProperty_personname = context.Request.Form["intellectualProperty_personname"];//知识产权成果信息-权利人
                sql_str += "," + "权利人 = " + "'" + intellectualProperty_personname + "'";
                string intellectualProperty_wagenum = context.Request.Form["intellectualProperty_wagenum"];//知识产权成果信息-工资号
                sql_str += "," + "工资号 = " + "'" + intellectualProperty_wagenum + "'";
                string intellectualProperty_department = context.Request.Form["intellectualProperty_department"];//知识产权成果信息-单位名称
                sql_str += "," + "单位名称 = " + "'" + intellectualProperty_department + "'";
                string intellectualProperty_datetime = context.Request.Form["intellectualProperty_datetime"];//知识产权成果信息-取得时间
                sql_str += "," + "取得时间 = " + "'" + intellectualProperty_datetime + "'";
                string yearChoose = context.Request.Form["yearChoose"];//知识产权成果信息-年度
                sql_str += "," + "年度 = " + "'" + yearChoose + "'";
                string intellectualProperty_performance_point = GetPerformancePoint(intellectualProperty_type);//知识产权成果信息-不同类别对应的业绩点
                sql_str += "," + "业绩点 = " + "'" + intellectualProperty_performance_point + "'";
                string intellectualProperty_remarks = context.Request.Form["intellectualProperty_remarks"];//知识产权成果信息-备注
                sql_str += "," + "备注 = " + "'" + intellectualProperty_remarks + "'" + " where ID = " + update_ID;
                int responseNum = DbHelper.SqlHelper.OpDbData(sql_str);
                context.Response.Write(responseNum);
            }
            //知识产权成果信息查询
            if (action.Equals("SearchintellectualPropertyData"))
            {
                string intellectualProperty_name = context.Request.Form["intellectualProperty_name"];//知识产权成果信息-产权名称
                string intellectualProperty_identifier = context.Request.Form["intellectualProperty_identifier"];//知识产权成果信息-产权登记号
                string intellectualProperty_type = context.Request.Form["intellectualProperty_type"];//知识产权成果信息-产权类别
                string intellectualProperty_personname = context.Request.Form["intellectualProperty_personname"];//知识产权成果信息-权利人
                string intellectualProperty_datetime = context.Request.Form["intellectualProperty_datetime"];//知识产权成果信息-取得时间
                string yearChoose = context.Request.Form["yearChoose"];//知识产权成果信息-年度
                string intellectualProperty_remarks = context.Request.Form["intellectualProperty_remarks"];//知识产权成果信息-备注信息

            }

        }
        //根据用户选择的类别等级获取对应的业绩点
        public string GetPerformancePoint(string type)
        {
            string sql_str = "select 业绩点,项目类别系数 from grade_map where 等级 = " + "'" + type + "'";
            string performance_point = DbHelper.SqlHelper.GetDataSet(sql_str);
            performance_point = performance_point.Substring(1, performance_point.Length - 2);
            JObject jo = (JObject)JsonConvert.DeserializeObject(performance_point);
            string grade_point = (double.Parse(jo["业绩点"].ToString()) * double.Parse(jo["项目类别系数"].ToString())).ToString();
            return grade_point;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}