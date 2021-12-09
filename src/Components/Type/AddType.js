import { Form, Input, Button, message, Row, Col, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getItemTypeApi, insertItemTypeApi } from '../../services/itemItemTypeService';
import { formItemLayout } from '../Common/FormItemLayout';

const AddType = (props) => {
  const [form] = Form.useForm()
  const history = useHistory();
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const TId = props?.match?.params?.id;
  const itemTypeReducer = useSelector(state => state.itemTypes);
  const [previousValues, setPreviousValues] = useState(forEdit ? itemTypeReducer?.itemTypes[TId] : {});

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getItemTypeApi((avl) => { }))
    }
  }, [])

  useEffect(() => {
    setPreviousValues(itemTypeReducer?.itemTypes[TId]);
  }, [itemTypeReducer?.itemTypes[TId]])

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields()
    }
  }, [previousValues])


  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "TId": forEdit ? TId : 0,
      "ItemType": values?.ItemType,
      "IsActive": values?.IsActive !== undefined ? true : false,
    }
    dispatch(insertItemTypeApi(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
        message.success(res?.Message)
        setTimeout(() => {
          history.push('/type')
        }, 1000);
      } else {
        setButDis(false)
        message.error('Something went wrong. Try again')
      }
    }))
  };

  const onFinishFailed = (errorInfo) => {
    setButDis(false)
  };

  return (
    <AddTypeContainer>
      <Row justify='center'>
        <Col span={16}>
          <Form
            form={form}
            name="add_items"
            {...formItemLayout}
            initialValues={previousValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Item Type name"
              name="ItemType"
              rules={[
                {
                  required: true,
                  message: 'Please input item type name!',
                },
              ]}
            >
              <Input />
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
    </AddTypeContainer>
  );
};

export default AddType;

const AddTypeContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`