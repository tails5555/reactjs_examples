import React from 'react';

const FieldProperty = ({ name, value, act_change }) => (
    <input type="text" className="form-control" name={ name } value={ value } onChange={ act_change } />
);

export default FieldProperty;