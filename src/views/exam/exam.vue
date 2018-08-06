<style lang="less">
    @import '../../styles/common.less';
    @import "./exam.less";
</style>
<template>
    <div>
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
                                    <div>
                                        <p class="margin-top-20 head-bm-line">
                                            <span>单选题(共1题，合计20.0分)</span>
                                        </p>
                                        <p>1已答</p>
                                    </div>
                                    <div>
                                        <p class="margin-top-20 head-bm-line">
                                            <span>多选题(共1题，合计20.0分，漏选错选不得分)</span>
                                        </p>
                                        <p>1已答</p>
                                    </div>
                                    <div>
                                        <p class="margin-top-20 head-bm-line">
                                            <span>填空题(共1题，合计20.0分)</span>
                                        </p>
                                        <p>1已答</p>
                                    </div>
                                    <div>
                                        <p class="margin-top-20 head-bm-line">
                                            <span>判断题(共1题，合计20.0分)</span>
                                        </p>
                                        <p>1已答</p>
                                    </div>
                                    <div>
                                        <p class="margin-top-20 head-bm-line">
                                            <span>问答题(共1题，合计20.0分)</span>
                                        </p>
                                        <p>1已答</p>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div class="box-exame pd-top10">
                        <p class="ft-size15">当前进度</p>
                        <Circle :percent="10" class="circle-rate">
                            <span class="demo-Circle-inner" style="font-size:15px">10%</span>
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
        created () {
            this.fetchData();
        },
        mounted () {
            this.init();
            setTimeout(() => {
                this.pageSpinShow = false;
            }, 2000);
            this.$nextTick(() => {

            });
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
                    console.log(222222);
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
                        let dt = new Date(this.Examinfo.ExamEndTime);
                        let timc = dt.valueOf() + ''; // .substring(0, dt.valueOf().length - 3);
                        timc = timc.substring(0, timc.length - 3);
                        this.Examinfo.ExamEndTime = timc;
                        this.$refs.countdown.setEndTime(timc);
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