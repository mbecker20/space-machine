import React, { useRef } from 'react'

function DndAudio() {
	const audRef = useRef<HTMLAudioElement>(null)
	return (
		<div>
			<input 
				type='file'
				accept='.mp3, .wav'
				onChange={e => {
					if (audRef.current) {
						const file = ((e.target as HTMLInputElement).files as FileList)[0]
						audRef.current.src = URL.createObjectURL(file)
					} 
				}}
			/>
			<audio
				ref={audRef}
				autoPlay
			/>
		</div>
	)
}
	
export default DndAudio