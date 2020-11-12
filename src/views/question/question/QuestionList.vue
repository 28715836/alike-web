<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="标题">
                <a-input v-model="queryParam.title" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :sm="8">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="tags" slot-scope="text">

        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="getDetail(record)">查询</a>
            <a-divider type="vertical"/>
            <a @click="handleDetele(record)">删除</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { Ellipsis, STable } from '@/components'
  import { getQuestionBankList } from '@/api/auth/question'

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      scopedSlots: { customRender: 'tags' }
    },
    {
      title: '浏览量',
      dataIndex: 'readNum'
    },
    {
      title: '收藏量',
      dataIndex: 'fovarNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' }
    }
  ]

  export default {
    name: 'QuestionBank',
    components: {
      STable,
      Ellipsis
    },
    data () {
      this.columns = columns
      return {
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          console.log('loadData.parameter', parameter)
          return getQuestionBankList(Object.assign(parameter, this.queryParam))
            .then(res => {
              console.log(res)
              return res
            })
        },
      }
    },
    filters: {

    },
    created () {

    },
    computed: {

    },
    methods: {
      handleAdd () {
        this.mdl = null
        this.visible = true
      },
      getDetail (record) {
        this.$router.push({
          path: '/question/'
        })
      }
    },
  }
</script>
