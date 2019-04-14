import React from 'react';

import GenreSelect from 'components/genre/GenreSelect';
import FieldProperty from 'components/input/FieldProperty';

const ButtonGroup = ({ children }) => (
    <div className="btn-group">
        { children }
    </div>
);

const CheckButton = ({ checked, act_edit, act_cancel }) => 
    !checked ?
        <button onClick={ act_edit } className="btn btn-info">
            <i className="fas fa-edit" />
        </button> :
        <button onClick={ act_cancel } className="btn btn-danger">
            <i className="fas fa-times" />
        </button>

const SubmitButton = ({ act_submit }) => 
    <button onClick={ act_submit } className="btn btn-success">
        <i className="fas fa-save" />
    </button>

const Element = ({ music, changeAction, editAction, cancelAction, updateAction }) => (
    <tr>
        <td>{ music.id }</td>
        <td>{ !music.checked ? music.title : <FieldProperty name="title" value={ music.title } act_change={ changeAction } /> }</td>
        <td>{ !music.checked ? music.singer : <FieldProperty name="singer" value={ music.singer } act_change={ changeAction } /> }</td>
        <td>{ !music.checked ? music.year : <FieldProperty name="year" value={ music.year } act_change={ changeAction } /> }</td>
        <td>{ !music.checked ? music.genre && music.genre.name : <GenreSelect name="genre" value={ JSON.stringify(music.genre) } act_change={ changeAction } /> }</td>
        <td className="text-center">
            <ButtonGroup>
                <CheckButton checked={ music.checked } act_edit={ editAction } act_cancel={ cancelAction } />
                { music.checked ? <SubmitButton act_submit={ updateAction } /> : null }
            </ButtonGroup>
        </td>
    </tr>
);

export default Element;