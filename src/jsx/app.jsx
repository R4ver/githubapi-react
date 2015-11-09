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
                <h1 className="page__title"><span onClick={this.handleClick} onBlur={this.props.onBlur} className="gh-user">{this.state.username}</span>'s Github Repositories</h1>
                <span className="gh-info">Click on the GitHub username to change it</span>
            </header>
        )
    }
};

class RepoList extends React.Component {
 
    constructor(props) {
        super(props);

        this.state = {
            repos: []
        }
    }

    componentDidMount() {
        console.log(this.props.username);
        fetch(`https://api.github.com/users/${this.props.username}/repos`).then(r => r.json()).then(data => {
            this.setState({
                repos: data
            });
        });
    }

    render() {
        return (
            <div className="repo-list">
                <ol>
                    {this.state.repos.map((repo, key) => {
                        return <li key={key}><a href={ repo.html_url }>{ repo.name }</a></li>;
                    })}
                </ol>
            </div>
        );
    }
};

class GitRepos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "ravingapd"
        }
    }

    handleChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    handleBlur(event) {
        let _this = event.currentTarget;
        _this.style.background = "rgba(0,0,0,0)";

        _this.contentEditable = false;


    }

    render() {
        let username = this.state.username;
        return (
            <div className="page__wrapper">
                <Header username={username} onBlur={this.handleBlur} />

                <main className="container container--center">
                    <RepoList username={username} />
                </main>
            </div>
        );
    }
};

ReactDOM.render(
    <GitRepos username="ravingapd"/>,
    document.getElementById('app')
);