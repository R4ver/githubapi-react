"use strict";

const React = require('react');
const ReactDOM = require('react-dom');

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "ravingapd"
        }
    }

    handleClick(event) {
        let _this = event.currentTarget;
        _this.style.background = "rgba(0,0,0,.1)";

        _this.contentEditable = true;
    }

    render() {
        return ( 
            <header className="page__header">
                <h1 className="page__title"><span onClick={this.handleClick} onBlur={this.props.onBlur} className="gh-user">{this.props.username}</span>'s Github Repositories</h1>
                <span className="gh-info">Click on the GitHub username to change it</span>
            </header>
        )
    }
};

class RepoList extends React.Component {
 
    constructor(props) {
        super(props);

        this.state = {
            username: "ravingapd",
            repos: ["Test"]
        }
    }

    componentDidMount() {
        console.log(this.props.username);
        fetch(`https://api.github.com/users/${this.state.username}/repos`).then(r => r.json()).then(data => {
            this.setState({
                repos: data
            });
        });
    }

    handleBlur(event) {
        let _this = event.currentTarget;

        fetch(`https://api.github.com/users/${_this.innerHTML}/repos`).then(r => r.json()).then(data => {
            if ( data.message == "Not Found" ) {
                this.setState({
                    repos: [{name: "User not found."}]
                });
                return;
            }

            this.setState({
                repos: data
            });
        });

        _this.style.background = "rgba(0,0,0,0)";

        _this.contentEditable = false;
    }

    render() {
        return (

            <div className="page__wrapper">
                <main className="container container--center">
                    <Header username={this.state.username} onBlur={this.handleBlur.bind(this)} />

                    <div className="repo-list">
                        <ol>
                            {this.state.repos.map((repo, key) => {
                                return <li key={key}><a href={ repo.html_url }>{ repo.name }</a></li>;
                            })}
                        </ol>
                    </div>
                </main>
            </div>
        );
    }
};

class GitRepos extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RepoList />
        );
    }
};

ReactDOM.render(
    <GitRepos />,
    document.getElementById('app')
);