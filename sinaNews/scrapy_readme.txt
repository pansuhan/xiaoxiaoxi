1、scrapy project XXX
2、scrapy genspider XXX "http://www.xxx.com"
3、编写items.py文件，明确需要提取的数据
4、编写spiders.py文件，也就是编写爬虫文件，parse解析，处理请求响应，以及提取数据，数据返回管道处理，请求返回调度器继续请求(yield item,yield request)
5、编写pipelines.py,编写管道文件，处理spider返回的item数据，比如本地持久化，存储数据库等
6、编写settings.py，启动管道组件，以及其他相关设置
7、执行爬虫
scrapy crawl XXX
