import './style.css';

function Header() {
	function githubRepoLocation() {
		window.location.href = 'https://github.com/sh4man4ik/Emoji-Finder';
	}

	return (
		<>
			<div className="navbar">
				<h1 className="title display-6">🔍 EmojiFinder</h1>
				<h1 className="github-link-text display-6" onClick={githubRepoLocation}>
					GitHub
				</h1>
				<i className="bi bi-github github-link-logo" onClick={githubRepoLocation}></i>
			</div>
		</>
	);
}

export default Header;
