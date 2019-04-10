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
            return musics.map(music => (
                <Element 
                    key={ music.id } 
                    music={ music } 
                    changeAction={ (event) => this._handle_change_property(music.id, event) }
                    editAction={ () => this._handle_click_checking(music, true) } 
                    cancelAction={ () => this._handle_click_checking(music, false) } 
                />
            ));
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

    _handle_click_checking = (music, check_var) => {
        const { musics, selected } = this.state;
        
        let tmp_musics;
        if(!check_var) {
            // 시나리오 01. 음악을 수정하고 갑작스럽게 취소를 누르는 경우
            if(selected) {
                // 선택 이후, 수정 취소 버튼을 클릭하면 저장된 캐시 State 로 바꾸고, checked 를 false 로 바꿉니다.다.
                tmp_musics = musics.slice().map(m => 
                    m.id !== selected.id ? { ...m, checked: false } : { ...selected, checked: false }
                );
            } else {
                // 취소 요청이 있어도, 캐시 State 에 음악이 없는 경우는 없지만, 혹여 모르니 음악 목록을 복사합니다.
                // 다수 음악 선택은 성능 저하로 일단 단일 선택만 할 수 있게 합니다.
                tmp_musics = musics.slice();
            }
        } else {
            // 시나리오 02. 음악을 수정하기 위해 이를 선택한 경우
            if(selected) {
                // 선택한 음악이 이미 존재하는 경우. 수정 중 다른 음악을 선택하면 캐시 State 에 있는 값으로 재설정합니다.
                // 그리고 다시 선택한 음악을 체킹합니다.
                tmp_musics = musics.slice().map(m => 
                    m.id !== music.id ? 
                        m.id === selected.id ? 
                            { ...selected, checked: false } : { ...m, checked : false } 
                        : { ...music, checked: true }
                );
            } else {
                // 아무 것도 선택이 안 되어 있으면 선택 음악에 체킹만 합니다.
                tmp_musics = musics.slice().map(m => 
                    m.id !== music.id ? { ...m, checked: false } : { ...music, checked: true }
                );
            }
        }
        
        this.setState({
            musics: tmp_musics,
            selected: check_var ? music : null
        });
    }

    _handle_change_property = (id, event) => {
        const { musics } = this.state;
        const property = event.target.name;

        let tmp_musics;
        if(property === 'genre') { // JSON 을 이용해서 특정 프로퍼티의 값을 비교하여 선택한 값을 비교하여 설정했습니다.
            tmp_musics = musics.slice().map(m => m.id !== id ? m : { ...m, [ property ]: JSON.parse(event.target.value) });
        } else {
            tmp_musics = musics.slice().map(m => m.id !== id ? m : { ...m, [ property ]: event.target.value });
        }

        this.setState({
            musics: tmp_musics
        });
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