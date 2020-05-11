using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
namespace Yzdxslxy.Src.workload
{
    /// <summary>
    /// workload 的摘要说明
    /// </summary>
    public class workload : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.Params["action"];
            if (action.Equals("getWorkload"))
            {
                //string sql = "";
                //string dt = DbHelper.SqlHelper.GetDataSet(sql);//根据工资号进行工作量汇总，多表查询
                //context.Response.Write(JsonConvert.DeserializeObject(dt));
                context.Response.Write("还未做完");

            }
            //获取类别等级信息
            if (action.Equals("get_type_data"))
            {
                int rows = Convert.ToInt32(context.Request["rows"]);//选择每页的数量
                int page = Convert.ToInt32(context.Request["page"]);//当前页数
                string sql = string.Format("select top {0} * from grade_map where ID not in(select top (({1}-1) *{0})  ID from grade_map )", rows, page);
                string dt = DbHelper.SqlHelper.GetDataSet(sql);
                context.Response.Write("{" + string.Format("\"total\":{0},\"rows\":{1}", GetCount(), JsonConvert.DeserializeObject(dt)) + "}");
            }

            //删除等级类别信息
            if (action.Equals("deleteType"))
            {
                string delete_ID = context.Request.Params["ID"];//从前端传过来需要删除数据的ID，根据ID值进行删除
                //将数据表中的数据删除掉
                string delete_id_sql = string.Format("delete from grade_map where ID = '{0}'", delete_ID.ToString().Trim());
                int dt = DbHelper.SqlHelper.OpDbData(delete_id_sql);
                context.Response.Write(dt);
            }

            //添加新的类别信息，insert
            if (action.Equals("insert_type"))
            {
                List<string> data = new List<string>();
                string add_name = context.Request.Form["add_name"];//等级名称
                data.Add(add_name);
                string add_point = context.Request.Form["add_point"];//业绩点
                data.Add(add_point);
                string add_ratio = context.Request.Form["add_ratio"];//项目类别系数
                data.Add(add_ratio);
                string add_type = context.Request.Form["add_type"];//添加类别信息
                data.Add(add_type);
                string sql = "insert into grade_map (等级,业绩点,项目类别系数,所属类别) values(";
                foreach (string s in data)
                {
                    sql += "'" + s + "'" + ',';
                }
                sql = sql.Substring(0, sql.Length - 1) + ")";
                int responseNum = DbHelper.SqlHelper.OpDbData(sql);
                context.Response.Write(responseNum);
            }

            //修改类别信息，update
            if (action.Equals("update_type"))
            {
                string update_ID = context.Request.Params["update_ID"];
                string update_name = context.Request.Form["update_name"];//等级类别修改-等级名称
                string sql_str = "update grade_map set 等级 = " + "'" + update_name + "'";
                string update_point = context.Request.Form["update_point"];//等级类别修改-业绩点
                sql_str += "," + "业绩点 = " + "'" + update_point + "'";
                string update_ratio = context.Request.Form["update_ratio"];//等级类别修改-项目类别系数
                sql_str += "," + "项目类别系数 = " + "'" + update_ratio + "'";
                string update_type = context.Request.Form["update_type"];//等级类别修改-所属类别
                sql_str += "," + "所属类别 = " + "'" + update_type + "'" + " where ID = " + update_ID;
                int responseNum = DbHelper.SqlHelper.OpDbData(sql_str);
                context.Response.Write(responseNum);

            }

        }
        //获取对应数据表中的总记录数
        public int GetCount()
        {
            string sql = string.Format("select COUNT(ID)  from grade_map");
            return Convert.ToInt32(DbHelper.SqlHelper.CountSum(sql));

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