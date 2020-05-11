using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Web.Configuration;
using Newtonsoft.Json;

namespace Yzdxslxy.DbHelper
{
    public class SqlHelper
    {

        public static int CountSum(string sql)
        {
             //创建数据库操作引擎实例
            try
            {
                string strConnection = WebConfigurationManager.AppSettings["DatabaseConnectionString"];
                if (strConnection != null && strConnection != string.Empty)
                {
                SqlConnection conn = new SqlConnection(strConnection);　　//实例化SqlConnection对象
                conn.Open();　　　　//打开数据库连接
                SqlCommand cmd = new SqlCommand(sql, conn);
                var result = cmd.ExecuteScalar();
                return Convert.ToInt32(result); 　　//返回DataSet
            }
            else
                {
                    throw new Exception();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        
        }

        // 数据库获取数据
        public static string GetDataSet(string sql)
        {            
            //创建数据库操作引擎实例
            try
            {
                string strConnection = WebConfigurationManager.AppSettings["DatabaseConnectionString"];
                if (strConnection != null && strConnection != string.Empty)
                {
                SqlConnection conn = new SqlConnection(strConnection);　　//实例化SqlConnection对象
                DataSet ds = new DataSet();　　//实例化DataSet
                conn.Open();　　　　//打开数据库连接
                SqlDataAdapter sda = new SqlDataAdapter(sql, conn); 　　//sql是传递过来的SQL语句
                sda.Fill(ds);　　//填充DataSet
                string result = JsonConvert.SerializeObject(ds.Tables[0], Formatting.Indented);//查询结果转json
                return result; 　　//返回DataSet
            }
            else
                {
                    throw new Exception();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }



        // 数据库插入数据
        public static int OpDbData(string sql)
        {
            //创建数据库操作引擎实例
            try
            {
                string strConnection = WebConfigurationManager.AppSettings["DatabaseConnectionString"];
                if (strConnection != null && strConnection != string.Empty)
                {
                    SqlConnection conn = new SqlConnection(strConnection);　　//实例化SqlConnection对象
                    DataSet ds = new DataSet();　　//实例化DataSet
                    conn.Open();　　　　//打开数据库连接
                    SqlDataAdapter sda = new SqlDataAdapter(sql, conn); 　　//sql是传递过来的SQL语句
                    
                    SqlCommand sc = new SqlCommand(sql, conn); 　　//sql是传递过来的SQL语句
                    int responseNum = sc.ExecuteNonQuery();
                    return responseNum;

                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }


    }
}