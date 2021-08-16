function scheduleHtmlParser(html) {
    let result = [];
    let doc = document.getElementsByTagName("td");
    let day = 1;
    console.log(doc);
    for (const docKey in doc) {
        //处理当前星期
        let html = doc[docKey].innerHTML;
        let text = doc[docKey].innerText;
        if (text.length == 0) {
            //console.log(day);
            day++;
            continue;
        }
        if (html[0] == "第") {
            //console.log(html);
            day = 1;
            continue;
        }
        //console.log(text);

        //处理课程
        let hasClass = doc[docKey].children[0].childElementCount;
        for (let classKey = 0; classKey < hasClass; classKey++) {
            // console.log(classKey);
            // console.log(doc[docKey].children[0].children[classKey].innerText);
            let name = doc[docKey].children[0].children[classKey].children[0].innerText;
            let tmpTime = doc[docKey].children[0].children[classKey].children[1].innerText;
            let position = doc[docKey].children[0].children[classKey].children[3].innerText;
            let teacher = doc[docKey].children[0].children[classKey].children[4].innerText;
            // console.log(name);
            // console.log(tmpTime);
            // console.log(position);
            // console.log(teacher);

            // 处理时间
            let time = tmpTime.match(/\d+(.\d+)?/g);
            let timeStrLenth = time[0].length;
            let section = Number(time[1]);
            let weekstar = Number(time[0][0]);
            let weekstop = Number((time[0][2] + time[0][3]));
            // for (let i = 0; i < timeStrLenth; i++) {
            //
            // }
            // console.log(time);
            // console.log(weekstar);
            // console.log(weekstop);
            // console.log(timeStrLenth);
            // console.log(day);
            // console.log(section);

            //创建课程
            let re = {sections: [], weeks: []}
            re.name = name;
            re.position = position;
            re.teacher = teacher;
            re.day = day.toString();
            re.sections.push({section: section});
            for (let i = weekstar; i < weekstop + 1; i++) {
                re.weeks.push(i);
            }
            //console.log(re);
            result.push(re);
        }
        day++;
    }

    let _sectionTimes = [
        {
            "section": 1,
            "startTime": "08:20",
            "endTime": "09:05"
        }, {
            "section": 2,
            "startTime": "09:10",
            "endTime": "09:55"
        }, {
            "section": 3,
            "startTime": "10:15",
            "endTime": "11:00"
        }, {
            "section": 4,
            "startTime": "11:05",
            "endTime": "11:50"
        }, {
            "section": 5,
            "startTime": "14:00",
            "endTime": "14:45"
        }, {
            "section": 6,
            "startTime": "14:50",
            "endTime": "15:35"
        }, {
            "section": 7,
            "startTime": "15:55",
            "endTime": "16:40"
        }, {
            "section": 8,
            "startTime": "16:45",
            "endTime": "17:30"
        }, {
            "section": 9,
            "startTime": "18:30",
            "endTime": "19:15"
        }, {
            "section": 10,
            "startTime": "19:20",
            "endTime": "20:05"
        }, {
            "section": 11,
            "startTime": "20:10",
            "endTime": "20:55"
        }]
    console.log(result);
    return {courseInfos: result, sectionTimes: _sectionTimes};
}