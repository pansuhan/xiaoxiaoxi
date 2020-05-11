using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using System.IO;


namespace Yzdxslxy.Src.prizewinning
{
    /// <summary>
    /// prizewinning 的摘要说明
    /// </summary>
    public class prizewinning : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.Params["action"];
            //prizewinning获取数据，数据库数据加载
            if (action.Equals("getData"))
            {
                string sql = "select * from prizewinning";
                string dt = DbHelper.SqlHelper.GetDataSet(sql);
                context.Response.Write(JsonConvert.DeserializeObject(dt));
            }
             //prizewinning添加数据，数据库数据插入
            if (action.Equals("insertprizewinningData"))
            {

                string prizewinning_file0 = context.Request.Form["file"];
                //string prizewinningInfo_table_file1 = context.Request.Form["prizewinningInfo_table_file1"];
                //Stream s = System.Web.HttpContext.Current.Request.InputStream;
                //byte[] data = new byte[s.Length];
                //s.Read(data, 0, (int)s.Length);
                //string jsonData = Encoding.UTF8.GetString(data);
                //JObject jo = (JObject)JsonConvert.DeserializeObject(jsonData);
                //Console.WriteLine(jo["file0"]);

                //Encoding.UTF8.GetString(b);

                context.Response.Write("11");
            }
            
            
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