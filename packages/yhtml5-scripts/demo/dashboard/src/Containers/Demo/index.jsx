import React from 'react'
import { Card } from 'antd'
import connect from 'react-redux/es/connect/connect'
import { history } from '../../redux/store.js'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import Test from './Components/Test.jsx'
import { notRepeating } from '../../util/util.js'
import { toggleStatus } from './task.js'
import Layout from '../Layout/index';

function Component({ dispatch, props, app }) {
  console.log('DemoProps: ', props, app)

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '首页',
    }, {
      name: '列表',
    }, {
      name: '详情',
    }]
  }
  const testProps = {
    title: props.testTitle
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card className="y-m-b-40">
        <Test {...testProps} />
      </Card>
    </div>
  )
}

export default connect(state => {
  return {
    app: state.app,
    props: state.demo,
  }
})(Component)
