import { Form, Input, Button, Checkbox, Select, message, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getLocationApi } from '../../services/itemLocationService';
import { getRackDetApi, insertRackDetailsApi } from '../../services/itemRackService';

const AddRack = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const {forEdit} = props;
  const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [locationList, setlocationList] = useState([])
  const locateId = props?.match?.params?.locate;
  const RId = props?.match?.params?.id;
  const rackReducer = useSelector(state => state.racks);
  const [previousValues, setPreviousValues] = useState(forEdit ? rackReducer?.racks[RId] : {});

  useEffect(() => {
    dispatch(
      getLocationApi((val) => {
        setlocationList(val)
      })
    )

    if(forEdit && previousValues === undefined) {
      dispatch(getRackDetApi(locateId, (value) => {}))
    }
  }, [])

  useEffect(() => {
    setPreviousValues(rackReducer?.racks[RId]);
  }, [rackReducer?.racks[RId]])

  useEffect(() => {
    if(previousValues !== undefined){
      form.resetFields()
    }
  }, [previousValues])

  const onFinish = (values) => {
    setButDis(true)
    let data = {
      "RId": forEdit ? RId : 0,
      "RackCode": values?.RackCode,
      "RackName": values?.RackName,
      "LocationId": values?.LocationId,
      "IsActive": values?.IsActive
    }
    dispatch(insertRackDetailsApi(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
        message.success(res?.Message)
        setTimeout(() => {
          history.push('/rack')
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
    <AddRackContainer>
      <Row justify='center'>
        <Col span={16}>
          <Form
          form={form}
            name="add_items"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18
            }}
            initialValues={previousValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Rack Code"
              name="RackCode"
              rules={[
                {
                  required: true,
                  message: 'Please input rack code!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Rack name"
              name="RackName"
              rules={[
                {
                  required: true,
                  message: 'Please input Rack name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Location"
              name="LocationId"
              rules={[
                {
                  required: true,
                  message: 'Please select Location!',
                },
              ]}
            >
              <Select allowClear>
                {locationList?.map(iTy => {
                  return (
                    <Option value={iTy?.LId}>
                      {iTy?.Location}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <Form.Item
              name="IsActive"
              valuePropName="checked"
            >
              <Checkbox>Is Active</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button htmlType="submit" disabled={butDis} className='btnPrimary'>
                {forEdit ? 'edit' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </Col>

      </Row>
    </AddRackContainer>
  );
};

export default AddRack;

const AddRackContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`