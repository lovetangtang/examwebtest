import request from '@/utils/request';

export function GetAwExamList (params) {
    return request({
        url: '/Data/AnswerPaper/exam.ashx',
        method: 'post',
        params
    });
}
