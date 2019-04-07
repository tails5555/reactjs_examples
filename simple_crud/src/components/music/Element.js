import React from 'react';

const Element = ({ music }) => (
    <tr>
        <td>{ music.id }</td>
        <td>{ music.title }</td>
        <td>{ music.singer }</td>
        <td>{ music.year }</td>
        <td>{ music.genre && music.genre.name }</td>
        <td>버튼</td>
    </tr>
);

export default Element;