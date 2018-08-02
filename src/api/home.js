import request from '@/utils/request';
export function GetHomeExam (params) {
    return request({
        url: '/Data/AnswerPaper/exam.ashx',
        method: 'post',
        params
    });
}
