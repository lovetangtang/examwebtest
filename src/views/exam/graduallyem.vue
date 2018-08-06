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
          <!-- 单选题 -->
          <div class="box-eame-item">
            <div class="box-head">
              <p> 单选题(共1题，合计20.0分)</p>
            </div>
            <div class="box-content">
              <Row>
                <Col span="11" class="bg-white box-border">
                <div class="box-ans-content">
                  <p class="ft-nm">
                    <span class="fc-blue">1.</span> 一般性的拜访多以（）为最佳交往时间。(20.0分)</p>
                  <span class="span-lookjx">查看解析</span>
                </div>
                </Col>
                <Col span="12" class="bg-white fl-r box-border">
                <div class="box-ans-content">
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
                  <div class="analysis">
                    <div class="analysis-row">
                      <Row>
                        <Col span="6" class="ans-pd-left">正确答案</Col>
                        <Col span="18"class="word-wrap ans-pd-left">Blsjdflkjlkdjfljslfjdsflsjdfjsflsjjsdfosdfsdjfjsdlfjksjfklljklsjdfjkl</Col>
                      </Row>
                    </div>
                    <div class="analysis-row margin-top-8">
                      <Col span="6" class="ans-pd-left">解释说明</Col>
                      <Col span="18" class="word-wrap ans-pd-left">无</Col>
                    </div>
                  </div>
                </div>
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
              <p class="emrate-tmv">
                <countdown endTime="1533290400" :callback="callback" endText="已结束"></countdown>
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
          <div class="box-exame">
            <div class="item-answer">
              <p class="emrate-ascard ft-size15 line-bottom">
               上一题
              </p>
            </div>
            <div class="item-answer">
              <p class="emrate-ascard ft-size15">
                下一题
              </p>
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
  import countdown from './countdown.vue';
  export default {
      name: 'exam',
      components: {
          countdown
      },
      data () {
          return {
              ansmodal: false,
              pageSpinShow: true,
              formItem: {
                  radio: 'male',
                  checkbox: []
              }
          };
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
              setTimeout(() => {
                  this.$Spin.hide();
                  this.$router.push({
                      name: 'examresindex',
                      query: []
                  });
              }, 3000);
          },
          callback (v) {
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
                      this.$Message.info('Clicked ok');
                      this.fun_submitexam();
                  },
                  onCancel: () => {
                      this.$Message.info('Clicked cancel');
                  }
              });
          }
      }
  };
</script>