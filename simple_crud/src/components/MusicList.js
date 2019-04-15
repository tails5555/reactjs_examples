import React, { Fragment, PureComponent } from 'react';

import { music_list_api, music_create_api, music_update_api, music_delete_by_id_api } from 'actions/music_action';

import Property from 'components/music/Property';
import Element from 'components/music/Element';
import Instance from 'components/music/Instance';

class MusicList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { musics: [], selected: null, insertCheck: false };
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

    _render_instance = () => {
        const { insertCheck } = this.state;

        const btn_render = insertCheck ? 'btn btn-danger' : 'btn btn-info';
        const btn_context = insertCheck ? '취소' : '추가';
        const icon_render = insertCheck ? 'fas fa-times' : 'fas fa-plus';
        
        return (
            <Fragment>
                <div className="text-right" style={ { margin: '10px' } }>
                    <button className={ btn_render } onClick={ () => this._handle_click_insert() }>
                        <i className={ icon_render } /> { btn_context }
                    </button>
                </div>
                { insertCheck ? <Instance act_submit={ this._handle_submit } /> : null }
            </Fragment>
        );
    }

    _render_musics = () => {
        const { musics } = this.state;
        if(musics.length > 0) {
            return musics.map(music => (
                <Element 
                    key={ music.id } 
                    music={ music } 
                    changeAction={ (event) => this._handle_change_property(music.id, event) }
                    updateAction={ () => this._handle_submit('UPDATE', music) }
                    deleteAction={ () => this._handle_click_delete(music) }
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

    _handle_click_insert = () => {
        const { insertCheck } = this.state;
        this.setState({
            insertCheck: !insertCheck
        });
    }

    _handle_click_delete = (music) => {
        const conf = window.confirm(`${ music && music.title } 노래를 삭제합니다. 계속 진행 하시겠습니까?`);
        if(conf){
            const { musics } = this.state;
            let tmp_musics = musics.slice();
            music_delete_by_id_api(music && music.id)
                .then(res => {
                    const { status } = res;
                    if(status === 204){ // 삭제가 정상적으로 진행되면 204 NO CONTENT 상태를 보냅니다.
                        alert('노래가 정상적으로 삭제 되었습니다.');
                        
                        const idx = tmp_musics.map(m => m.id).indexOf(music && music.id);
                        tmp_musics.splice(idx, 1);
                        
                        this.setState({
                            musics: tmp_musics
                        });
                    }
                })
                .catch(error => { // 노래를 삭제할 때 에러가 나면 확인 창만 보여줍니다.
                    alert(error && error.message);
                });
        }
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

    _handle_submit = (type, music) => {
        const { musics, selected } = this.state;
        let tmp_musics = musics.slice();

        switch(type) {
            case 'UPDATE' :
                music_update_api(music && music.id, music)
                    .then(res => { // 수정이 제대로 되면 수정 데이터를 서버의 Response 에서 받아와 목록에서 보여줍니다.
                        const { status } = res;
                        if(status === 200) {
                            alert('노래 정보 수정이 완료 되었습니다.');

                            const { data } = res;
                            data.checked = false;
                            
                            tmp_musics = tmp_musics.map(m => m.id === data.id ? data : m);

                            this.setState({
                                musics: tmp_musics
                            });
                        }
                    })
                    .catch(error => { // 수정이 안 되면 캐시에 있는 원본 데이터로 지정합니다.
                        alert(error && error.message);
                        tmp_musics = tmp_musics.map(m => m.id === music.id ? { ...selected, checked: false } : m);

                        this.setState({
                            musics: tmp_musics,
                            selected: null
                        });
                    });
                
                break;

            case 'CREATE' :
                if(!music.genre) {
                    alert('장르 선택을 한 번 더 확인 부탁 드립니다.');
                } else {
                    music_create_api(music)
                        .then(res => { // 노래 정보 추가할 때 정상 처리 되면 맨 뒤에 넣어줍니다.
                            const { status } = res;
                            if(status === 201) { // 추가가 완료되면 201 CREATED 상태로 넘깁니다.
                                alert('노래 정보 추가가 완료 되었습니다.');

                                const { data } = res;
                                data.checked = false;
                                
                                tmp_musics.push(data);

                                this.setState({
                                    musics: tmp_musics,
                                    insertCheck: false
                                });
                            }
                        })
                        .catch(error => { // 노래 정보 추가할 때 에러가 나면 확인 창만 보여줍니다.
                            alert(error && error.message);
                        });
                }

                break;

            default :
                alert('SUBMIT 행위는 UPDATE, CREATE 둘 중 하나만 작동합니다.');
                break;
        }
    }

    render() {
        return (
            <Fragment>
                { this._render_instance() }
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