import React from 'react'
import styled from 'styled-components'
import {CaretDownFilled} from '@ant-design/icons'
import { Menu, Dropdown, Button, Space } from 'antd'

const menu = (
  <Menu>
    <Menu.Item>
      <a target='_blank' rel='noopener noreferrer' href='#'>settings</a>
    </Menu.Item>
    <Menu.Item>
      <a target='_blank' rel='noopener noreferrer' href='#'>log-out</a>
    </Menu.Item>
    
  </Menu>
)

const UserBar = () => {
  
  return (
    <UserBarContainer>
      <div className="userIcon">
        <img src="./Assets/images/user.webp" alt="" />
      </div>
      <span className='userName'>user user</span>
      <Dropdown overlay={menu}  placement="bottomCenter">
        <CaretDownFilled />
      </Dropdown>
      
    </UserBarContainer>
  )
}

export default UserBar


const UserBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .userIcon{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .userName{
    font-size: 16px;

  }
` 