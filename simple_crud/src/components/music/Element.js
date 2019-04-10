import React from 'react';

import GenreSelect from 'components/genre/GenreSelect';

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
        <td>{ !music.checked ? music.singer : <InputProperty name="singer" value={ music.singer } act_change={ changeAction } /> }</td>
        <td>{ !music.checked ? music.year : <InputProperty name="year" value={ music.year } act_change={ changeAction } /> }</td>
        <td>{ !music.checked ? music.genre && music.genre.name : <GenreSelect name="genre" value={ JSON.stringify(music.genre) }  act_change={ changeAction } /> }</td>
        <td>
            <CheckButton checked={ music.checked } act_edit={ editAction } act_cancel={ cancelAction } />
        </td>
    </tr>
);

export default Element;