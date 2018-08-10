<style lang="less">
    @import '../../styles/common.less';
    @import "./exam.less";
</style>
<template>
    <div @click="handleFullscreen">
        <Row class="mg-top20" type="flex" justify="center">
            <Col span="18">
            <Row :gutter="50">
                <Col span="20">
                <div class="box">
                    <template v-for="ck in subjectData">
                        <!-- 单选题 -->
                        <template v-if="ck.SubjecSubClass===11">
                            <div class="box-eame-item">
                                <div class="box-head">
                                    <p> {{ck.SbTitleName}}(共{{ck.SubtSum}}题，合计{{ck.SubScore}}分,漏选错选不得分)</p>
                                </div>
                                <template v-for="(sb,si) in ck.subjectlist">
                                    <div class="box-content">
                                        <Row>
                                            <Col span="22">
                                            <p class="ft-nm">
                                                <span class="fc-blue">{{si+1}}.</span>{{sb.Stem}}({{sb.DefaultScore}}分)</p>
                                            <Form class="examline-bottom" :model="formItem" :label-width="80">
                                                <RadioGroup v-model="sb.RightAnswer">
                                                    <template v-for=" (op,oi) in sb.SelectionOption.split('|')">
                                                        <Radio class="ft-nm margin-top-5 exam-answer" :label="oi+1">{{Letter[oi+1]}}. {{op}} </Radio>
                                                        </br>
                                                    </template>
                                                </RadioGroup>
                                            </Form>
                                            </Col>
                                            <Col span="2">
                                            <span> 标记</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </template>

                            </div>
                        </template>
                        <!-- 多选题 -->
                        <template v-else-if="ck.SubjecSubClass===12">
                            <div class="box-eame-item">
                                <div class="box-head">
                                    <p> {{ck.SbTitleName}}(共{{ck.SubtSum}}题，合计{{ck.SubScore}}分,漏选错选不得分)</p>
                                </div>
                                <template v-for="(sb,si) in ck.subjectlist">
                                    <div class="box-content">
                                        <Row>
                                            <Col span="22">
                                            <p class="ft-nm">
                                                <span class="fc-blue">{{si+1}}.</span>{{sb.Stem}}({{sb.DefaultScore}}分)</p>
                                            <Form class="examline-bottom" :model="formItem" :label-width="80">
                                                <CheckboxGroup v-model="sb.RightAnswer">
                                                    <template v-for="(op,oi) in sb.SelectionOption.split('|')">
                                                        <Checkbox class="ft-nm margin-top-5 exam-answer" :label="oi+1">{{Letter[oi+1]}}. {{op}}
                                                        </Checkbox>
                                                        </br>
                                                    </template>
                                                </CheckboxGroup>
                                            </Form>
                                            </Col>
                                            <Col span="2">
                                            <span> 标记</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </template>

                            </div>
                        </template>
                        <!-- 判断题 -->
                        <template v-else-if="ck.SubjecSubClass===20">
                            <div class="box-eame-item">
                                <div class="box-head">
                                    <p> {{ck.SbTitleName}}(共{{ck.SubtSum}}题，合计{{ck.SubScore}}分,漏选错选不得分)</p>
                                </div>
                                <template v-for="(sb,si) in ck.subjectlist">
                                    <div class="box-content">
                                        <Row>
                                            <Col span="22">
                                            <p class="ft-nm">
                                                <span class="fc-blue">{{si+1}}.</span>{{sb.Stem}}({{sb.DefaultScore}}分)</p>
                                            <Form class="examline-bottom" :model="formItem" :label-width="80">
                                                <RadioGroup v-model="sb.RightAnswer">
                                                    <Radio class="ft-nm margin-top-5 exam-answer" label="true">正确 </Radio>
                                                    </br>
                                                    <Radio class="ft-nm margin-top-5 exam-answer" label="false">错误</Radio>
                                                    </br>
                                                </RadioGroup>
                                            </Form>
                                            </Col>
                                            <Col span="2">
                                            <span> 标记</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </template>

                            </div>
                        </template>
                        <!-- 填空题 -->
                        <template v-else-if="ck.SubjecSubClass===30">
                            <div class="box-eame-item">
                                <div class="box-head">
                                    <p> {{ck.SbTitleName}}(共{{ck.SubtSum}}题，合计{{ck.SubScore}}分,漏选错选不得分)</p>
                                </div>
                                <template v-for="(sb,si) in ck.subjectlist">
                                    <div class="box-content">
                                        <Row>
                                            <Col span="22">
                                            <p class="ft-nm">
                                                <span class="fc-blue">{{si+1}}.</span>{{sb.Stem}}({{sb.DefaultScore}}分)</p>
                                            <Form class="examline-bottom" ref="formInline" :label-width="30">
                                                <template v-for="(tk,ti) in sb.Stem.split('()').length-1">
                                                    <div class="margin-bottom-10 margin-top-10">
                                                        <Input v-model="sb.tkanswer[ti].value">
                                                        <span slot="prepend">
                                                            <span>&nbsp;{{ti+1}}&nbsp;</span>
                                                        </span>
                                                        </Input>
                                                    </div>
                                                </template>
                                            </Form>

                                            </Col>
                                            <Col span="2">
                                            <span> 标记</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </template>

                            </div>
                        </template>
                        <!-- 问答题 -->
                        <template v-else-if="ck.SubjecSubClass===40">
                            <div class="box-eame-item">
                                <div class="box-head">
                                    <p> {{ck.SbTitleName}}(共{{ck.SubtSum}}题，合计{{ck.SubScore}}分,漏选错选不得分)</p>
                                </div>
                                <template v-for="(sb,si) in ck.subjectlist">
                                    <div class="box-content">
                                        <Row>
                                            <Col span="22">
                                            <p class="ft-nm">
                                                <span class="fc-blue">{{si+1}}.</span>{{sb.Stem}}({{sb.DefaultScore}}分)</p>
                                            <Row class="examline-bottom">
                                                <Col span="11" class="margin-top-10">
                                                <textarea v-model="sb.RightAnswer" class='tinymce-textarea' :id="'tinymceEditer'+(si+1)"></textarea>
                                                </Col>
                                            </Row>
                                            </Col>
                                            <Col span="2">
                                            <span> 标记</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </template>

                            </div>
                        </template>
                    </template>
                </div>
                </Col>
                <Col :md="4" style="padding-left:39px">
                <div class="box-rate-top">
                    <div class="box-exame">
                        <div class="emrate-time">
                            <p class="item-lable"> 剩余时间</p>
                            <p class="emrate-tmv">
                                <countdown :endTime="Examinfo.endTime" ref="countdown" :callback="callback" endText="已结束"></countdown>
                            </p>
                        </div>
                        <div class="item-answer">
                            <p @click="ansmodal = true" class="emrate-ascard ft-size15">
                                <Icon class="ansico" type="clipboard"></Icon>答题卡
                            </p>
                            <Modal v-model="ansmodal">
                                <div class="model-ans">
                                    <p class="tx-c">
                                        <span class="ft-size16 tx-c">答题卡</span>
                                    </p>
                                    <template v-for="(at,ai) in answerCardlist">
                                        <div>
                                            <p class="margin-top-20 head-bm-line">
                                                <span>{{at.SbTitleName}}(共{{at.SubtSum}}题，合计{{at.SubScore}}分)</span>
                                            </p>
                                            <template v-for="c in at.content">
                                                <label class="margin-top-10">{{c}}题已答</label>&nbsp;&nbsp;
                                            </template>
                                        </div>
                                    </template>
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div class="box-exame pd-top10">
                        <p class="ft-size15">当前进度</p>
                        <Circle :percent="percent" class="circle-rate">
                            <span class="demo-Circle-inner" style="font-size:15px">{{percent}}%</span>
                        </Circle>
                    </div>
                    <Button type="primary" @click="handlersubmit" style="width:100%">提交</Button>
                </div>
                </Col>
            </Row>
            </Col>
        </Row>
        <template>
            <Spin size="large" fix v-if="pageSpinShow"></Spin>
            <BackTop :height="100" :bottom="10">
                <div class="top">返回顶端</div>
            </BackTop>
        </template>
    </div>
</template>
<script>
    import tinymce from 'tinymce';
    import {
        GetAwExamList,
        SaveAnswer
    } from '@/api/awexam';
    import countdown from './countdown.vue';
    import util from '@/libs/util';
    export default {
        name: 'exam',
        components: {
            countdown
        },
        data () {
            return {
                ansmodal: false,
                pageSpinShow: true,
                Letter: util.Letter,
                subjectData: [],
                exitScreenTime: 0,
                isValidScree: true,
                setIntervalsave: null,
                answerCardlist: [],
                listQuery: {
                    action: 'getawexamlist',
                    KeyID: 0
                },
                Examinfo: {},
                formItem: {
                    radio: 'male',
                    checkbox: []
                }
            };
        },
        watch: {
            'subjectData': {
                // 深度监听，可监听到对象、数组分值，总题数的变化
                handler (val, oldVal) {
                    let sbsum = 0;
                    let answersum = 0;
                    let answerlist = [];
                    for (let i = 0; i < val.length; i++) {
                        let aslist = {
                            title: i + 1,
                            SbTitleName: val[i].SbTitleName,
                            content: [],
                            SubtSum: val[i].SubtSum,
                            SubScore: val[i].SubScore
                        };
                        for (let j = 0; j < val[i].subjectlist.length; j++) {
                            sbsum += 1;
                            if (val[i].SubjecSubClass === 12) {
                                if (val[i].subjectlist[j].RightAnswer.length > 0) {
                                    answersum += 1;
                                    aslist['content'].push(j + 1);
                                }
                            } else if (val[i].SubjecSubClass === 11) {
                                if (val[i].subjectlist[j].RightAnswer !== -1) {
                                    answersum += 1;
                                    aslist['content'].push(j + 1);
                                }
                            } else {
                                if (val[i].subjectlist[j].RightAnswer !== '') {
                                    answersum += 1;
                                    aslist['content'].push(j + 1);
                                }
                            }
                        }
                        answerlist.push(aslist);
                    }
                    let percent = Math.ceil((answersum / sbsum) * 100);
                    this.percent = percent;
                    this.answerCardlist = answerlist;
                },
                deep: true
            }
        },
        created () {
            this.fetchData();
            this.setIntervalsave = setInterval(this.keepSaveData, 20000);
        },
        mounted () {
            this.init();
            window.addEventListener('resize', this.handleExitScree);
            setTimeout(() => {
                this.pageSpinShow = false;
            }, 2000);
            this.$nextTick(() => {

            });
        },
        beforeDestroy () {
            clearInterval(this.setIntervalsave);
        },
        destroyed () {
            tinymce.get('tinymceEditer').destroy();
        },
        computed: {
            avatorPath () {
                return localStorage.avatorImgPath;
            }
        },
        methods: {
            init () {
                this.$nextTick(() => {
                    let vm = this;
                    for (let i = 1; i < 3; i++) {
                        tinymce.init({
                            selector: '#tinymceEditer' + i,
                            branding: false,
                            elementpath: false,
                            language: 'zh_CN.GB2312',
                            height: '150',
                            width: '600px',
                            setup: function (editor) {
                                editor.on('init', function (e) {
                                    vm.spinShow = false;
                                    // if (localStorage.editorContent) {
                                    //     tinymce.get('tinymceEditer').setContent(localStorage.editorContent);
                                    // }
                                });
                                editor.on('keydown', function (e) {
                                    // localStorage.editorContent = tinymce.get('tinymceEditer').getContent({
                                    //     'format': 'text'
                                    // });
                                });
                            }
                        });
                    }
                });
            },
            // 刷新数据
            fetchData () {
                try {
                    let KeyID = this.$route.query.KeyID;
                    this.listQuery.KeyID = KeyID;
                    GetAwExamList(this.listQuery).then(response => {
                        this.subjectData = response.data;
                        this.Examinfo = response.data1;
                        let dt = new Date(response.value);
                        let timc = dt.valueOf() + ''; // .substring(0, dt.valueOf().length - 3);
                        timc = timc.substring(0, timc.length - 3);
                        let addtime = response.data1.AnsweTime * 60;
                        this.Examinfo.ExamEndTime = parseInt(timc) + addtime;
                        this.$refs.countdown.setEndTime(this.Examinfo.ExamEndTime);
                        for (let i = 0; i < this.subjectData.length; i++) {
                            let scls = this.subjectData[i].SubjecSubClass;
                            switch (scls) {
                                case 11:
                                    for (let j = 0; j < this.subjectData[i].subjectlist.length; j++) {
                                        let json = this.subjectData[i].subjectlist[j];
                                        json.RightAnswer = -1;
                                    }
                                    break;
                                case 12:
                                    for (let j = 0; j < this.subjectData[i].subjectlist.length; j++) {
                                        let json = this.subjectData[i].subjectlist[j];
                                        json.RightAnswer = [];
                                    }
                                    break;
                                case 20:

                                    break;
                                case 30:
                                    for (let j = 0; j < this.subjectData[i].subjectlist.length; j++) {
                                        let json = this.subjectData[i].subjectlist[j];
                                        json['tkanswer'] = [];
                                        let len = json.Stem.split('()').length - 1;
                                        for (let h = 0; h < len; h++) {
                                            json.tkanswer.push({
                                                value: ''
                                            });
                                        }
                                        this.subjectData[i].subjectlist[j] = json;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                        this.init();
                    }).catch(ex => {
                        console.log(ex);
                        this.$Spin.hide();
                        // this.$router.push({
                        //     name: 'examresindex',
                        //     query: []
                        // });
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            keepSaveData () {
                let examanswer = {
                    ExamID: this.listQuery.KeyID,
                    action: 'saveanswer',
                    type: 'edit',
                    answerlist: []
                };
                let sbdata = this.subjectData;
                for (let i = 0; i < sbdata.length; i++) {
                    for (let j = 0; j < sbdata[i].subjectlist.length; j++) {
                        let answer = sbdata[i].subjectlist[j];
                        let json = {
                            SubjectID: answer.KeyID,
                            RightAnswer: answer.RightAnswer,
                            SubjecSubClass: sbdata[i].SubjecSubClass,
                            tkanswer: JSON.stringify(answer.tkanswer),
                            CkClassID: sbdata[i].CkClassID
                        };
                        if (sbdata[i].SubjecSubClass === 12) {
                            json.RightAnswer = json.RightAnswer.join('|');
                        }
                        examanswer.answerlist.push(json);
                    }
                }
                examanswer.answerlist = JSON.stringify(examanswer.answerlist);
                SaveAnswer(examanswer).then(response => {
    
                });
            },
            // 页面切换限制
            handleExitScree (type) {
                if (this.isValidScree) {
                    if (!this.checkFull()) {
                        this.exitScreenTime += 1;
                        this.$Modal.confirm({
                            title: '题型',
                            'mask-closable': 'false',
                            content: '<p style="font-size:18px">页面已切换' + this.exitScreenTime +
                                '次,超过一定次数将自动提交试卷</p>',
                            onOk: () => {},
                            onCancel: () => {}
                        });
                        // 要执行的动作
                        if (this.Examinfo.SwitchNumLimit > 0) {
                            if (this.exitScreenTime > this.Examinfo.SwitchNumLimit) {
                                this.$Modal.confirm({
                                    title: '确认交卷',
                                    'mask-closable': 'false',
                                    content: '<p style="font-size:18px">页面切换超过限制，系统将在3秒后自动交卷</p>',
                                    onOk: () => {
                                        this.$Message.info('Clicked ok');
                                    },
                                    onCancel: () => {
                                        this.$Message.info('Clicked cancel');
                                    }
                                });
                                setTimeout(() => {
                                    this.$Modal.remove();
                                    this.fun_submitexam();
                                }, 3000);
                            }
                        }
                    }
                }
            },
            // 点击全屏
            handleFullscreen () {
                let main = document.body;
                if (this.Fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (main.requestFullscreen) {
                        main.requestFullscreen();
                    } else if (main.mozRequestFullScreen) {
                        main.mozRequestFullScreen();
                    } else if (main.webkitRequestFullScreen) {
                        main.webkitRequestFullScreen();
                    } else if (main.msRequestFullscreen) {
                        main.msRequestFullscreen();
                    }
                }
            },
            // 检查是否全屏
            checkFull () {
                var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document
                    .msFullscreenEnabled;

                // to fix : false || undefined == undefined
                if (isFull === undefined) isFull = false;
                return isFull;
            },
            // 请求后台提交试卷
            fun_submitexam () {
                this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'load-c',
                                    size: 28
                                }
                            }),
                            h('div', '提交试卷中')
                        ]);
                    }
                });

                let examanswer = {
                    ExamID: this.listQuery.KeyID,
                    action: 'saveanswer',
                    answerlist: []
                };
                let sbdata = this.subjectData;
                for (let i = 0; i < sbdata.length; i++) {
                    for (let j = 0; j < sbdata[i].subjectlist.length; j++) {
                        let answer = sbdata[i].subjectlist[j];
                        let json = {
                            SubjectID: answer.KeyID,
                            RightAnswer: answer.RightAnswer,
                            SubjecSubClass: sbdata[i].SubjecSubClass,
                            tkanswer: JSON.stringify(answer.tkanswer),
                            CkClassID: sbdata[i].CkClassID
                        };
                        if (sbdata[i].SubjecSubClass === 12) {
                            json.RightAnswer = json.RightAnswer.join('|');
                        }
                        examanswer.answerlist.push(json);
                    }
                }
                examanswer.answerlist = JSON.stringify(examanswer.answerlist);
                SaveAnswer(examanswer).then(response => {
                    this.$Notice.success({
                        title: '提交成功',
                        desc: '',
                        duration: 2
                    });
                    let query = {
                        config: JSON.stringify(response.data),
                        score: response.value
                    };
                    this.isValidScree = false;
                    this.$Spin.hide();
                    this.$router.push({
                        name: 'examresindex',
                        query: query
                    });
                });
                this.$Spin.hide();
            },
            callback (v) {
                return;
                this.$Modal.confirm({
                    title: '确认交卷',
                    'mask-closable': 'false',
                    content: '<p style="font-size:18px">答题时间到，系统将在3秒后自动交卷</p>',
                    onOk: () => {
                        this.$Message.info('Clicked ok');
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
                setTimeout(() => {
                    this.$Modal.remove();
                    this.fun_submitexam();
                }, 2000);
            },
            handlersubmit () {
                this.$Modal.confirm({
                    title: '确认交卷',
                    'mask-closable': 'false',
                    content: '<p style="font-size:18px">当前题目还未答完，是否确认交卷</p>',
                    onOk: () => {
                        this.fun_submitexam();
                    },
                    onCancel: () => {}
                });
            }
        }
    };
</script>