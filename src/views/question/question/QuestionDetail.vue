<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper :title="false" content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="标题"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            v-decorator="[
              'title',
              {rules: [{ required: true, message: '请输入标题' }]}
            ]"
            name="title"
            placeholder="给目标起个名字"/>
        </a-form-item>
        <a-form-item
          label="题库"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'bank',
          { rules: [{ required: true, message: '请选择题库！' }] },
        ]"
            placeholder="请选择题库！"
          >
            <a-select-option :key="index" :value="item.id" v-for="(item, index) in bankOptions">
              {{item.title}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="标签"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select mode="tags"
                    v-decorator="[
          'tags',
          {
            rules: [
              { required: true, message: '请输入标签', type: 'array' },
            ],
          },
        ]"
                    placeholder="Tags Mode">
            <a-select-option value="Java">
              Java
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="富文本类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
          'editorType',{ initialValue: editorType },
          { rules: [{ required: true, message: '请选择富文本类型！' }] },
        ]"
            placeholder="请选择富文本类型！"
            @change="handleSelectChange"
          >
            <a-select-option value="quillEditor">
              quillEditor
            </a-select-option>
            <a-select-option value="markdown">
              markdown
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="详情"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <quill-editor v-if="editorType == 'quillEditor'" @change="changeEditor"></quill-editor>
          <mark-down v-if="editorType == 'markdown'" @change="changeEditor"></mark-down>
        </a-form-item>

        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button htmlType="submit" type="primary">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { MarkDown, QuillEditor } from '@/components'
  import { getQuestionBankListAll, addQuestion } from '../../../api/auth/question'

  export default {
    name: 'QuestionDetail',
    components: {
      QuillEditor,
      MarkDown,
    },
    data () {
      return {
        editorType: 'quillEditor',
        source: '',
        render: '',
        form: this.$form.createForm(this),
        labelCol: {
          lg: { span: 4 },
          sm: { span: 24 },
        },
        wrapperCol: {
          lg: { span: 18 },
          sm: { span: 24 },
        },
        bankOptions: [],
      }
    },
    created () {
      this.getBanks()
    },
    methods: {
      getBanks () {
        getQuestionBankListAll().then(res => {
          this.bankOptions = res
        })
      },
      // handler
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            const body = {
              title: values.title,
              tags: values.tags,
              questionBankId: values.bank,
              editorType: values.editorType,
              source: this.source,
              html: this.render,
            }
            addQuestion(body).then(res => {
              this.$message.info('添加成功')
            })
          }
        })
      },
      handleSelectChange (value) {
        this.editorType = value
      },

      changeEditor (value, render) {
        this.source = value
        this.render = render
      },
    },
  }
</script>
