<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main mg-top">
        <Row>
            <Col span="20" class="ft-lg">当前考试</Col>
            <Col span="4" class="ft-cs">
            </Col>
        </Row>
        <div class="divide_line1"></div>
        <Row :gutter="12">
            <Col :xs="24">
            <Row class-name="home-page-row1" :gutter="10">
                <template v-for="item in examlist">
                    <Col :md="11" :style="{marginBottom: '10px'}">
                    <Card class="bd-left-true box-amt ">
                        <b class="card-user-infor-name">{{item.ExamName}}</b>
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
                                    答题模式：{{fun_getAnsweMode(item.AnsweMode)}}
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
                                <Col span="24">
                                <div>
                                    考试时长：{{item.AnsweTime}}分钟
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="18">
                                <div>
                                    <Row>
                                        <Col span="5">考试说明：</Col>
                                        <Col span="19">{{item.ExamExplain}}</Col>
                                    </Row>
                                </div>
                                </Col>
                                <Col span="6" class="tx-r">
                                <Button type="primary" class="mg-btm" @click="fun_startexam(item)">开始</Button>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    </Col>
                </template>
                <template v-if="examlist.length===0">
                    <Col :md="11" :style="{marginBottom: '10px'}">
                    <Card class="bd-left-true box-amt paper-bg">
                        <b class="card-user-infor-name"></b>
                        <div class="pd-home-sj">
                            暂无正在进行的考试
                        </div>
                    </Card>
                    </Col>
                </template>
            </Row>
            </Col>
            </Col>
        </Row>


    </div>
</template>

<script>
    import {
        GetHomeExam,
        ExecExam
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
                examlist: []
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
            fun_getAnsweMode (v) {
                switch (v) {
                    case 10:
                        return '练习模式';
                        break;
                    case 20:
                        return '逐题模式';
                        break;
                    case 30:
                        return '整卷模式';
                        break;
                    default:
                        break;
                }
            },
            // 获取考试次数限制
            fun_getanswenumlimit (v) {},
            fun_startexam (item) {
                let rq = {
                    action: 'ExecExam',
                    KeyID: item.KeyID
                };
                ExecExam(rq).then(response => {
                    let AnsweMode = item.AnsweMode;
                    let name = '';
                    if (AnsweMode === 20) {
                        name = 'graduallyem';
                    } else if (AnsweMode === 30) {
                        name = 'emstindex';
                    } else {
                        this.$Message.warning('练习模式还未开发');
                    }
                    let routeData = this.$router.resolve({
                        name: name, // graduallyem emstindex
                        query: item,
                        params: {}
                    });
                    var tempwindow = window.open('_blank');
                    tempwindow.location = routeData.href;
                    // window.open();
                    // window.open(routeData.href, '_blank');
                });
            },
            // 刷新数据
            fetchData () {
                try {
                    GetHomeExam(this.listQuery).then(response => {
                        this.examlist = response.data;
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
</script>