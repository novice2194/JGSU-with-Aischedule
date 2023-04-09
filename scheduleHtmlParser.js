/*
 * @Author: BeYoung
 * @Date: 2023-04-07 18:59:58
 * @LastEditTime: 2023-04-09 09:58:53
 */
function parseOddWeek(weeks) {
    let odd = false;
    for (const week of weeks) {
        if (week == "单" || week == "双") {
            odd = true;
            break;
        }
    }
    return odd;
}

function parseWeeks(weeks) {
    let result = [];
    const week = weeks.split(";");
    for (const w of week) {
        const odd = parseOddWeek(w);
        const start = parseInt(w.split("-")[0]);
        try {
            const end = parseInt(w.split("-")[1]);
            for (let i = start; i <= end; i++) {
                if (odd) {
                    if (Math.abs(i - start) % 2 == 0) {  // 单双周间距为2
                        result.push(i);
                    }
                } else {
                    result.push(i);
                }
            }
        } catch (e) {
            console.log(e, ": ", w);
        } finally {
            result.push(start);
        }
    }
    if (result.length == 0) { result.push(0) }
    return result;
}

function parsePosition(position) {
    if (position == null || position == "") {
        return "未知";
    }
    return position;
}

function scheduleHtmlParser(html) {
    let result = [];
    const schedule = JSON.parse(html);
    if (schedule.code >= 400) {
        console.log(schedule)
        throw new Error("获取课表失败");
    }
    for (const courses of schedule.data) {
        for (const c of courses.courseList) {
            try {
                const name = c.courseName;
                const teacher = c.teacherName;
                const position = parsePosition(c.classroomName);
                const day = c.dayOfWeek;
                const weeks = parseWeeks(c.weeks);
                const sections = [parseInt(c.time)];
                result.push({ name, teacher, position, day, weeks, sections });
            } catch (e) {
                console.log(e, ": ", c);
            }
        }
    }
    console.log(result);
    return result;
}