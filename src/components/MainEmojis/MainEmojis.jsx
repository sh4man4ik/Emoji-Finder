import './style.css';
import { useRef } from 'react';

function MainEmojis() {
	let searchEmojis = useRef();

	function outlineAdd() {
		searchEmojis.current.style.outline = '2px solid black';
	}

	function removeOutline() {
		searchEmojis.current.style.outline = 'none';
	}

	function searchEmoji(inputRandom) {}

	return (
		<>
			<div className="input-search-emoji">
				<div className="search-emojis" ref={searchEmojis}>
					<button className="search-emoji-button" onClick={searchEmoji}>
						<i className="bi bi-search bg-transparent"></i>
					</button>
					<input
						type="text"
						className="input-text"
						name="input-text"
						placeholder="Enter emoji..."
						maxLength="30"
						onFocus={outlineAdd}
						onBlur={removeOutline}
					/>
				</div>
				<button className="random-emoji-button" onClick={() => searchEmoji('randomButton123456')}>
					🎲
				</button>
			</div>

			<div className="response-emojis">
				<div className="response-emojis-2"></div>
			</div>
		</>
	);
}

export default MainEmojis;
