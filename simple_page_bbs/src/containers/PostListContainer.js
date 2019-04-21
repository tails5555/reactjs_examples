import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { fetch_posts_by_query } from 'actions/post_action';

class PostListContainer extends PureComponent {
    constructor(props){
        super(props);
        this.state = { posts: [] };
    }

    componentDidMount() {
        const { search } = this.props.location;
        fetch_posts_by_query(search)
            .then(res => {
                const { status } = res;
                if(status === 200){
                    const { data } = res;
                    this.setState({
                        posts: data && data.results
                    });
                }
            })
            .catch(error => alert(error && error.message));
    }

    _render_tables = () => {
        const { posts } = this.state;
        return posts.map(p => <p key={p.id}>{ p.title }</p>);
    }

    render() {
        return (
            <div className="container">
                <h1>POST LIST</h1>
                { this._render_tables() }
            </div>
        );
    }
}

export default withRouter(PostListContainer);