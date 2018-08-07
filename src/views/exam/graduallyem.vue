<style lang="less">
  @import '../../styles/common.less';
  @import "./graduallyem.less";
</style>
<template>
  <div>
    <Row class="mg-top20" type="flex" justify="center">
      <Col span="18">
      <Row :gutter="50">
        <Col span="20">
        <div class="box">
          <template v-if="subjectData.length>0">
            <!-- 单选题 -->
            <div class="box-eame-item">
              <div class="box-head">
                <p> {{subjectData[hi].SbTitleName}}(共{{subjectData[hi].SubtSum}}题，合计{{subjectData[hi].SubScore}}分)</p>
              </div>
              <div class="box-content">
                <Row>
                  <Col span="11" class="bg-white box-border">
                  <div class="box-ans-content">
                    <p class="ft-nm">
                      <span class="fc-blue">{{ci+1}}.</span>{{subjectData[hi].subjectlist[ci].Stem}}({{subjectData[hi].subjectlist[ci].DefaultScore}}分)</p>
                    <!-- <p class="ft-nm">
                    <span class="fc-blue">1.</span> 一般性的拜访多以（）为最佳交往时间。(20.0分)</p> -->
                    <!-- <span class="span-lookjx">查看解析</span> -->
                  </div>
                  </Col>
                  <Col span="12" class="bg-white fl-r box-border">
                  <div class="box-ans-content">
                    <!-- 单选 -->
                    <template v-if="subjectData[hi].SubjecSubClass===11">
                      <Form :model="formItem" :label-width="80">
                        <RadioGroup v-model="subjectData[hi].subjectlist[ci].RightAnswer">
                          <template v-for=" (op,oi) in subjectData[hi].subjectlist[ci].SelectionOption.split('|')">
                            <Radio class="ft-nm margin-top-5 exam-answer" :label="oi+1">{{Letter[oi+1]}}. {{op}} </Radio>
                            </br>
                          </template>
                        </RadioGroup>
                      </Form>
                    </template>
                    <!-- 多选 -->
                    <template v-else-if="subjectData[hi].SubjecSubClass===12">
                      <Form class="examline-bottom" :model="formItem" :label-width="80">
                        <CheckboxGroup v-model="subjectData[hi].subjectlist[ci].RightAnswer">
                          <template v-for=" (op,oi) in subjectData[hi].subjectlist[ci].SelectionOption.split('|')">
                            <Checkbox class="ft-nm margin-top-5 exam-answer" :label="oi+1">{{Letter[oi+1]}}. {{op}} </Checkbox>
                            </br>
                          </template>
                        </CheckboxGroup>
                      </Form>
                    </template>
                    <!-- 判断 -->
                    <template v-else-if="subjectData[hi].SubjecSubClass===20">
                      <Form class="examline-bottom" :model="formItem" :label-width="80">
                        <RadioGroup v-model="subjectData[hi].subjectlist[ci].RightAnswer">
                          <Radio class="ft-nm margin-top-5 exam-answer" label="true">正确 </Radio>
                          </br>
                          <Radio class="ft-nm margin-top-5 exam-answer" label="false">错误</Radio>
                          </br>
                        </RadioGroup>
                      </Form>
                    </template>
                    <!-- 填空 -->
                    <template v-else-if="subjectData[hi].SubjecSubClass===30">
                      <Form class="examline-bottom" ref="formInline" :label-width="30">
                        <template v-for="(tk,ti) in subjectData[hi].subjectlist[ci].Stem.split('()').length-1">
                          <div class="margin-bottom-10 margin-top-10">
                            <Input v-model="subjectData[hi].subjectlist[ci].tkanswer[ti].value">
                            <span slot="prepend">
                              <span>&nbsp;{{ti+1}}&nbsp;</span>
                            </span>
                            </Input>
                          </div>
                        </template>
                      </Form>
                    </template>
                    <!-- 问答 -->
                    <template v-else-if="subjectData[hi].SubjecSubClass===30">
                      <Row class="examline-bottom">
                        <Col span="11" class="margin-top-10">
                        <textarea v-model="subjectData[hi].subjectlist[ci].RightAnswer" class='tinymce-textarea' :id="'tinymceEditer'+(ci+1)"></textarea>
                        </Col>
                      </Row>
                    </template>

                    <!-- <div class="analysis">
                      <div class="analysis-row">
                        <Row>
                          <Col span="6" class="ans-pd-left">正确答案</Col>
                          <Col span="18" class="word-wrap ans-pd-left">Blsjdflkjlkdjfljslfjdsflsjdfjsflsjjsdfosdfsdjfjsdlfjksjfklljklsjdfjkl</Col>
                        </Row>
                      </div>
                      <div class="analysis-row margin-top-8">
                        <Col span="6" class="ans-pd-left">解释说明</Col>
                        <Col span="18" class="word-wrap ans-pd-left">无</Col>
                      </div>
                    </div> -->
                  </div>
                  </Col>
                </Row>
              </div>
            </div>
          </template>
        </div>
        </Col>
        <Col :md="4" style="padding-left:39px">
        <div class="box-rate-top">
          <div class="box-exame">
            <div class="emrate-time">
              <p class="item-lable"> 剩余时间</p>
              <p class="emrate-tmv">
                <countdown ref="countdown" :endTime="Examinfo.ExamEndTime" :callback="callback" endText="已结束"></countdown>
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
                        <label>{{c}}题已答</label>&nbsp;&nbsp;
                      </template>
                    </div>
                  </template>
                </div>
              </Modal>
            </div>
          </div>

          <div class="box-exame">
            <div class="item-answer">
              <p :style="{display:showStatus.up}" class="emrate-ascard ft-size15 line-bottom" @click="handleup">
                上一题
              </p>
              <p :style="{display:showStatus.grayup}" style="color: gainsboro;" class="emrate-ascard ft-size15 line-bottom" @click="handleup">
                上一题
              </p>
            </div>
            <div class="item-answer">
              <p :style="{display:showStatus.down}" class="emrate-ascard ft-size15" @click="handledown">
                下一题
              </p>
              <p :style="{display:showStatus.graydown}" style="color: gainsboro;" class="emrate-ascard ft-size15" @click="handledown">
                下一题
              </p>
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
              percent: 0,
              Letter: util.Letter,
              nowSingleData: [],
              subjectData: [],
              answerCardlist: [],
              hi: 0, // 题库类型索引
              ci: 0, // 题库内容索引
              listQuery: {
                  action: 'getawexamlist',
                  KeyID: 0
              },
              showStatus: {
                  up: 'none',
                  grayup: 'block',
                  down: 'block',
                  graydown: 'none'
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
                  console.log(JSON.stringify(answerlist));
              },
              deep: true
          },
          'hi': {
              // 深度监听，可监听到对象、数组分值，总题数的变化
              handler (val, oldVal) {
                  let maxhiindex = this.subjectData.length - 1;
                  if (val === maxhiindex && this.ci === this.subjectData[maxhiindex].subjectlist.length - 1) {
                      this.showStatus.graydown = 'block';
                      this.showStatus.down = 'none';
                  } else if (val === 0 && this.ci === 0) {
                      this.showStatus.up = 'none';
                      this.showStatus.grayup = 'block';
                  } else {
                      this.showStatus.up = 'block';
                      this.showStatus.grayup = 'none';
                  }
              },
              deep: true
          },
          'ci': {
              // 深度监听，可监听到对象、数组分值，总题数的变化
              handler (val, oldVal) {
                  let maxhiindex = this.subjectData.length - 1;
                  if (this.hi === maxhiindex && val === this.subjectData[maxhiindex].subjectlist.length - 1) {
                      this.showStatus.graydown = 'block';
                      this.showStatus.down = 'none';
                  } else if (this.hi === 0 && val === 0) {
                      this.showStatus.up = 'none';
                      this.showStatus.grayup = 'block';
                  } else {
                      this.showStatus.up = 'block';
                      this.showStatus.grayup = 'none';
                      this.showStatus.graydown = 'none';
                      this.showStatus.down = 'block';
                  }
              },
              deep: true
          }
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
                      this.nowSingleData = this.subjectData[0];
                  }).catch(ex => {
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
              console.log('到时间了');
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
              let content = '';
              if (this.percent !== 100) {
                  content = '<p style="font-size:18px">当前题目还未答完，是否确认交卷</p>';
              } else {
                  content = '<p style="font-size:18px">确认交卷吗</p>';
              }
              this.$Modal.confirm({
                  title: '确认交卷',
                  'mask-closable': 'false',
                  content: content,
                  onOk: () => {
                      this.fun_submitexam();
                  },
                  onCancel: () => {}
              });
          },
          btnsetgray () {

          },
          handleup () {
              if (this.hi > 0 && this.ci === 0) {
                  this.hi = this.hi - 1;
                  if (this.ci > 0) {
                      this.ci = this.ci - 1;
                  } else if (this.ci === 0) {
                      this.ci = this.subjectData[this.hi].subjectlist.length - 1;
                  }
              } else {
                  if (this.ci > 0) {
                      this.ci = this.ci - 1;
                  }
              }
          },
          handledown () {
              if (this.hi === this.subjectData.length - 1 && this.subjectData[this.hi].subjectlist.length - 1 === this.ci) {
                  return;
              }
              if (this.ci === this.subjectData[this.hi].subjectlist.length - 1) {
                  this.hi = this.hi + 1;
                  this.ci = 0;
              } else {
                  this.ci = this.ci + 1;
              }
          }
      }
  };
</script>