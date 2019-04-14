import React, { Fragment, PureComponent } from 'react';

import FieldProperty from 'components/input/FieldProperty';
import GenreSelect from 'components/genre/GenreSelect';

class Instance extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            music : {
                title: '', singer: '', year: 0, genre: null
            }
        };
    }

    _handle_change(event) {
        const { music } = this.state;
        const { name, value } = event.target;
        if(name === 'genre') {
            this.setState({
                music: { 
                    ...music,
                    [ name ] : JSON.parse(value)
                }
            });
        } else {
            this.setState({
                music: { 
                    ...music,
                    [ name ] : value
                }
            });
        }
    }

    render() {
        const { act_submit } = this.props;
        const { music } = this.state;
        return (
            <Fragment>
                <form>
                    <div className="form-group">
                        <label>제목</label>
                        <FieldProperty name="title" value={ music.title } act_change={ this._handle_change.bind(this) } />
                    </div>
                    <div className="form-group">
                        <label>가수</label>
                        <FieldProperty name="singer" value={ music.singer } act_change={ this._handle_change.bind(this) } />
                    </div>
                    <div className="form-group">
                        <label>연도</label>
                        <FieldProperty name="year" value={ music.year } act_change={ this._handle_change.bind(this) } />
                    </div>
                    <div className="form-group">
                        <label>장르</label>
                        <GenreSelect name="genre" value={ JSON.stringify(music.genre) } act_change={ this._handle_change.bind(this) } />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <button type="button" className="btn btn-success btn-block" onClick={ () => act_submit('CREATE', music)}>
                            <i className="fas fa-check" /> 추가
                        </button>
                    </div>    
                </form>
            </Fragment>
        )
    }
}

export default Instance;