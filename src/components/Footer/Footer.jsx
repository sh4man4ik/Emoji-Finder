import './footer.css';
import { useRef } from 'react';

function Footer() {
	let copied = useRef();

	document.querySelectorAll('.emoji-block').forEach((element) => {
		element.addEventListener('click', () => {
			navigator.clipboard.writeText(element.textContent).then(() => {
				animationCopied();
			});
		});
	});

	function animationCopied() {
		copied.current.style.display = 'block';
		setTimeout(() => {
			copied.current.classList.add('show');
		}, 10);

		setTimeout(() => {
			copied.current.classList.remove('show');

			setTimeout(() => {
				copied.current.style.display = 'none';
			}, 250);
		}, 1000);
	}

	return (
		<>
			<p className="copied" id="copied" ref={copied}>
				COPIED!
			</p>

			<h1 className="footer-title display-3">Hot Emojis</h1>
			<div className="emoji-list">
				<div className="emoji-list-2">
					<p className="display-3 emoji-block">💦</p>
					<p className="display-3 emoji-block">😱</p>
					<p className="display-3 emoji-block">😡</p>
					<p className="display-3 emoji-block">😩</p>
					<p className="display-3 emoji-block">🫣</p>
					<p className="display-3 emoji-block">🥵</p>
					<p className="display-3 emoji-block">😤</p>
					<p className="display-3 emoji-block">🥴</p>
					<p className="display-3 emoji-block">🍑</p>
					<p className="display-3 emoji-block">😏</p>
					<p className="display-3 emoji-block">🤯</p>
					<p className="display-3 emoji-block">🥶</p>
					<p className="display-3 emoji-block">🤪</p>
					<p className="display-3 emoji-block">🤩</p>
					<p className="display-3 emoji-block">🤣</p>
					<p className="display-3 emoji-block">🫠</p>
				</div>
			</div>
		</>
	);
}

export default Footer;
