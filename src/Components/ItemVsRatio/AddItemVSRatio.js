import { Form, Button, DatePicker, Select, InputNumber, message, Row, Col, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getLabItemsApi } from '../../services/itemNewItemService';
import { getItemVsRatioApi, getTestListApi, insertItemVsRatioApi } from '../../services/itemVsRatioService';
import moment from 'moment';
import { tokenString } from '../Common/HandleUser';
import { formItemLayout } from '../Common/FormItemLayout';

const AddItemVsRatio = (props) => {
  const { forEdit } = props;
  const [form] = Form.useForm()
  const history = useHistory();
  const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setitemList] = useState([])
  const [testList, settestList] = useState([])
  const RId = props?.match?.params?.id;
  const itemRatioReducer = useSelector(state => state.itemRatio);
  const [previousValues, setPreviousValues] = useState(forEdit ? itemRatioReducer?.itemRatios[RId] : {});

  const dateFormat = 'YYYY-MM-DD';

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getItemVsRatioApi((val) => { }, RId))
    }
    getAllLabItem()
  }, [])

  useEffect(() => {
    setPreviousValues(itemRatioReducer?.itemRatios[RId]);
  }, [itemRatioReducer?.itemRatios[RId]])

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields()
    }
  }, [previousValues])

  const getAllLabItem = (ty = 0, cI = 0) => {
    let data = {
      typeId: ty,
      categoryId: cI
    }
    dispatch(getLabItemsApi(data, (val) => {
      setitemList(val)
    }))

    dispatch(getTestListApi((val) => {
      settestList(val)
    }))
  }

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "RId": forEdit ? RId : 0,
      "ItemId": values?.ItemId,
      "TestId": values?.TestId,
      "ItemPerUnitTest": values?.ItemPerUnitTest,
      "IsActive": values?.IsActive !== undefined ? true : false,
      "CreatedDate": values?.CreatedDate.format('YYYY-MM-DD'),
      "CreatedBy": tokenString.UId
    }
    dispatch(insertItemVsRatioApi(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
        message.success(res?.Message)
        setTimeout(() => {
          history.push('/itemvsratio')
        }, 1000);
      } else {
        setButDis(false)
        message.error('Something went wrong try again')
      }
    }))
  };

  const onFinishFailed = (errorInfo) => {
    setButDis(false)
  };

  let prevVal = {}
  if (previousValues !== undefined) {
    prevVal = {
      ...previousValues,
      CreatedDate: moment(previousValues?.CreatedDate)
    }

    // console.log(prevVal);
  }

  return (
    <AddItemVsRatioContainer>
      <Row justify='center'>
        <Col span={16}>
          <Form
            form={form}
            name="add_items"
            {...formItemLayout}
            initialValues={prevVal}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >

            <Form.Item
              label="Test Name"
              name="TestId"
              rules={[
                {
                  required: true,
                  message: 'Please select test!',
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="select a test"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear>
                {testList?.map(iTy => {
                  return (
                    <Option
                      title={iTy?.Testname}
                      key={iTy?.Id}
                      value={iTy?.Id}>
                      {iTy?.Testname}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Item Name"
              name="ItemId"
              rules={[
                {
                  required: true,
                  message: 'Please input item name!',
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="select an item"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear>
                {itemList?.map(iTy => {
                  return (
                    <Option
                      title={iTy?.ItemName}
                      key={iTy?.TId}
                      value={iTy?.TId}>
                      {iTy?.ItemName}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Item Per Unit Test"
              name="ItemPerUnitTest"
              rules={[
                {
                  required: true,
                  message: 'Please input Item Per Unit Test!',
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Created Date"
              name="CreatedDate"
              rules={[
                {
                  required: true,
                  message: 'Please input Created Date!',
                },
              ]}
            >
              <DatePicker
                format={dateFormat}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label='Is Active'
              name="IsActive"
              valuePropName="checked"
            >
              <Switch defaultChecked />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button htmlType="submit" disabled={butDis} className='btnPrimary'>
                {forEdit ? 'Edit' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </Col>

      </Row>
    </AddItemVsRatioContainer>
  );
};

export default AddItemVsRatio;

const AddItemVsRatioContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  margin-bottom: 50px;
`