import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './style.css'

function App() {
	const buttonContent = [...`123=456/789*C0+-`]

	const [n1, setN1] = useState(null)
	const [n2, setN2] = useState(null)
	const [operation, setOperation] = useState(null)
	const [result, setResult] = useState(null)

	const [display, setDisplay] = useState('')

	const unNull = useCallback((x, y) => (x !== null ? x : y))
	useEffect(
		() =>
			setDisplay(
				unNull(result, operation === null ? unNull(n1, '') : unNull(n2, ''))
			),
		[n1, n2, result, operation]
	)
	const calculate = useCallback((n1, n2, op) =>
		op === '+' ? n1 + n2
			: op === '*' ? n1 * n2
			: op === '/' ? n1 / n2
			: op === '-' ? n1 - n2
			: 0
	)
	return (
		<div className="container">
			<div className="screen">
				<input className="result" type="text" disabled value={display} />
			</div>
			<div className="btns">
				{buttonContent.map(e => (
					<span
						type={/[0-9]/g.test(e) ? 'number' : 'operation'}
						key={e}
						value={e}
						onClick={evt => {
							const v = evt.target.getAttribute('value')
							if (v === 'C') {
								setN1(null); setN2(null); setOperation(null);	setResult(null)
							} else if (v === '=') {
								const res = calculate(n1, n2, operation)
								setResult(res); setN1(res)
								setN2(null); setOperation(null)
							} else if (evt.target.getAttribute('type') === 'number') {
								setResult(null)
								const clickedValue = Number(v)
								if (operation !== null)
									setN2(n2 === null ? clickedValue : n2 * 10 + clickedValue)
								else setN1(n1 === null ? clickedValue : n1 * 10 + clickedValue)
							} else {
								setResult(null); setOperation(v)
							}
						}}
					>
						{e}
					</span>
				))}
			</div>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
