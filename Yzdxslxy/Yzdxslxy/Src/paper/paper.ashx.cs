using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;

namespace Yzdxslxy.Src.paper
{
    /// <summary>
    /// paper 的摘要说明
    /// </summary>
    public class paper : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.Params["action"];
            //共享：根据用户名获取用户的工资号
            if (action.Equals("get_author_num"))
            {
                string author_name = context.Request.Params["name"];//获取作者姓名
                string get_author_num_sql = string.Format("select 单位名称,工资号 from staff where 姓名 = '{0}'", author_name.ToString().Trim());
                string dt = DbHelper.SqlHelper.GetDataSet(get_author_num_sql);//根据姓名查询数据库，返回对应的工资号
                context.Response.Write(JsonConvert.DeserializeObject(dt));

            }

            //共享：获取所有类别信息
            if (action.Equals("get_grade"))
            {
                string grade_type = context.Request.Params["grade_type"];//获取类别信息
                string sql = string.Format("select 等级,业绩点 from grade_map where 所属类别 = '{0}'", grade_type.ToString().Trim());
                string dt = DbHelper.SqlHelper.GetDataSet(sql);
                context.Response.Write(JsonConvert.DeserializeObject(dt));
            }

            //paper获取数据，数据库数据加载，分页显示
            if (action.Equals("getData"))
            {
                int rows = Convert.ToInt32(context.Request["rows"]);//选择每页的数量
                int page = Convert.ToInt32(context.Request["page"]);//当前页数
                string sql = string.Format("select top {0} * from paper where ID not in(select top (({1}-1) *{0})  ID from paper )", rows, page);
                string dt = DbHelper.SqlHelper.GetDataSet(sql);
                context.Response.Write("{" + string.Format("\"total\":{0},\"rows\":{1}", GetCount(), JsonConvert.DeserializeObject(dt)) + "}");

            }


            //paper中删除数据，将删除的数据插入的删除表中，原始表删除
            if (action.Equals("deleteData"))
            {
                string delete_ID = context.Request.Params["ID"];//从前端传过来需要删除数据的ID，根据ID值进行删除
                //将需要的删除的数据插入到删除表中
                string select_delete_id_sql = string.Format("insert into paper_delete select * from paper where ID = '{0}'", delete_ID.ToString().Trim());
                int responseNum = DbHelper.SqlHelper.OpDbData(select_delete_id_sql);
                //将数据表中的数据删除掉
                string delete_id_sql = string.Format("delete from paper where ID = '{0}'", delete_ID.ToString().Trim());
                int dt = DbHelper.SqlHelper.OpDbData(delete_id_sql);
                context.Response.Write(dt + responseNum);
            }

            //paper论文信息添加，插入数据库
            if (action.Equals("insertPaperData"))
            {
                List<string> table_data = new List<string>();
                string paper_title = context.Request.Form["paper_title"];//论文信息-论文标题
                table_data.Add(paper_title);
                string author_num = context.Request.Form["author_num"];//论文信息-作者数量
                table_data.Add(author_num);
                for (int i = 1; i <= int.Parse(author_num); i++)
                {
                    table_data.Add(context.Request.Form["paper_table_name_" + i]);
                    table_data.Add(context.Request.Form["paper_table_department_" + i]);
                    table_data.Add(context.Request.Form["paper_table_wage_number_" + i]);
                    table_data.Add(context.Request.Form["paper_table_bonusratio_" + i]);
                }
                string paper_journal = context.Request.Form["paper_journal"];//论文信息-发表刊物
                table_data.Add(paper_journal);
                string paper_date = context.Request.Form["paper_date"];//论文信息-发表时间
                table_data.Add(paper_date);
                string paper_journal_vol = context.Request.Form["paper_journal_vol"];//论文信息-发表刊物卷期
                table_data.Add(paper_journal_vol);
                string paper_startpage = context.Request.Form["paper_startpage"];//论文信息-起页码
                table_data.Add(paper_startpage);
                string paper_endpage = context.Request.Form["paper_endpage"];//论文信息-止页码
                table_data.Add(paper_endpage);
                string paper_grade = context.Request.Form["paper_grade"];//论文信息-论文级别
                table_data.Add(paper_grade);
                string paper_departmentinfo = context.Request.Form["paper_departmentinfo"];//论文信息-单位信息
                table_data.Add(paper_departmentinfo);
                string paper_performance_point = GetPerformancePoint(paper_departmentinfo,paper_grade);//论文信息-论文级别对应的业绩点
                table_data.Add(paper_performance_point);
                string yearChoose = context.Request.Form["yearChoose"];//论文信息-备注
                table_data.Add(yearChoose);
                string paper_remarks = context.Request.Form["paper_remarks"];//论文信息-备注
                table_data.Add(paper_remarks);
                string str = "insert into paper (论文名称,作者人数,";
                for (int i = 1; i <= int.Parse(author_num); i++)
                {
                    str += "第" + i + "完成人," + "完成人单位" + i + "," + "工资号" + i + "," + "奖金比例" + i + ",";
                }
                str += "发表刊物,发表时间,发表刊物卷期,起页码,止页码,收录级别,单位信息,业绩点,年度,备注) values(";
                foreach (string s in table_data)
                {
                    str +="'"+s+"'"+',';
                }
                str = str.Substring(0, str.Length - 1) + ")";
                int responseNum = DbHelper.SqlHelper.OpDbData(str);
                context.Response.Write(responseNum);
            }


             //paper论文信息修改，更新数据库
            if (action.Equals("UpdatePaperData")) {
                string update_ID = context.Request.Params["update_ID"];
                string paper_title = context.Request.Form["paper_title"].Trim();//论文信息-论文标题
                string sql_str = "update paper set 论文名称 = " + "'" + paper_title + "\',";
                string author_num = context.Request.Form["author_num"].Trim();//论文信息-作者数量
                sql_str += "作者人数 = " + "'" + author_num + "\',";
                for (int i = 1; i <= int.Parse(author_num); i++)
                {
                    sql_str += "第" + i + "完成人 = " + "'" + (context.Request.Form["paper_table_name_" + i].Trim()) + "\',";
                    sql_str += "完成人单位" + i + " = " + "'" + (context.Request.Form["paper_table_department_" + i].Trim()) + "\',";
                    sql_str += "工资号" + i + " = " + "'" + (context.Request.Form["paper_table_wage_number_" + i].Trim()) + "\',";
                    sql_str += "奖金比例" + i + " = " + "'" + (context.Request.Form["paper_table_bonusratio_" + i].Trim()) + "\',";
                }
                string paper_journal = context.Request.Form["paper_journal"].Trim();//论文信息-发表刊物
                sql_str += "发表刊物 = " +"'" + paper_journal + "\',";
                string paper_date = context.Request.Form["paper_date"].Trim();//论文信息-发表时间
                sql_str += "发表时间 = " + "'" + paper_date + "\',";
                string paper_journal_vol = context.Request.Form["paper_journal_vol"].Trim();//论文信息-发表刊物卷期
                sql_str += "发表刊物卷期 = " + "'" + paper_journal_vol + "\',";
                string paper_startpage = context.Request.Form["paper_startpage"].Trim();//论文信息-起页码
                sql_str += "起页码 = " + "'" + paper_startpage + "\',";
                string paper_endpage = context.Request.Form["paper_endpage"].Trim();//论文信息-止页码
                sql_str += "止页码 = " + "'" + paper_endpage + "\',";
                string paper_grade = context.Request.Form["paper_grade"].Trim();//论文信息-论文级别
                sql_str += "收录级别 = " + "'" + paper_grade + "\',";
                string paper_departmentinfo = context.Request.Form["paper_departmentinfo"].Trim();//论文信息-单位信息
                sql_str += "单位信息 = " + "'" + paper_departmentinfo + "\',";
                string paper_performance_point = GetPerformancePoint(paper_departmentinfo,paper_grade);//论文信息-论文级别对应的业绩点
                sql_str += "业绩点 = " + "'" + paper_performance_point + "\',";
                string yearChoose = context.Request.Form["yearChoose"].Trim();//论文信息-年度
                sql_str += "年度 = " + "'" + yearChoose + "\',";
                string paper_remarks = context.Request.Form["paper_remarks"].Trim();//论文信息-备注
                sql_str += "备注 = " + "'" + paper_remarks + "\'" + " where ID = " + update_ID;
                int responseNum = DbHelper.SqlHelper.OpDbData(sql_str);
                context.Response.Write(responseNum);
            }

            //paper论文信息查询，根据提交过来的表单信息进行数据库信息查询
            if (action.Equals("searchPaperData"))
            {
                string search_paper_title = context.Request.Form["search_paper_title"];//论文信息-论文标题
                string search_paper_author = context.Request.Form["search_paper_author"];//论文信息-作者姓名
                string search_paper_wagenumber = context.Request.Form["search_paper_wagenumber"];//论文信息-作者工资号
                string search_paper_journal = context.Request.Form["search_paper_journal"];//论文信息-论文发表期刊
                string search_paper_date = context.Request.Form["search_paper_date"];//论文信息-论文发表时间
                string search_paper_grade = context.Request.Form["search_paper_grade"];//论文信息-论文期刊等级
                string search_paper_remarks = context.Request.Form["search_paper_remarks"];//论文信息-备注信息
                StringBuilder sql = new StringBuilder("select * from paper");
                List<string> wheres = new List<string>();
                if (search_paper_title != "") wheres.Add("论文名称 = " + "'" + search_paper_title + "'");


                if (search_paper_author != "") wheres.Add("(第1完成人 = " + "'" + search_paper_author + "'" + " or 第2完成人 = " + "'" +
                   search_paper_author + "'" + " or 第3完成人 = " + "'" + search_paper_author + "'" +
                   " or 第4完成人 = " + "'" + search_paper_author + "'" + " or 第5完成人 = " + "'" + search_paper_author + "'" + " or 第6完成人 = " + "'" + search_paper_author + "'" +
                   " or 第7完成人 = " + "'" + search_paper_author + "'" + " or 第8完成人 = " + "'" + search_paper_author + "'" + " or 第9完成人 = " + "'" + search_paper_author + "'" +
                   " or 第10完成人 = " + "'" + search_paper_author + "'" + ")");

                if (search_paper_wagenumber != "") wheres.Add("(工资号1 = " + "'" + search_paper_wagenumber + "'" + " or 工资号2 = " + "'" +
                   search_paper_wagenumber + "'" + " or 工资号3 = " + "'" + search_paper_wagenumber + "'" +
                   " or 工资号4 = " + "'" + search_paper_wagenumber + "'" + " or 工资号5 = " + "'" + search_paper_wagenumber + "'" + " or 工资号6 = " + "'" + search_paper_wagenumber + "'" +
                   " or 工资号7 = " + "'" + search_paper_wagenumber + "'" + " or 工资号8 = " + "'" + search_paper_wagenumber + "'" + " or 工资号9 = " + "'" + search_paper_wagenumber + "'" +
                   " or 工资号10 = " + "'" + search_paper_wagenumber + "'" + ")");

                if (search_paper_journal != "") wheres.Add("发表刊物=" + "'" + search_paper_journal + "'");

                if (search_paper_date != "") wheres.Add("发表时间=" + "'" + search_paper_date + "'");

                if (search_paper_grade != "") wheres.Add("收录级别=" + "'" + search_paper_grade + "'");

                if (search_paper_remarks != "") wheres.Add("备注=" + "'" + search_paper_grade + "'");

                if (wheres.Count > 0) {
                    string and = string.Join("and", wheres.ToArray());
                    sql.Append(" where " + and);
                }
                string dt = DbHelper.SqlHelper.GetDataSet(sql.ToString());
                context.Response.Write(JsonConvert.DeserializeObject(dt));
            }

        }
        //获取对应数据表中的总记录数
        public int GetCount()
        {
            string sql = string.Format("select COUNT(ID)  from paper");
            return Convert.ToInt32(DbHelper.SqlHelper.CountSum(sql));

        }


        //根据用户选择的论文收录等级获取对应的业绩点
        public string GetPerformancePoint(string paper_departmentinfo,string type)
        {
            string sql_str = "select 业绩点 from grade_map where 等级 = " + "'" + type + "'";
            string performance_point = DbHelper.SqlHelper.GetDataSet(sql_str);
            performance_point = performance_point.Substring(1, performance_point.Length - 2);
            JObject jo = (JObject)JsonConvert.DeserializeObject(performance_point);
            float grade_point = Convert.ToSingle(jo["业绩点"].ToString());
            switch (paper_departmentinfo)
            {
                case "扬州大学为第一通讯作者单位":
                    grade_point = grade_point * 1;
                    break;
                case "扬州大学为第一作者单位":
                    grade_point = grade_point / 2;
                    break;
                case "扬州大学为其他合作单位":
                    grade_point = grade_point * 1;
                    break;
                case "通讯作者为外单位":
                    grade_point = grade_point * 1;
                    break;
            }
            return grade_point.ToString();
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