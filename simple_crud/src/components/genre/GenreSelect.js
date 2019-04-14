import React, { Fragment, PureComponent } from 'react';

import { genre_list_api } from 'actions/genre_action';

class GenreSelect extends PureComponent {
    constructor(props){
        super(props);
        this.state = { genres : [] };
    }

    componentDidMount() {
        genre_list_api()
            .then(res => {
                const { status } = res;
                if(status === 200) {
                    const { data } = res;
                    this.setState({
                        genres: data
                    });
                }
            })
            .catch(error => {
                alert(error && error.message);
            });
    }

    _render_options = () => {
        const { genres } = this.state;
        return genres.map(genre => <option key={ genre.id } value={ JSON.stringify(genre) }>{ genre.name }</option>);
    }

    render() {
        const { name, value, act_change } = this.props;
        return (
            <Fragment>
                <select id="genre" className="form-control" name={ name } value={ value } onChange={ act_change }>
                    <option value="null">-- 선택 --</option>
                    { this._render_options() }                
                </select> 
            </Fragment>
        )
    }
}

export default GenreSelect;