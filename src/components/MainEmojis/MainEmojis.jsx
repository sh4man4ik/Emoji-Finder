/* eslint-disable no-undef */
import './main-emojis.css';
import { useRef } from 'react';

function MainEmojis() {
	let searchEmojis = useRef();
	let inputText = useRef();
	let emojisArray = useRef();
	let copied = useRef();

	function outlineAdd() {
		searchEmojis.current.style.outline = '2px solid #c0c0c0';
	}

	function removeOutline() {
		searchEmojis.current.style.outline = 'none';
	}

	function searchEmoji(inputRandom) {
		let inputUserText = inputText.current.value.trim();
		inputText.current.value = '';

		inputRandom == 'secret-key-for-random-emoji-123456'
			? (inputUserText = 'secret-key-for-random-emoji-123456')
			: inputUserText;

		if (inputUserText != '') {
			$.ajax({
				type: 'POST',
				url: 'api/send',
				contentType: 'application/json',
				data: JSON.stringify({ message: inputUserText }),
				success: function (response) {
					workWithResponse(response);
					$('#serverResponse').text('Success: ' + response);
				},
				error: function (xhr, error) {
					console.error('Error: ', error);
					$('#serverResponse').text('Error: ' + xhr.responseText);
				}
			});
		}
	}

	function workWithResponse(response) {
		emojisArray.current.innerHTML = '';

		let emojis = response.results.map((item) => item.emoji);

		const emojiRegex = /\p{Emoji}/u;
		const flagRegex = /^[\u{1F1E6}-\u{1F1FF}]{2}$/u;

		for (let emoji of emojis) {
			if (emojiRegex.test(emoji) && !flagRegex.test(emoji)) {
				let newP = document.createElement('p');
				newP.classList.add('display-3', 'emoji-block');
				newP.innerHTML = emoji;

				newP.addEventListener('click', () => {
					navigator.clipboard.writeText(newP.textContent).then(() => {
						animationCopied();
					});
				});

				emojisArray.current.appendChild(newP);
			}
		}
	}

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

			<div className="input-search-emoji">
				<div className="search-emojis" ref={searchEmojis}>
					<button className="search-emoji-button" onClick={searchEmoji}>
						<i className="bi bi-search bg-transparent"></i>
					</button>
					<input
						type="text"
						className="input-text"
						name="input-text"
						ref={inputText}
						placeholder="Enter emoji..."
						maxLength="30"
						onFocus={outlineAdd}
						onBlur={removeOutline}
					/>
				</div>
				<button
					className="random-emoji-button"
					onClick={() => searchEmoji('secret-key-for-random-emoji-123456')}
				>
					🎲
				</button>
			</div>

			<div className="response-emojis">
				<div className="response-emojis-2" id="response-emojis-2" ref={emojisArray}></div>
			</div>
		</>
	);
}

export default MainEmojis;
