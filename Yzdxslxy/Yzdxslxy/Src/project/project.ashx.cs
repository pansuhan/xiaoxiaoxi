using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;

namespace Yzdxslxy.Src.project
{
    /// <summary>
    /// project 的摘要说明
    /// </summary>
    public class project : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.Params["action"];
            //project获取数据，数据库数据加载
            if (action.Equals("getData"))
            {
                string sql = "select * from project";
                string dt = DbHelper.SqlHelper.GetDataSet(sql);
                context.Response.Write(JsonConvert.DeserializeObject(dt));
            }

            //project中删除数据，将删除的数据插入的删除表中，原始表删除
            if (action.Equals("deleteData"))
            {
                string delete_ID = context.Request.Params["ID"];//从前端传过来需要删除数据的ID，根据ID值进行删除
                //将需要的删除的数据插入到删除表中
                string select_delete_id_sql = string.Format("insert into project_delete select * from project where ID = '{0}'", delete_ID.ToString().Trim());
                int responseNum = DbHelper.SqlHelper.OpDbData(select_delete_id_sql);
                //将数据表中的数据删除掉
                string delete_id_sql = string.Format("delete from project where ID = '{0}'", delete_ID.ToString().Trim());
                int dt = DbHelper.SqlHelper.OpDbData(delete_id_sql);
                context.Response.Write(dt + responseNum);
            }

            //科研项目工作量信息添加，插入数据库
            if (action.Equals("insertprojectData"))
            {
                List<string> table_data = new List<string>();
                string project_name = context.Request.Form["project_name"];//科研项目工作量信息-项目名称
                table_data.Add(project_name);
                string project_grade = context.Request.Form["project_grade"];//科研项目工作量信息-类别信息
                table_data.Add(project_grade);
                string project_leadersnum = context.Request.Form["project_leadersnum"];//科研项目工作量信息-负责人数量
                table_data.Add(project_leadersnum);
                string project_leaders_department1 = context.Request.Form["project_leaders_department1"];
                for (int i = 1; i <= int.Parse(project_leadersnum); i++)
                {
                    table_data.Add(context.Request.Form["project_leaders_name" + i]);
                    table_data.Add(context.Request.Form["project_leaders_department" + i]);
                    table_data.Add(context.Request.Form["project_leaders_wagenum" + i]);
                    table_data.Add(context.Request.Form["project_leaders_bonusratio" + i]);
                }
                string project_participantnum = context.Request.Form["project_participantnum"];//科研项目工作量信息-参与人数量
                table_data.Add(project_participantnum);
                for (int i = 1; i <= int.Parse(project_participantnum); i++)
                {
                    table_data.Add(context.Request.Form["project_participant_name" + i]);
                    table_data.Add(context.Request.Form["project_participant_department" + i]);
                    table_data.Add(context.Request.Form["project_participant_wagenum" + i]);
                    table_data.Add(context.Request.Form["project_participant_bonusratio" + i]);
                }
                string project_time = context.Request.Form["project_time"];//科研项目工作量信息-立项时间
                table_data.Add(project_time);
                string project_starttime = context.Request.Form["project_starttime"];//科研项目工作量信息-起止时间
                table_data.Add(project_starttime);
                string project_endtime = context.Request.Form["project_endtime"];//科研项目工作量信息-起止时间
                table_data.Add(project_endtime);
                string yearChoose = context.Request.Form["yearChoose"];//科研项目工作量信息-年度
                table_data.Add(yearChoose);
                string project_totalfunds = context.Request.Form["project_totalfunds"];//科研项目工作量信息-项目总经费
                table_data.Add(project_totalfunds);
                string project_finishedfunds = context.Request.Form["project_finishedfunds"];//科研项目工作量信息-项目本年度到账经费
                table_data.Add(project_finishedfunds);
                string project_identifier = context.Request.Form["project_identifier"];//科研项目工作量信息-项目批准编号
                table_data.Add(project_identifier);
                string project_performance_point = GetPerformancePoint(project_leaders_department1,project_grade, project_finishedfunds);//科研项目工作量信息-项目级别对应的业绩点
                table_data.Add(project_performance_point);
                string project_remarks = context.Request.Form["project_remarks"];//科研项目工作量信息-备注
                table_data.Add(project_remarks);
                string str = "insert into project (项目名称,项目级别,负责人人数,";
                for (int i = 1; i <= int.Parse(project_leadersnum); i++)
                {
                    str += "负责人姓名" + i + "," + "负责人单位" + i + "," + "负责人工资号" + i + "," + "负责人奖金比例" + i + ",";
                }
                str += "参与人人数,";
                for (int i = 1; i <= int.Parse(project_participantnum); i++)
                {
                    str += "参与人姓名" + i + "," + "参与人单位" + i + "," + "参与人工资号" + i + "," + "参与人奖金比例" + i + ",";
                }
                str += "立项时间,起时间,止时间,年度,总经费,到账经费,批准编号,业绩点,备注) values(";
                foreach (string s in table_data)
                {
                    str += "'" + s + "'" + ',';
                }
                str = str.Substring(0, str.Length - 1) + ")";
                int responseNum = DbHelper.SqlHelper.OpDbData(str);
                context.Response.Write(responseNum);
            }

            //project科研项目工作量信息修改，更新数据库
            if (action.Equals("UpdateprojectData"))
            {
                string update_ID = context.Request.Params["update_ID"];
                string project_name = context.Request.Form["project_name"];//科研项目工作量信息-项目名称
                string sql_str = "update project set 项目名称 = " + "'" + project_name + "'";
                string project_grade = context.Request.Form["project_grade"];//科研项目工作量信息-项目级别
                sql_str += "," + "项目级别 = " + "'" + project_grade + "'";
                string project_leadersnum = context.Request.Form["project_leadersnum"];//科研项目工作量信息-负责人人数
                sql_str += "," + "负责人人数 = " + "'" + project_leadersnum + "'";
                for (int i = 1; i <= int.Parse(project_leadersnum); i++)
                {
                    sql_str += "," + "负责人姓名" + i + " = " + "'" + (context.Request.Form["project_leaders_name" + i]) + "'";
                    sql_str += "," + "负责人单位" + i + " = " + "'" + (context.Request.Form["project_leaders_department" + i]) + "'";
                    sql_str += "," + "负责人工资号" + i + " = " + "'" + (context.Request.Form["project_leaders_wagenum" + i]) + "'";
                    sql_str += "," + "负责人奖金比例" + i + " = " + "'" + (context.Request.Form["project_leaders_bonusratio" + i]) + "'";
                }
                string project_participantnum = context.Request.Form["project_participantnum"];//科研项目工作量信息-参与人人数
                sql_str += "," + "参与人人数 = " + "'" + project_participantnum + "'";
                for (int i = 1; i <= int.Parse(project_participantnum); i++)
                {
                    sql_str += "," + "参与人姓名" + i + " = " + "'" + (context.Request.Form["project_participant_name" + i]) + "'";
                    sql_str += "," + "参与人单位" + i + " = " + "'" + (context.Request.Form["project_participant_department" + i]) + "'";
                    sql_str += "," + "参与人工资号" + i + " = " + "'" + (context.Request.Form["project_participant_wagenum" + i]) + "'";
                    sql_str += "," + "参与人奖金比例" + i + " = " + "'" + (context.Request.Form["project_participant_bonusratio" + i]) + "'";
                }
                string project_time = context.Request.Form["project_time"];//科研项目工作量信息-立项时间
                sql_str += "," + "立项时间 = " + "'" + project_time + "'";
                string project_starttime = context.Request.Form["project_starttime"];//科研项目工作量信息-起时间
                sql_str += "," + "起时间 = " + "'" + project_starttime + "'";
                string project_endtime = context.Request.Form["project_endtime"];//科研项目工作量信息-止时间
                sql_str += "," + "止时间 = " + "'" + project_endtime + "'";
                string yearChoose = context.Request.Form["yearChoose"];//科研项目工作量信息-年度
                sql_str += "," + "年度 = " + "'" + yearChoose + "'";

                string project_totalfunds = context.Request.Form["project_totalfunds"];//科研项目工作量信息-总经费
                sql_str += "," + "总经费 = " + "'" + project_totalfunds + "'";
                string project_finishedfunds = context.Request.Form["project_finishedfunds"];//科研项目工作量信息-到账经费
                sql_str += "," + "到账经费 = " + "'" + project_finishedfunds + "'";
                string project_identifier = context.Request.Form["project_identifier"];//科研项目工作量信息-批准编号
                sql_str += "," + "批准编号 = " + "'" + project_identifier + "'";
                //负责人单位名称，用于判断扬州大学是否为第一完成单位
                string project_leaders_department1 = context.Request.Form["project_leaders_department1"];
                string project_performance_point = GetPerformancePoint(project_leaders_department1, project_grade, project_finishedfunds);//科研项目工作量信息-项目级别对应的业绩点
                sql_str += "," + "业绩点 = " + "'" + project_performance_point + "'";
                string project_remarks = context.Request.Form["project_remarks"];//科研项目工作量信息-备注
                sql_str += "," + "备注 = " + "'" + project_remarks + "'" + " where ID = " + update_ID;
                int responseNum = DbHelper.SqlHelper.OpDbData(sql_str);
                context.Response.Write(responseNum);
            }

            //科研项目工作量信息查询
            if (action.Equals("SearchprojectData"))
            {
                string project_title = context.Request.Form["project_title"];//科研项目工作量信息-项目名称
                string project_personname = context.Request.Form["project_personname"];//科研项目工作量信息-负责人名字
                string project_grade = context.Request.Form["project_grade"];//科研项目工作量信息-项目级别
                string project_time = context.Request.Form["project_time"];//科研项目工作量信息-立项时间
                string project_remarks = context.Request.Form["project_remarks"];//科研项目工作量信息-备注信息


            }

        }


        //根据用户选择的类别等级获取对应的业绩点
        public string GetPerformancePoint(string project_leaders_department1,string type,string project_finishedfunds)
        {
            
            string sql_str = "select 业绩点,项目类别系数 from grade_map where 等级 = " + "'" + type + "'";
            string performance_point = DbHelper.SqlHelper.GetDataSet(sql_str);
            performance_point = performance_point.Substring(1, performance_point.Length - 2);
            JObject jo = (JObject)JsonConvert.DeserializeObject(performance_point);
            string grade_point = "";
            if (project_leaders_department1 != "扬州大学")
            {
                grade_point = (double.Parse(jo["项目类别系数"].ToString()) * double.Parse(project_finishedfunds)).ToString();
            }
            else {
                grade_point = (double.Parse(jo["业绩点"].ToString()) + double.Parse(jo["项目类别系数"].ToString()) * double.Parse(project_finishedfunds)).ToString();
            }
            
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