import React, { Fragment, PureComponent } from 'react';

import { music_list_api } from 'actions/music_action';

import Property from './music/Property';
import Element from './music/Element';

class MusicList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { musics: [], selected: null };
    }
    
    componentDidMount() {
        music_list_api()
            .then(res => {
                const { status } = res;
                if(status === 200) {
                    const { data } = res;
                    const init_musics = data.map(music => ({ ...music, checked : false }));
                    this.setState({
                        musics: init_musics
                    });
                }
            })
            .catch(error => {
                alert(error && error.message);
            });
    }

    _render_musics = () => {
        const { musics } = this.state;
        if(musics.length > 0) {
            return musics.map(music => <Element music={ music } key={ music.id } />);
        } else {
            return (
                <tr>
                    <td colSpan="6">
                        <p className="text-center">등록하신 음악이 없습니다.</p>
                    </td>
                </tr>
            );
        }
    }

    render() {
        return (
            <Fragment>
                <table className="table table-striped">
                    <thead>
                        <Property />
                    </thead>
                    <tbody>
                        { this._render_musics() }
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default MusicList;