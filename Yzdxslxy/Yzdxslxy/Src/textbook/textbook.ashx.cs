using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
namespace Yzdxslxy.Src.textbook
{
    /// <summary>
    /// textbook 的摘要说明
    /// </summary>
    public class textbook : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.Params["action"];
            //textbook获取数据，数据库数据加载
            if (action.Equals("getData"))
            {
                string sql = "select * from textbook";
                string dt = DbHelper.SqlHelper.GetDataSet(sql);
                context.Response.Write(JsonConvert.DeserializeObject(dt));
            }

            //textbook中删除数据，将删除的数据插入的删除表中，原始表删除
            if (action.Equals("deleteData"))
            {
                string delete_ID = context.Request.Params["ID"];//从前端传过来需要删除数据的ID，根据ID值进行删除
                //将需要的删除的数据插入到删除表中
                string select_delete_id_sql = string.Format("insert into textbook_delete select * from textbook where ID = '{0}'", delete_ID.ToString().Trim());
                int responseNum = DbHelper.SqlHelper.OpDbData(select_delete_id_sql);
                //将数据表中的数据删除掉
                string delete_id_sql = string.Format("delete from textbook where ID = '{0}'", delete_ID.ToString().Trim());
                int dt = DbHelper.SqlHelper.OpDbData(delete_id_sql);
                context.Response.Write(dt + responseNum);
            }

            //textbook数据添加
            if (action.Equals("insertTextbookData"))
            {
                List<string> table_data = new List<string>();
                string textbook_title = context.Request.Form["textbook_title"];//专著教材信息-标题
                table_data.Add(textbook_title);
                string author_num = context.Request.Form["author_num"];//专著教材信息-作者数量
                table_data.Add(author_num);
                for (int i = 1; i <= int.Parse(author_num); i++)
                {
                    table_data.Add(context.Request.Form["textbook_table_name_" + i]);
                    table_data.Add(context.Request.Form["textbook_table_department_" + i]);
                    table_data.Add(context.Request.Form["textbook_table_wage_number_" + i]);
                    table_data.Add(context.Request.Form["textbook_table_bonusratio_" + i]);
                }
                string textbook_publishing_house = context.Request.Form["textbook_publishing_house"];//专著教材信息-出版社
                table_data.Add(textbook_publishing_house);
                string textbook_date = context.Request.Form["textbook_date"];//专著教材信息-出版时间
                table_data.Add(textbook_date);
                string textbook_type = context.Request.Form["textbook_type"];//专著教材信息-专著教材级别
                table_data.Add(textbook_type);
                string textbook_performance_point = GetPerformancePoint(textbook_type);//专著教材信息-专著教材级别对应的业绩点
                table_data.Add(textbook_performance_point);
                string textbook_remarks = context.Request.Form["textbook_remarks"];//专著教材信息-备注
                table_data.Add(textbook_remarks);

                string str = "insert into textbook (论著名称,参与人数,";
                for (int i = 1; i <= int.Parse(author_num); i++)
                {
                    str += "第" + i + "完成人," + "完成人单位" + i + "," + "工资号" + i + "," + "奖金比例" + i + ",";
                }
                str += "出版社,出版时间,论著类别,业绩点,备注) values(";
                foreach (string s in table_data)
                {
                    str += "'" + s + "'" + ',';
                }
                str = str.Substring(0, str.Length - 1) + ")";
                int responseNum = DbHelper.SqlHelper.OpDbData(str);
                context.Response.Write(responseNum);
            }


            //textbook论著工作量信息修改，更新数据库
            if (action.Equals("UpdateTextbookData"))
            {
                string update_ID = context.Request.Params["update_ID"];
                string textbook_title = context.Request.Form["textbook_title"];//论著工作量信息-论著名称
                string sql_str = "update textbook set 论著名称 = " + "'" + textbook_title + "'";
                string author_num = context.Request.Form["author_num"];//论著工作量信息-参与人数量
                sql_str += "," + "参与人数 = " + "'" + author_num + "'";
                for (int i = 1; i <= int.Parse(author_num); i++)
                {
                    sql_str += "," + "第" + i + "完成人 = " + "'" + (context.Request.Form["textbook_table_name_" + i]) + "'";
                    sql_str += "," + "完成人单位" + i + " = " + "'" + (context.Request.Form["textbook_table_department_" + i]) + "'";
                    sql_str += "," + "工资号" + i + " = " + "'" + (context.Request.Form["textbook_table_wage_number_" + i]) + "'";
                    sql_str += "," + "奖金比例" + i + " = " + "'" + (context.Request.Form["textbook_table_bonusratio_" + i]) + "'";
                }
                string textbook_publishing_house = context.Request.Form["textbook_publishing_house"];//论著工作量信息-出版社
                sql_str += "," + "出版社 = " + "'" + textbook_publishing_house + "'";
                string textbook_date = context.Request.Form["textbook_date"];//论著工作量信息-出版时间
                sql_str += "," + "出版时间 = " + "'" + textbook_date + "'";
                string textbook_type = context.Request.Form["textbook_type"];//论著工作量信息-论著类别
                sql_str += "," + "论著类别 = " + "'" + textbook_type + "'";
                string textbook_performance_point = GetPerformancePoint(textbook_type);//论著工作量信息-不同类别对应的业绩点
                sql_str += "," + "业绩点 = " + "'" + textbook_performance_point + "'";
                string yearChoose = context.Request.Form["yearChoose"];//论著工作量信息-年度
                sql_str += "," + "年度 = " + "'" + yearChoose + "'";
                string textbook_remarks = context.Request.Form["textbook_remarks"];//论著工作量信息-备注
                sql_str += "," + "备注 = " + "'" + textbook_remarks + "'" + " where ID = " + update_ID;
                int responseNum = DbHelper.SqlHelper.OpDbData(sql_str);
                context.Response.Write(responseNum);
            }

            //论著工作量信息查询
            if (action.Equals("SearchtextbookData"))
            {
                string textbook_title = context.Request.Form["textbook_title"];//论著工作量信息查询-标题名称
                string textbook_personname = context.Request.Form["textbook_personname"];//论著工作量信息查询-作者名称
                string textbook_time = context.Request.Form["textbook_time"];//论著工作量信息查询-类别名称
                string textbook_remarks = context.Request.Form["textbook_remarks"];//论著工作量信息查询-取得时间
                context.Response.Write("查询待完善");

            }
            
        }

        //根据用户选择的专著教材类别获取对应的业绩点
        public string GetPerformancePoint(string type)
        {
            string sql_str = "select 业绩点 from grade_map where 等级 = " + "'" + type + "'";
            string performance_point = DbHelper.SqlHelper.GetDataSet(sql_str);
            performance_point = performance_point.Substring(1, performance_point.Length - 2);
            JObject jo = (JObject)JsonConvert.DeserializeObject(performance_point);
            string grade_point = jo["业绩点"].ToString();
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