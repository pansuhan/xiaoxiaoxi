using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;

namespace Yzdxslxy.Src.undergraduateResearch
{
    /// <summary>
    /// undergraduateResearch 的摘要说明
    /// </summary>
    public class undergraduateResearch : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.Params["action"];
            //undergraduateResearch获取数据，数据库数据加载
            if (action.Equals("getData"))
            {
                string sql = "select * from undergraduateResearch";
                string dt = DbHelper.SqlHelper.GetDataSet(sql);
                context.Response.Write(JsonConvert.DeserializeObject(dt));
            }
            //undergraduateResearch中删除数据，将删除的数据插入的删除表中，原始表删除
            if (action.Equals("deleteData"))
            {
                string delete_ID = context.Request.Params["ID"];//从前端传过来需要删除数据的ID，根据ID值进行删除
                //将需要的删除的数据插入到删除表中
                string select_delete_id_sql = string.Format("insert into undergraduateResearch_delete select * from undergraduateResearch where ID = '{0}'", delete_ID.ToString().Trim());
                int responseNum = DbHelper.SqlHelper.OpDbData(select_delete_id_sql);
                //将数据表中的数据删除掉
                string delete_id_sql = string.Format("delete from undergraduateResearch where ID = '{0}'", delete_ID.ToString().Trim());
                int dt = DbHelper.SqlHelper.OpDbData(delete_id_sql);
                context.Response.Write(dt + responseNum);
            }
            //本科生研究工作量信息添加，插入数据库
            if (action.Equals("insertundergraduateResearchData"))
            {
                List<string> table_data = new List<string>();
                string undergraduateResearch_title = context.Request.Form["undergraduateResearch_title"];//本科生研究工作量信息-标题名称
                table_data.Add(undergraduateResearch_title);
                string undergraduateResearch_grade = context.Request.Form["undergraduateResearch_grade"];//本科生研究工作量信息-类别信息
                table_data.Add(undergraduateResearch_grade);
                string undergraduateResearch_journalname = context.Request.Form["undergraduateResearch_journalname"];//本科生研究工作量信息-期刊名称
                table_data.Add(undergraduateResearch_journalname);

                string undergraduateResearch_performance_point = GetPerformancePoint(undergraduateResearch_grade);//论文信息-论文级别对应的业绩点
                table_data.Add(undergraduateResearch_performance_point);

                string author_num = context.Request.Form["author_num"];//本科生研究工作量信息-参与人数量
                table_data.Add(author_num);
                for (int i = 1; i <= int.Parse(author_num); i++)
                {
                    table_data.Add(context.Request.Form["undergraduateResearch_table_name_" + i]);
                    table_data.Add(context.Request.Form["undergraduateResearch_table_department_" + i]);
                    table_data.Add(context.Request.Form["undergraduateResearch_table_wage_number_" + i]);
                    table_data.Add(context.Request.Form["undergraduateResearch_table_bonusratio_" + i]);
                }
                string undergraduateResearch_time = context.Request.Form["undergraduateResearch_time"];//本科生研究工作量信息-取得时间
                table_data.Add(undergraduateResearch_time);
                string yearChoose = context.Request.Form["yearChoose"];//本科生研究工作量信息-年度
                table_data.Add(yearChoose);
                string undergraduateResearch_remarks = context.Request.Form["undergraduateResearch_remarks"];//本科生研究工作量信息-备注
                table_data.Add(undergraduateResearch_remarks);
                string str = "insert into undergraduateResearch (名称,类别,期刊名称,业绩点,参与人数,";
                for (int i = 1; i <= int.Parse(author_num); i++)
                {
                    str += "第" + i + "完成人," + "完成人单位" + i + "," + "工资号" + i + "," + "奖金比例" + i + ",";
                }
                str += "取得时间,年度,备注) values(";
                foreach (string s in table_data)
                {
                    str += "'" + s + "'" + ',';
                }
                str = str.Substring(0, str.Length - 1) + ")";
                int responseNum = DbHelper.SqlHelper.OpDbData(str);
                context.Response.Write(responseNum);
            }

            //undergraduateResearch本科生研究工作量信息修改，更新数据库
            if (action.Equals("UpdateundergraduateResearchData"))
            {
                string update_ID = context.Request.Params["update_ID"];
                string undergraduateResearch_title = context.Request.Form["undergraduateResearch_title"];//本科生研究工作量信息-标题名称
                string sql_str = "update undergraduateResearch set 名称 = " + "'" + undergraduateResearch_title + "'";
                string undergraduateResearch_grade = context.Request.Form["undergraduateResearch_grade"];//本科生研究工作量信息-类别信息
                sql_str += "," + "类别 = " + "'" + undergraduateResearch_grade + "'";
                string undergraduateResearch_journalname = context.Request.Form["undergraduateResearch_journalname"];//本科生研究工作量信息-期刊名称
                sql_str += "," + "期刊名称 = " + "'" + undergraduateResearch_journalname + "'";
                string undergraduateResearch_performance_point = GetPerformancePoint(undergraduateResearch_grade);//本科生研究工作量信息-不同类别对应的业绩点
                sql_str += "," + "业绩点 = " + "'" + undergraduateResearch_performance_point + "'";
                string author_num = context.Request.Form["author_num"];//本科生研究工作量信息-参与人数量
                sql_str += "," + "参与人数 = " + "'" + author_num + "'";
                for (int i = 1; i <= int.Parse(author_num); i++)
                {
                    sql_str += "," + "第" + i + "完成人 = " + "'" + (context.Request.Form["undergraduateResearch_table_name_" + i]) + "'";
                    sql_str += "," + "完成人单位" + i + " = " + "'" + (context.Request.Form["undergraduateResearch_table_department_" + i]) + "'";
                    sql_str += "," + "工资号" + i + " = " + "'" + (context.Request.Form["undergraduateResearch_table_wage_number_" + i]) + "'";
                    sql_str += "," + "奖金比例" + i + " = " + "'" + (context.Request.Form["undergraduateResearch_table_bonusratio_" + i]) + "'";
                }
                string undergraduateResearch_time = context.Request.Form["undergraduateResearch_time"];//本科生研究工作量信息-取得时间
                sql_str += "," + "取得时间 = " + "'" + undergraduateResearch_time + "'";
                string yearChoose = context.Request.Form["yearChoose"];//本科生研究工作量信息-年度
                sql_str += "," + "年度 = " + "'" + yearChoose + "'";
                string undergraduateResearch_remarks = context.Request.Form["undergraduateResearch_remarks"];//本科生研究工作量信息-备注
                sql_str += "," + "备注 = " + "'" + undergraduateResearch_remarks + "'" + " where ID = " + update_ID;
                int responseNum = DbHelper.SqlHelper.OpDbData(sql_str);
                context.Response.Write(responseNum);
            }

            //本科生研究工作量信息查询
            if (action.Equals("SearchundergraduateResearchData"))
            {
                string undergraduateResearch_title = context.Request.Form["undergraduateResearch_title"];//本科生研究工作量信息-标题名称
                string undergraduateResearch_personname = context.Request.Form["undergraduateResearch_personname"];//本科生研究工作量信息-作者名称
                string undergraduateResearch_grade = context.Request.Form["undergraduateResearch_grade"];//本科生研究工作量信息-类别名称
                string undergraduateResearch_time = context.Request.Form["undergraduateResearch_time"];//本科生研究工作量信息-取得时间
                string undergraduateResearch_remarks = context.Request.Form["undergraduateResearch_remarks"];//本科生研究工作量信息-备注信息
                

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