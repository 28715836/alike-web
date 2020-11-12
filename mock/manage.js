const totalCount = 100
module.exports = {
  'GET /api/question/banks': (req, res) => {
    const result = []
    for (let i = 1; i < 10; i++) {
      result.push({
        title: 'Java基础',
        desc: '这是一段描述',
      })
    }
    res.send({
      pageSize: 1,
      pageNo: 20,
      totalCount: totalCount,
      totalPage: 20,
      data: result,
    })
  },
}
