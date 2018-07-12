<style lang="less">
    @import '../../styles/common.less';
    @import "./exam.less";
</style>
<template>
    <Row class="mg-top20" type="flex" justify="center">
        <Col span="18">
        <Row :gutter="50">
            <Col span="20">
            <div class="box">
                <!-- 单选题 -->
                <div class="box-eame-item">
                    <div class="box-head">
                        <p> 单选题(共1题，合计20.0分)</p>
                    </div>
                    <div class="box-content">
                        <Row>
                            <Col span="22">
                            <p class="ft-nm">
                                <span class="fc-blue">1.</span> 一般性的拜访多以（）为最佳交往时间。(20.0分)</p>
                            <Form :model="formItem" :label-width="80">
                                <RadioGroup v-model="formItem.radio">
                                    <Radio class="ft-nm margin-top-5 exam-answer" label="A">A. 1小时左右 </Radio>
                                    </br>
                                    <Radio class="ft-nm margin-top-5 exam-answer" label="B">B. 半小时左右 </Radio>
                                    </br>
                                    <Radio class="ft-nm margin-top-5 exam-answer" label="C">C. 十分钟左右 </Radio>
                                    </br>
                                </RadioGroup>
                            </Form>
                            </Col>
                            <Col span="2">
                            <span> 标记</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <!-- 多选题 -->
                <div class="box-eame-item">
                    <div class="box-head">
                        <p> 多选题(共1题，合计20.0分，漏选错选不得分)</p>
                    </div>
                    <div class="box-content">
                        <Row>
                            <Col span="22">
                            <p class="ft-nm">
                                <span class="fc-blue">1.</span>
                                以目的的不同为标准划分的拜访类型有 (20.0分)
                            </p>
                            <Form :model="formItem" :label-width="80">
                                <CheckboxGroup v-model="formItem.checkbox">
                                    <Checkbox class="ft-nm margin-top-5 exam-answer" label="A">A. 商业拜访
                                    </Checkbox>
                                    </br>
                                    <Checkbox class="ft-nm margin-top-5 exam-answer" label="B">B. 政治拜访
                                    </Checkbox>
                                    </br>
                                    <Checkbox class="ft-nm margin-top-5 exam-answer" label="C">C. 情感拜访
                                    </Checkbox>
                                    </br>
                                    <Checkbox class="ft-nm margin-top-5 exam-answer" label="C">D. 礼节性拜访
                                    </Checkbox>
                                    </br>
                                </CheckboxGroup>
                            </Form>
                            </Col>
                            <Col span="2">
                            <span> 标记</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <!-- 填空题 -->
                <div class="box-eame-item">
                    <div class="box-head">
                        <p> 填空题(共1题，合计20.0分)</p>
                    </div>
                    <div class="box-content">
                        <Row>
                            <Col span="22" class="exam-pdlr25">
                            <p class="ft-nm">
                                <span class="fc-blue">1.</span>
                                打招呼的方式一般有（）（）（）（） (20.0分)
                            </p>
                            <Row>
                                <Col span="11" class="margin-top-20">
                                <Form ref="formInline" :label-width="30">
                                    <FormItem label="（1）">
                                        <Input placeholder=""></Input>
                                    </FormItem>
                                    <FormItem label="（2）">
                                        <Input placeholder=""></Input>
                                    </FormItem>
                                    <FormItem label="（3）">
                                        <Input placeholder=""></Input>
                                    </FormItem>
                                    <FormItem label="（4）">
                                        <Input placeholder=""></Input>
                                    </FormItem>
                                </Form>
                                </Col>
                            </Row>

                            </Col>
                            <Col span="2">
                            <span> 标记</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <!-- 判断题 -->
                <div class="box-eame-item">
                    <div class="box-head">
                        <p>判断题(共1题，合计20.0分)</p>
                    </div>
                    <div class="box-content">
                        <Row>
                            <Col span="22" class="exam-pdlr25">
                            <p class="ft-nm">
                                <span class="fc-blue">1.</span>
                                与他人交谈完毕就可以立即转身离开。 (20.0分)
                            </p>

                            <Form :model="formItem" :label-width="80">
                                <RadioGroup v-model="formItem.radio">
                                    <Radio class="ft-nm margin-top-5 exam-answer" label="A">正确 </Radio>
                                    </br>
                                    <Radio class="ft-nm margin-top-5 exam-answer" label="B">错误</Radio>
                                    </br>
                                </RadioGroup>
                            </Form>
                            </Col>
                            <Col span="2">
                            <span> 标记</span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <!-- 问答题 -->
                <div class="box-eame-item">
                    <div class="box-head">
                        <p> 问答题(共1题，合计20.0分)</p>
                    </div>
                    <div class="box-content">
                        <Row>
                            <Col span="22" class="exam-pdlr25">
                            <p class="ft-nm">
                                <span class="fc-blue">1.</span>
                                请简单说一下你对老唐帅气的理解。 (20.0分)
                            </p>
                            <Row>
                                <Col span="11" class="margin-top-10">
                                <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
                                </Col>
                            </Row>

                            </Col>
                            <Col span="2">
                            <span> 标记</span>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            </Col>
            <Col :md="4" style="padding-left:39px">
            <div class="box-rate-top">
                <div class="box-exame">
                    <div class="emrate-time">
                        <p class="item-lable"> 剩余时间</p>
                        <p class="emrate-tmv">00:49:51</p>
                    </div>
                    <div class="item-answer">
                        <p class="emrate-ascard ft-size15"><Icon class="ansico" type="clipboard"></Icon>答题卡</p>
                    </div>
                </div>
                <div class="box-exame pd-top10">
                    <p class="ft-size15">当前进度</p>
                    <Circle :percent="10" class="circle-rate">
                        <span class="demo-Circle-inner" style="font-size:15px">10%</span>
                    </Circle>
                </div>
                <Button type="primary" style="width:100%">提交</Button>
            </div>
            </Col>
        </Row>
        </Col>
    </Row>
</template>
<script>
    import tinymce from 'tinymce';
    export default {
        name: 'exam',
        data () {
            return {
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
                    tinymce.init({
                        selector: '#tinymceEditer',
                        branding: false,
                        elementpath: false,
                        language: 'zh_CN.GB2312',
                        height: '150',
                        width: '600px',
                        setup: function (editor) {
                            editor.on('init', function (e) {
                                vm.spinShow = false;
                                if (localStorage.editorContent) {
                                    tinymce.get('tinymceEditer').setContent(localStorage.editorContent);
                                }
                            });
                            editor.on('keydown', function (e) {
                                localStorage.editorContent = tinymce.get('tinymceEditer').getContent({'format': 'text'
                                });
                            });
                        }
                    });
                });
            }
        }
    };
</script>