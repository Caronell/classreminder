var data = [
{
	"name": "离散结构与形式语言",
	"place": "综合楼804"
},
{
	"name": "离散结构与形式语言",
	"place": "综合楼801"
},
{
	"name": "数据结构与算法",
	"place": "海洋楼1104"
},
{
	"name": "面向对象程序设计",
	"place": "海洋楼1104"
},
{
	"name": "线性代数",
	"place": "综合楼503"
},
{
	"name": "大学物理（2）",
	"place": "综合楼603"
},
{
	"name": "体育（3）",
	"place": "多媒体教室"
},
{
	"name": "中国近代史纲要",
	"place": "综合楼902"
},
{
	"name": "佛学基础",
	"place": "综合楼401"
},
{
	"name": "气象学与气候学",
	"place": "综合楼403"
}]

var timetable = [];
var next_timetable = [];

function Getweek(start)
{
	var WEEKLEN = 7,
		week = null,
		oneDay = 24 * 60 * 60 * 1000, // 一天的毫秒时长  
		weekLeave, // 开学当天所在周剩余天数  
		weekStart, // 开学当天start是星期几  
		today, // 今天  
		dateDiff, // 今天与开学当天日期差  
		sDate; // 开学之日，日期对象  
	var rDateStr = /\d{4}[\/-]\d{1,2}[\/-]\d{1,2}/g; // 简单的日期格式校验
	if(!rDateStr.test(start))
	{
		alert("请使用合法的开学日期！");
		return week;
	}
	sDate = new Date(start.replace("-", "/"));
	weekStart = sDate.getDay();
	weekStart = weekStart === 0 ? 7 : weekStart; // JS中周日的索引为0，这里转换为7，方便计算  
	weekLeave = WEEKLEN - weekStart;
	today = new Date();
	today = new Date(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate());
	dateDiff = today - sDate;
	if(dateDiff < 0)
	{
		alert("未开学呢 ！");
		return week;
	}
	dateDiff = parseInt(dateDiff / oneDay);
	week = Math.ceil((dateDiff - weekLeave) / WEEKLEN) + 1;
	return week;
}

function GetNowDate()
{
	var date = new Date;
	var month = date.getMonth() + 1;
	var str = "现在的时间是<br><br>";
	var arr = new Array("日", "一", "二", "三", "四", "五", "六");
	str += date.getFullYear() + "年 " + month + "月 " +
		date.getDate() + "日 " + "星期" + arr[date.getDay()];
	str += "<br>";
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var week = Getweek("2018/09/10");
	if(hour < 10)
	{
		hour = "0" + hour;
	}
	if(minute < 10)
	{
		minute = "0" + minute;
	}
	if(second < 10)
	{
		second = "0" + second;
	}
	str += hour + ":" + minute + ":" + second + "<br>";
	str += "第" + week + "周";
	document.getElementById("TimeShow").innerHTML = str;
}

function GetPeriod(hour, min)
{
	if(hour < 8) // 该上第一节课了
		return 0;
	else if(hour < 10) // 该上第二节课了
		return 1;
	else if(hour == 10 && min < 20 && timetable[1] != 0) //综合楼
	{
		if(timetable[1].place.indexOf("综合楼") != -1)
			return 1;
		else
			return 2;
	}
	else if(hour < 14) // 该上第三节课了
		return 2;
	else if(hour < 16) // 该上第四节课了
		return 3;
	else if(hour < 19) // 该上第五节课了
		return 4;
	else // 没课了
		return -1;
}

function SetTimeTable(week, day, mode)
{
	if(mode == 0)
	{
		timetable = [];
		switch(day)
		{
			case 1:
				if(week >= 1 && week <= 9)
				{
					timetable.push(data[0]);
					timetable.push(data[4]);
				}
				else if(week >= 15 && week <= 16)
				{
					timetable.push(data[2]);
					timetable.push(data[2]);
				}
				else
				{
					timetable.push(0);
					timetable.push(0);
				}
				timetable.push(0);
				timetable.push(0);
				if(week >= 1 && week <= 13)
					timetable.push(data[9]);
				else
					timetable.push(0);
				break;
			case 2:
				if(week >= 1 && week <= 13)
				{
					timetable.push(data[5]);
				}
				else
				{
					timetable.push(0);
				}
				if(week >= 1 && week <= 16)
				{
					timetable.push(data[3]);
				}
				else
				{
					timetable.push(data[0]);
				}
				timetable.push(0);
				if(week == 1 || week == 3)
				{
					timetable.push(data[0]);
				}
				else
				{
					timetable.push(0);
				}
				timetable.push(0);
				break;
			case 3:
				if(week >= 1 && week <= 9)
				{
					timetable.push(data[4]);
				}
				else
				{
					timetable.push(0);
				}
				if(week >= 1 && week <= 15)
				{
					timetable.push(data[3]);
				}
				else
				{
					timetable.push(0);
				}
				if(week >= 1 && week <= 17)
				{
					timetable.push(data[6]);
				}
				else
				{
					timetable.push(0);
				}
				timetable.push(0);
				if(week >= 1 && week <= 12)
				{
					timetable.push(data[8]);
				}
				else
				{
					timetable.push(0);
				}
				break;
			case 4:
				if(week >= 1 && week <= 9)
				{
					timetable.push(data[1]);
				}
				else
				{
					timetable.push(0);
				}
				if(week >= 1 && week <= 13)
				{
					timetable.push(data[5]);
				}
				else
				{
					timetable.push(0);
				}
				if(week >= 1 && week <= 17)
				{
					timetable.push(data[7]);
				}
				else
				{
					timetable.push(0);
				}
				timetable.push(0);
				timetable.push(0);
				break;
			case 5:
				if(week >= 1 && week <= 14)
				{
					timetable.push(data[2]);
					timetable.push(data[2]);
				}
				else
				{
					timetable.push(0);
					timetable.push(0);
				}
				timetable.push(0);
				if(week >= 1 && week <= 9)
				{
					timetable.push(data[0]);
				}
				else
				{
					timetable.push(0);
				}
				timetable.push(0);
				break;
			case 6:
				timetable.push(0);
				break;
			case 7:
				timetable.push(0);
				break;
		}
	}
	else
	{
		next_timetable = [];
		switch(day)
		{
			case 1:
				if(week >= 1 && week <= 9)
				{
					next_timetable.push(data[0]);
					next_timetable.push(data[4]);
				}
				else if(week >= 15 && week <= 16)
				{
					next_timetable.push(data[2]);
					next_timetable.push(data[2]);
				}
				else
				{
					next_timetable.push(0);
					next_timetable.push(0);
				}
				next_timetable.push(0);
				next_timetable.push(0);
				if(week >= 1 && week <= 13)
					next_timetable.push(data[9]);
				else
					next_timetable.push(0);
				break;
			case 2:
				if(week >= 1 && week <= 13)
				{
					next_timetable.push(data[5]);
				}
				else
				{
					next_timetable.push(0);
				}
				if(week >= 1 && week <= 16)
				{
					next_timetable.push(data[3]);
				}
				else
				{
					next_timetable.push(data[0]);
				}
				next_timetable.push(0);
				if(week == 1 || week == 3)
				{
					next_timetable.push(data[0]);
				}
				else
				{
					next_timetable.push(0);
				}
				next_timetable.push(0);
				break;
			case 3:
				if(week >= 1 && week <= 9)
				{
					next_timetable.push(data[4]);
				}
				else
				{
					next_timetable.push(0);
				}
				if(week >= 1 && week <= 15)
				{
					next_timetable.push(data[3]);
				}
				else
				{
					next_timetable.push(0);
				}
				if(week >= 1 && week <= 17)
				{
					next_timetable.push(data[6]);
				}
				else
				{
					next_timetable.push(0);
				}
				next_timetable.push(0);
				if(week >= 1 && week <= 12)
				{
					next_timetable.push(data[8]);
				}
				else
				{
					next_timetable.push(0);
				}
				break;
			case 4:
				if(week >= 1 && week <= 9)
				{
					next_timetable.push(data[1]);
				}
				else
				{
					next_timetable.push(0);
				}
				if(week >= 1 && week <= 13)
				{
					next_timetable.push(data[5]);
				}
				else
				{
					next_timetable.push(0);
				}
				if(week >= 1 && week <= 17)
				{
					next_timetable.push(data[7]);
				}
				else
				{
					next_timetable.push(0);
				}
				next_timetable.push(0);
				next_timetable.push(0);
				break;
			case 5:
				if(week >= 1 && week <= 14)
				{
					next_timetable.push(data[2]);
					next_timetable.push(data[2]);
				}
				else
				{
					next_timetable.push(0);
					next_timetable.push(0);
				}
				next_timetable.push(0);
				if(week >= 1 && week <= 9)
				{
					next_timetable.push(data[0]);
				}
				else
				{
					next_timetable.push(0);
				}
				next_timetable.push(0);
				break;
			case 6:
				next_timetable.push(0);
				break;
			case 7:
				next_timetable.push(0);
				break;
		}
	}
}

function GetClass(period)
{
	if(timetable.length == 1)
		return "今！天！没！课！";
	else
	{
		while(timetable[period] == 0)
		{
			period += 1;
			if(period >= 5)
				return "今天的课上完了";
		}
		return period;
	}
}

function LeftTime(tartime)
{
	var tarh, tarm, tars;
	var nowh, nowm, nows;
	var tmp;
	var left = [];
	var ndate = new Date;
	nowh = ndate.getHours();
	nowm = ndate.getMinutes();
	nows = ndate.getSeconds();
	tarh = parseInt(tartime[0] + tartime[1]);
	tarm = parseInt(tartime[3] + tartime[4]);
	tars = 0;
	tmp = (tarh - nowh) * 3600 + (tarm - nowm) * 60 + (tars - nows);
	left.push(parseInt(tmp / 3600));
	tmp -= left[0] * 3600;
	left.push(parseInt(tmp / 60));
	tmp -= left[1] * 60;
	left.push(tmp);
	return left;
}

function GetClassTime(period)
{
	var time;
	switch(period)
	{
		case 0:
			time = "08:00";
			break;
		case 1:
			if(timetable[period].place.indexOf("综合楼") != -1)
				time = "10:20";
			else
				time = "10:00";
			break;
		case 2:
			time = "14:00";
			break;
		case 3:
			time = "16:00";
			break;
		case 4:
			time = "19:00";
			break;
	}
	return time;
}

function NextClass()
{
	var date = new Date;
	var hour = date.getHours();
	var minute = date.getMinutes();
	var period = GetPeriod(hour, minute);
	var fuck;
	var is_finish = false;
	if(period == -1)
		fuck = "今天的课上完了";
	else
		fuck = GetClass(period);
	var str = "";
	if(typeof fuck == "string")
	{
		str = fuck;
		is_finish = true;
	}
	else
	{
		str += "下一节课是：";
		str += timetable[fuck].name;
		str += "<br>";
		str += "上课地点为："
		str += timetable[fuck].place;
		str += "<br>";
		str += "上课时间为：";
		var time = GetClassTime(fuck);
		str += time;
		var leftime = LeftTime(time);
		var lefh, lefm, lefs;
		lefh = leftime[0];
		lefm = leftime[1];
		lefs = leftime[2];
		if(lefh < 10)
			lefh = "0" + lefh;
		if(lefm < 10)
			lefm = "0" + lefm;
		if(lefs < 10)
			lefs = "0" + lefs;
		var warning = "距离上课时间：" + lefh + ":" + lefm + ":" + lefs;
		document.getElementById("LeftTime").innerHTML = warning;
	}
	document.getElementById("ClassShow").innerHTML = str;
	if(is_finish)
	{
		var week = Getweek("2018/09/10");
		var day = date.getDay();
		day = day === 0 ? 7 : day;
		if(day == 7)
		{
			week += 1;
			day = 1;
		}
		else
			day += 1;
		SetTimeTable(week, day, 1);
		var have_class = false;
		var i;
		for(i = 0; i < 5; i++)
		{
			if(next_timetable[i] != 0)
			{
				have_class = true;
				break;
			}
		}
		var toms = "";
		if(have_class)
		{
			var tom = next_timetable[i];
			toms = "明天的课：" + next_timetable[i].name;
			toms += "<br>";
			toms += "上课地点：" + next_timetable[i].place;
			toms += "<br>";
			toms += "上课时间：" + GetClassTime(i);
		}
		else
			toms = "明天没课~";
		document.getElementById("Tomorrow").innerHTML = toms;
	}
}

function update()
{
	var date = new Date;
	var week = Getweek("2018/09/10");
	var day = date.getDay();
	day = day === 0 ? 7 : day;
	SetTimeTable(week, day, 0);
	window.setInterval("GetNowDate()", 1000);
	window.setInterval("NextClass()", 1000);
}