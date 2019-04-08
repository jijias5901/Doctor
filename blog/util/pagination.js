/*
page:请求页码
model:数据模型
query:查询条件
projection:投影
sort:排序
*/
async function pagination(options){
	/*
	分页:
	约定:每一页显示 2 条 limit(2)
	
	第 1 页 跳过 0 条 skip(0)
	第 2 页 跳过 2 条 skip(2)
	第 3 页 跳过 4 条 skip(4)
	
	第 page 页 跳过 (page -1) * limit 条 skip((page -1) * limit)
	*/
	let { page,model,query,projection,sort } = options;
	const limit = 2;
	page = parseInt(page);

	if(isNaN(page)){
		page = 1;
	}
	if(page == 0){
		page = 1;
	}

	const count = await model.countDocuments(query);
	//计算总页数
	const pages = Math.ceil(count / limit);
	if(page > pages){
		page = pages;
	}
	if(pages == 0){
		page = 1;
	}
	//生成页码数组
	const list = [];
	for(let i = 1;i<=pages;i++){
		list.push(i);
	}

	//跳过条数
	const skip = (page -1) * limit;

	const docs = await model.find(query,projection).sort(sort).skip(skip).limit(limit);

	return {
		docs,
		page,
		list,
		pages
	}
}


module.exports = pagination;