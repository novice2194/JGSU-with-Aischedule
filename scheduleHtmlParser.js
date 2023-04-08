/*
 * @Author: BeYoung
 * @Date: 2023-04-07 18:59:58
 * @LastEditTime: 2023-04-08 19:59:01
 */

class Course {
    day = 0;
    name = "name";
    weeks = [];
    teacher = "teacher";
    position = "position";
    sections = [];
    constructor(name, teacher, position, day, weeks, sections) {
        this.day = day;
        this.name = name;
        this.weeks = weeks;
        this.teacher = teacher;
        this.position = position;
        this.sections = sections;
    }
}


function scheduleHtmlParser(html) {
    let result = [];
    const schedule = JSON.parse(html);
    if (schedule.code >= 400) {
        console.log(schedule)
        throw new Error("获取课表失败");
    }
    for (const courses of schedule.data) {
        for (const couse of courses) {

        }
    }
    console.log(result);
    return result;
}