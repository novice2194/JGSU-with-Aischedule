function scheduleHtmlParser(html) {
    let result = [];
    let parserText = $('tbody')[0];
    let parserTextChildrenLength = parserText.children.length;
    let flagOfDoubleSections = true;
    console.log(parserText);
    let text = parserText[0];
    console.log(text)

    if (parserTextChildrenLength >= 11) flagOfDoubleSections = false;

    for (let i = 0; i < parserTextChildrenLength; i++) {
        for (let j = 1; j < 8; j++) {
            //空课程
            if (parserText.children[i].children[j].children[0].children.length == 0) continue;

            //课程解析文本
            let classParserText = parserText.children[i].children[j].children[0].children;
            //console.log(classParserText);

            //解析课程信息
            for (let k = 0; k < classParserText.length; k++) {
                //提取课程信息
                let classText = classParserText[k];
                let name = classText.children[0].children[0].data;
                let time = classText.children[1].children[0].children[0].children[0].data;
                let section = classText.children[1].children[0].children[1].children[0].data;
                let position = classText.children[3].children[0].children[0].children[0].data;
                let teacher = classText.children[4].children[0].children[0].children[0].data;

                //处理起始周数
                console.log(time);
                let weeksOfStart = '';
                let weeksOfEnd = '';
                for (let l = 0; l < time.length; l++) { //开始周
                    if (time[l] == ' ' || time[l] == '-') break;
                    weeksOfStart += time[l];
                }
                for (let l = time.search('-') + 1; l != 0 && l < time.length; l++) { //结束周
                    if (time[l] == ' ') break;
                    weeksOfEnd += time[l];
                }
                if (weeksOfEnd.length == 0) weeksOfEnd = weeksOfStart;
                weeksOfStart = Number(weeksOfStart);
                weeksOfEnd = Number(weeksOfEnd);

                //处理单双周
                let flagOfWeeks = false; //是否为单双周课程
                let weeks = []; //添加周数
                if (time.search('单') > 0 || time.search('双') > 0) flagOfWeeks = true;
                if (!flagOfWeeks) {
                    for (let w = weeksOfStart; w <= weeksOfEnd; w++) weeks.push(w);
                } else {
                    for (let w = weeksOfStart; w <= weeksOfEnd; w += 2) weeks.push(w);
                }

                //处理节数
                console.log(section);
                let sections = [];
                if (!flagOfDoubleSections) {
                    sections.push(i + 1);
                } else {
                    let sectionOfOne = ''; //第一节课
                    let sectionOfTwo = ''; //第二节课

                    if (section.search('第') != -1) {
                        for (let l = section.search('第') + 1; section[l] != ',' && section[l] != '节'; l++) {
                            sectionOfOne += section[l];
                        }
                    }
                    if (section.search(',') != -1) {
                        for (let l = section.search(',') + 1; section[l] != '节'; l++) {
                            sectionOfTwo += section[l];
                        }
                    }

                    if (sectionOfOne.length > 0) sections.push(Number(sectionOfOne)); //判断是否有课程
                    if (sectionOfTwo.length > 0) sections.push(Number(sectionOfTwo)); //有第二节课时才添加到课程中
                }

                //添加课程信息
                let re = {sections: [], weeks: []}
                re.name = name;
                re.position = position;
                re.teacher = teacher;
                re.day = j.toString();
                re.sections = sections;
                re.weeks = weeks;

                if (re.weeks.length == 0) {
                    continue;
                }
                //console.log(re);
                result.push(re);
            }
        }
    }


    console.log(result);
    return result;
}