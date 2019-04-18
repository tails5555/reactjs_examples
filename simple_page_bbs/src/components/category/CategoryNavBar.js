import React, { PureComponent } from 'react';

import { Link, withRouter } from 'react-router-dom';

import { fetch_all_categories } from 'actions/category_action';

class CategoryNavBar extends PureComponent {
    constructor(props){
        super(props);
        this.state = { categories : [] };
    }

    componentDidMount() {
        fetch_all_categories()
            .then(res => {
                const { status } = res;
                if(status === 200){
                    const { data } = res;
                    this.setState({
                        categories: data
                    });
                }
            })
            .catch(err => {
                alert(err && err.message);
            });
    }

    _render_btn = () => {
        const { location } = this.props;
        const { categories } = this.state;

        const { pathname, search } = location;
        const active = (id) => pathname.includes('/bbs') && search.includes(`id=${id}`);
        
        return categories.map(category => (
            <li className={ active(category.id) ? 'nav-item active' : 'nav-item' } key={ category.id } style={{ textDecoration : active(category.id) ? 'underline' : 'none' }}>
                <Link className="nav-link" to={`/bbs/list?id=${category.id}&pg=1`}>
                    { category.name }
                </Link>
            </li>
        ));
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    HOME
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        { this._render_btn() }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default withRouter(CategoryNavBar);