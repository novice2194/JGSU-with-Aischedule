/*
 * @Author: BeYoung
 * @Date: 2023-04-07 18:59:58
 * @LastEditTime: 2023-04-08 19:39:32
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

async function getSchedule(cookie, weeks) {
    const url = "/api/arrange/CourseScheduleAllQuery/studentCourseSchedule";
    const schedule = await fetch(url, {
        "headers": {
            "content-type": "application/json;charset=UTF-8",
        },
        "body": JSON.stringify({
            "studentId": cookie.user.userName,
            "semester": cookie.user.semester,
            "weeks": weeks,
            "oddOrDouble": 0,
        }),
        "method": "POST",
    });
    return schedule.json();
}

async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) { //函数名不要动
    const cookie = decodeCookie(decodeURI(document.cookie));
    const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const schedule = await getSchedule(cookie, weeks);
    console.log(schedule);
    return JSON.stringify(schedule);
}