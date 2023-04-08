/*
 * @Author: BeYoung
 * @Date: 2023-04-07 18:59:58
 * @LastEditTime: 2023-04-08 18:11:39
 */
function scheduleHtmlParser(html) {
    let result = [];
    const schedule = JSON.parse(html);
    if (schedule.code >= 400) {
        console.log(schedule)
        throw new Error("获取课表失败");
    }

    for (course in schedule.data) {
        
    }
    console.log(result);
    return result;
}