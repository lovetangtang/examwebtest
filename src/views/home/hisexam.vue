<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main mg-top">
        <Row class="mg-top">
            <Col span="20" class="ft-lg">历史考试</Col>
            <Col span="4" class="ft-cs">
            <div class="fl-right" @click="handleOpenExam">
                <!-- <a href="javascript:void(0)">
                    全部考试>
                </a> -->
            </div>
            </Col>
        </Row>
        <div class="divide_line1"></div>
        <Row :gutter="12">
            <Col :xs="24">
            <Row class-name="home-page-row1" :gutter="10">
                <template v-for="item in examlately">
                    <Col :md="11" :style="{marginBottom: '10px'}">
                    <Card class="bd-left-true box-amt paper-bg">
                        <b class="card-user-infor-name">{{item.ExamName}}</b>
                        <b style="color:#ff9900">{{item.Score}}分</b>
                         <b class="scoredetail" @click="handleopenscore(item)">成绩详情</b>
                        <div class="divide_line"></div>
                        <div class="pd-home-sj">
                            <Row>
                                <Col span="24">
                                <div>
                                    考试时间：{{fun_gettimev(item.ExamBeginTime)}}到{{fun_gettimev(item.ExamEndTime)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    总分：{{item.TotalScore}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    考试次数限制：{{item.AnsweNumLimit===-1?'无限制':item.AnsweNumLimit}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    及格分数：{{item.PassScore}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    组卷方式：{{fun_getassemblytype(item.AssemblyType)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    考试分类：{{fun_getexamtype(item.ExamType)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    考试模式：{{fun_getexammode(item.ExamMode)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    提前交卷时间：{{item.AdHandoverTime===-1?'无限制':item.AdHandoverTime}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                <div>
                                    最晚迟到时间：{{fun_gettimev(item.LateTime)}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    考试时长：{{item.AnsweTime}}分钟
                                </div>
                                </Col>
                                <Col span="12" class="tx-r">
                                <span>{{fun_getExamStatus(item.ExamStatus)}}</span>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    </Col>
                </template>
                 <template v-if="examlately.length===0">
                    <Col :md="11" :style="{marginBottom: '10px'}">
                    <Card class="bd-left-true box-amt paper-bg">
                        <b class="card-user-infor-name"></b>
                        <div class="pd-home-sj">
                            暂无考试信息
                        </div>
                    </Card>
                    </Col>
                </template>
            </Row>
            </Col>
            </Col>
        </Row>
        <!-- 组卷方式窗口 -->
        <Modal     title="成绩详情"   ok-text="确定" v-model="scoremodal" width="900" >
          <Table border :columns="columns" :data="scoreData"></Table>
        </Modal>
    </div>
</template>

<script>
    import {
        GetHomeExam
    } from '@/api/home';
    import util from '@/libs/util';
    export default {
        name: 'home',
        data () {
            return {
                listQuery: { // 查询条件
                    ExamType: -1,
                    Status: -1,
                    ExamMode: -1,
                    action: 'getmyexam',
                    type: 'now',
                    ExamName: ''
                },
                scoremodal: false,
                scoreData: [],
                columns: [
                    {
                        title: '考试状态',
                        key: 'ExamStatus',
                        render: (h, params) => {
                            let sc = params.row.ExamStatus;
                            let v = this.fun_getExamStatus(sc);
                            return v;
                        }
                    }, {
                        title: '是否及格',
                        key: 'IsPass',
                        render: (h, params) => {
                            let sc = params.row.IsPass;
                            let v = this.fun_getispass(sc);
                            return v;
                        }
                    }, {
                        title: '答题次数',
                        key: 'ReplyNum'
                    }, {
                        title: '交卷时间',
                        key: 'SubmitTime'
                    }, {
                        title: '答卷时间',
                        key: 'AnswerTime'
                    }, {
                        title: '系统判分',
                        key: 'JudgmentStatus',
                        render: (h, params) => {
                            let sc = params.row.JudgmentStatus;
                            let v = this.fun_getJudgmentStatus(sc);
                            return v;
                        }
                    }, {
                        title: '人工判分',
                        key: 'IsJudgment',
                        render: (h, params) => {
                            let sc = params.row.IsJudgment;
                            let v = this.fun_getIsJudgment(sc);
                            return v;
                        }
                    }, {
                        title: '分数',
                        key: 'Score'
                    }, {
                        title: '试卷详情',
                        key: 'action',
                        width: 90,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.showEdit(params);
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ],
                examnowlist: [],
                examlately: []
            };
        },
        // 模板渲染成html前调用，初始化属性
        created () {
            this.fetchData();
        },
        mounted () {
            this.$nextTick(() => {
                // $('.box-amt').hover(function () {
                //     $('.ivu-card-body').animate({top: '200px', right: '600px'}, 1000);
                // }, function () {
                //     $('.user-infor').removeClass('bounce animated infinite');
                // });
            });
        },
        computed: {
            avatorPath () {
                return localStorage.avatorImgPath;
            }
        },
        methods: {
            fun_gettimev (v) {
                return v.substring(v, v.length - 3);
            },
            fun_getexamtype (v) {
                return util.GetItemValue(this, '100004', v); ;
            },
            fun_getassemblytype (v) {
                return util.getAssemblyType(v);
            },
            fun_getexammode (v) {
                return util.getExamModeName(v);
            },
            // 获取答题状态
            fun_getispass (v) {
                switch (v) {
                    case false:
                        return '未及格';
                        break;
                    case true:
                        return '及格';
                        break;
                    default:
                        break;
                }
            },
            // 获取考试状态状态
            fun_getExamStatus (v) {
                switch (v) {
                    case 0:
                        return '未判分';
                        break;
                    case 1:
                        return '通过';
                        break;
                    case 2:
                        return '未通过';
                        break;
                    default:
                        break;
                }
            },
            // 系统评分状态
            fun_getJudgmentStatus (v) {
                switch (v) {
                    case 0:
                        return '未判分';
                        break;
                    case 1:
                        return '判分成功';
                        break;
                    case 2:
                        return '判分失败';
                        break;
                    default:
                        break;
                }
            },
            // 系统评分状态
            fun_getIsJudgment (v) {
                switch (v) {
                    case false:
                        return '未判分';
                        break;
                    case true:
                        return '判分成功';
                        break;
                    default:
                        break;
                }
            },
            // 获取答题状态
            fun_getanswerstatus (v) {
                switch (v) {
                    case 0:
                        return '未答题';
                        break;
                    case 1:
                        return '答题中';
                        break;
                    case 2:
                        return '待强制交卷';
                        break;
                    case 3:
                        return '答题完成';
                        break;
                    default:
                        break;
                }
            },
            fun_startexam (item) {

            },
            // 打开考试信息
            handleOpenExam () {
                this.$router.push({
                    name: 'exam_set'
                });
            },
            // 打开考试信息
            handleopenscore (item) {
                this.scoremodal = true;
                let scoreDataList = [];
                scoreDataList.push(item);
                this.scoreData = scoreDataList;
            },
            // 刷新数据
            fetchData () {
                try {
                    this.listQuery.type = 'lately';
                    GetHomeExam(this.listQuery).then(response => {
                        this.examlately = response.data;
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
</script>