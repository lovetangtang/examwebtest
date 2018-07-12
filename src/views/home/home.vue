<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main mg-top">
        <Row>
            <Col span="20" class="ft-lg">当前考试</Col>
            <Col span="4" class="ft-cs">
            <Dropdown class="fl-right">
                <a href="javascript:void(0)">
                    全部考试
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>驴打滚</DropdownItem>
                    <DropdownItem>炸酱面</DropdownItem>
                    <DropdownItem disabled>豆汁儿</DropdownItem>
                    <DropdownItem>冰糖葫芦</DropdownItem>
                    <DropdownItem divided>北京烤鸭</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </Col>
        </Row>
        <div class="divide_line1"></div>
        <Row :gutter="12">
            <Col :xs="24">
            <Row class-name="home-page-row1" :gutter="10">
                <template v-for="item in examlist">
                    <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
                    <Card class="bd-left-true box-amt">
                        <b class="card-user-infor-name">{{item.examName}}</b>
                        <div class="divide_line"></div>
                        <div class="pd-home-sj">
                            <Row>
                                <Col span="24">
                                <div>
                                    {{item.emStartTime}}到{{item.emEndTime}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    总分：{{item.emMark}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    组卷方式：{{item.rollType}}
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                <div>
                                    考试时长：{{item.examTime}}分钟
                                </div>
                                </Col>
                                <Col span="12" class="tx-r">
                                <Button type="primary" class="mg-btm" @click="fun_startexam(item)">开始</Button>
                                </Col>
                            </Row>
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
    export default {
        name: 'home',
        data () {
            return {
                examlist: [{
                    examName: '语文考试',
                    emStartTime: '2018-07-10 17:04',
                    emEndTime: '2018-07-10 17:04',
                    emMark: '100',
                    rollType: '随机组卷',
                    examTime: '60'
                }, {
                    examName: '数学考试',
                    emStartTime: '2018-07-10 17:04',
                    emEndTime: '2018-07-10 17:04',
                    emMark: '150',
                    rollType: '随机组卷',
                    examTime: '60'
                }, {
                    examName: '英语考试',
                    emStartTime: '2018-07-10 17:04',
                    emEndTime: '2018-07-10 17:04',
                    emMark: '120',
                    rollType: '随机组卷',
                    examTime: '60'
                }, {
                    examName: '体育考试',
                    emStartTime: '2018-07-10 17:04',
                    emEndTime: '2018-07-10 17:04',
                    emMark: '100',
                    rollType: '随机组卷',
                    examTime: '60'
                }]
            };
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
            fun_startexam (item) {
                let routeData = this.$router.resolve({
                    name: 'emstindex',
                    query: item,
                    params: {}
                });
                window.open(routeData.href, '_blank');
            },
            addNewToDoItem () {
                this.showAddNewTodo = true;
            },
            addNew () {
                if (this.newToDoItemValue.length !== 0) {
                    this.toDoList.unshift({
                        title: this.newToDoItemValue
                    });
                    setTimeout(() => {
                        this.newToDoItemValue = '';
                    }, 200);
                    this.showAddNewTodo = false;
                } else {
                    this.$Message.error('请输入待办事项内容');
                }
            },
            cancelAdd () {
                this.showAddNewTodo = false;
                this.newToDoItemValue = '';
            }
        }
    };
</script>