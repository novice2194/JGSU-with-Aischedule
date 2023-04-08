/*
 * @Author: BeYoung
 * @Date: 2023-04-07 18:59:58
 * @LastEditTime: 2023-04-08 18:01:37
 */

function decodeCookie(cookie) {
    let cookieObj = {};
    let cookieArr = cookie.split("; ");
    for (var i = 0; i < cookieArr.length; i++) {
        var arr = cookieArr[i].split("=");
        if (arr[0] != "user") continue;
        cookieObj[arr[0]] = JSON.parse(arr[1]);
    }
    return cookieObj;
}

async function getWeeks(schoolYear) {
    const url = "/api/arrange/teacherServer/queryWeek?schoolYear=" + schoolYear;
    let weeks = await fetch(url, {
        method: 'get',
        redirect: 'follow',
        "headers": {
            "content-type": "application/json;charset=UTF-8",
        },
    });
    return weeks.json();
}

async function getSchedule(cookie, weeks) {
    const now = Date.now().toString().substring(0, 10);
    const url = "/api/arrange/CourseScheduleAllQuery/studentCourseSchedule?_t=" + now;
    let schedule = await fetch(url, {
        method: 'POST',
        redirect: 'follow',
        "headers": {
            "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            studentID: cookie.user.studentID,
            semester: cookie.user.semester,
            oddOrDouble: 0,
            weeks: weeks
        })
    });
    return schedule.json();
}

async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) { //函数名不要动
    const cookie = decodeCookie(decodeURI(document.cookie));
    const weeks = await getWeeks(cookie.user.schoolYear);
    if (weeks.code >= 400) {
        console.log(weeks)
        throw new Error("获取周次失败");
    }
    const schedule = await getSchedule(cookie, weeks.data);
    console.log(schedule);
    return JSON.stringify(schedule);
}