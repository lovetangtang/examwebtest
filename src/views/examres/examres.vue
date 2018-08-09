<style lang="less">
    @import '../../styles/common.less';
    @import "./examres.less";
</style>
<template>
    <div class="body-wrapper">
        <div class="content-wrapper content-top">
            <div class="score-wrapper">
                <img class="score-bg" src="../../images/score-bg.png">
                <template v-if="showConfig.IsShowScore===true">
                    <span class="score-left ">{{score}}</span>
                    <!-- <span class="score-right">.02</span> -->
                    <span class="score-unit">分</span>
                </template>
                <template v-else>
                    <span class="score-unit">答题结束</span>
                </template>
            </div>
            <div class="release-wrapper">
                <span class="release-str"></span>
            </div>
            <div class="decoration">
                <span>{{showConfig.EndTag}}</span>
                <img src="../../images/decoration.png">
            </div>
        </div>
        <div class="content-wrapper content-bottom content-tab-2 clearfix">
            <!-- <div class="info-tab tab-orange">
                <div class="tab-data">0.0%</div>
                <div class="tab-label">正确率</div>
            </div>

            <div class="info-tab tab-green">
                <div class="tab-data">1</div>
                <div class="tab-label">排名</div>
            </div> -->
            <div>
                <Row class="margin-top-70" :gutter="50">

                    <Col span="12">
                    <template :style="{display:showstatus.IsShowLook}">
                        <template v-if="showConfig.IsShowAnswer">
                            <Button class="maxwidth  btn-light-blue" @click="handlerexamresolve" shape="circle" size="large">查看解析</Button>
                        </template>
                        <template v-else>
                            <Button class="maxwidth" @click="goHome" type="primary" shape="circle" size="large">回到首页</Button>
                        </template>
                    </template>
                    </Col>
                    <Col span="12">
                    <template :style="{display:showstatus.IsShowRfExam}">
                        <Button class="maxwidth" @click="handlerrestexam" type="primary" shape="circle" size="large">再考一次</Button>
                    </template>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'exam',
        data () {
            return {
                ansmodal: false,
                showConfig: {},
                score: 0,
                showstatus: {
                    IsShowScore: 'none',
                    IsShowAnswer: 'none',
                    IsShowNum: 'none',
                    IsShowComment: 'none',
                    IsShowRfExam: 'none',
                    IsShowLook: 'none'
                },
                formItem: {
                    radio: 'male',
                    checkbox: []
                }
            };
        },
        mounted () {
            this.init();
            window.addEventListener('resize', this.fun_null);
            this.$nextTick(() => {

            });
        },
        destroyed () {},
        computed: {
            avatorPath () {
                return localStorage.avatorImgPath;
            }
        },
        created () {
            let query = this.$route.query;
            this.showConfig = JSON.parse(query.config);
            this.score = JSON.parse(query.score);
        },
        methods: {
            init () {
                this.$nextTick(() => {

                });
            },
            fun_null () {
                console.log(33);
                return false;
            },
            goHome () {
                this.$router.push({
                    name: 'home_index'
                });
            },
            handlerexamresolve () {
                this.$router.push({
                    name: 'examresolveindex',
                    query: []
                });
            },
            handlerrestexam () {
                this.$router.push({
                    name: 'home_index'
                });
                return;
                this.$router.push({
                    name: 'emstindex',
                    query: []
                });
            },
            handlersubmit () {
                this.$Modal.confirm({
                    title: '确认交卷',
                    content: '<p style="font-size:18px">当前题目还未答完，是否确认交卷</p>',
                    onOk: () => {
                        this.$Message.info('Clicked ok');
                        this.$Spin.show({
                            render: (h) => {
                                return h('div', [
                                    h('Icon', {
                                        'class': 'demo-spin-icon-load',
                                        props: {
                                            type: 'load-c',
                                            size: 18
                                        }
                                    }),
                                    h('div', '提交试卷中')
                                ]);
                            }
                        });
                        setTimeout(() => {
                            this.$Spin.hide();
                            this.$router.push({
                                name: 'examresindex',
                                query: []
                            });
                        }, 3000);
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            }
        }
    };
</script>