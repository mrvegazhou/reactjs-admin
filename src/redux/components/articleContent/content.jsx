import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import './content.less';

const Content = ({ data: { content, updatedAt, avatar, owner, href } }) => (
    <div className='listContent'>
        <div className='description'>{content}</div>
        <div className='extra'>
            <Avatar src={avatar} size="small" />
            <a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
            <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
        </div>
    </div>
);

export default Content;
