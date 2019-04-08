import React from 'react';

const CheckButton = ({ checked, act_edit, act_cancel }) => 
    !checked ?
        <button onClick={ act_edit } className="btn btn-info">
            <i className="fas fa-edit" /> 편집
        </button> :
        <button onClick={ act_cancel } className="btn btn-danger">
            <i className="fas fa-times" /> 취소
        </button>

const InputProperty = ({ name, value, act_change }) => 
    <input type="text" className="form-control" name={ name } value={ value } onChange={ act_change } />

const Element = ({ music, changeAction, editAction, cancelAction }) => (
    <tr>
        <td>{ music.id }</td>
        <td>{ !music.checked ? music.title : <InputProperty name="title" value={ music.title } act_change={ changeAction } /> }</td>
        <td>{ music.singer }</td>
        <td>{ music.year }</td>
        <td>{ music.genre && music.genre.name }</td>
        <td onClick={ !music.checked ? editAction : cancelAction }>
            <CheckButton checked={music.checked} editAction={editAction} cancelAction={cancelAction} />
        </td>
    </tr>
);

export default Element;