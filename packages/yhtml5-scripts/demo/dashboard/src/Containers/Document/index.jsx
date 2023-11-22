import React from 'react'
import { Card } from 'antd'
import connect from 'react-redux/es/connect/connect'
import { history } from '../../redux/store.js'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import Document from './Components/Document.jsx'
import { notRepeating } from '../../util/util.js'
import { toggleStatus } from './task.js'
import Layout from '../Layout/index'

function Component({ dispatch, props, app }) {
  //console.log('DocumentProps: ', props)

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '首页',
    }, {
      name: '系统功能',
    }, {
      name: '开发文档',
    }]
  }
  const testProps = {
    title: props.testTitle
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card className="y-m-b-40">
        <Document {...testProps} />
      </Card>
    </div>
  )
}

export default connect(state => {
  return {
    app: state.app,
    props: state.document,
  }
})(Component)
