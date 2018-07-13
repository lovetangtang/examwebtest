<style lang="less">
    @import '../../styles/common.less';
    @import "./examres.less";
</style>
<template>
    <div class="body-wrapper">
        <div class="content-wrapper content-top">
            <div class="score-wrapper">
                <img class="score-bg" src="../../images/score-bg.png">
                <!-- <span class="score-left ">99</span>
                <span class="score-right">.02</span>
                <span class="score-unit">分</span> -->
                <span class="score-unit">答题结束</span>
            </div>
            <div class="release-wrapper">
                <span class="release-str"></span>
            </div>
            <div class="decoration">
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
                    <Button class="maxwidth  btn-light-blue" @click="handlerexamresolve"  shape="circle" size="large">查看解析</Button>
                    </Col>
                    <Col span="12">
                    <Button class="maxwidth" @click="handlerrestexam" type="primary" shape="circle" size="large">再考一次</Button>
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
                formItem: {
                    radio: 'male',
                    checkbox: []
                }
            };
        },
        mounted () {
            this.init();
            this.$nextTick(() => {

            });
        },
        destroyed () {},
        computed: {
            avatorPath () {
                return localStorage.avatorImgPath;
            }
        },
        methods: {
            init () {
                this.$nextTick(() => {

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