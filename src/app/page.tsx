"use client";

import { useEffect, useRef, useState } from 'react';

type Position = {
	x: number;
	y: number;
};

export default function Home() {
	const frameRef = useRef<HTMLDivElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [yesPos, setYesPos] = useState<Position>({ x: 0, y: 0 });
	const [showPopup, setShowPopup] = useState(false);
	const [videoActive, setVideoActive] = useState(true);
	const [entered, setEntered] = useState(false);

	const handleEnter = () => {
		setEntered(true);
		// Start video with sound after user interaction
		const video = videoRef.current;
		if (video) {
			video.muted = false;
			video.play();
		}
	};

	const placeYesNextToNo = () => {
		const frame = frameRef.current;
		if (!frame) return;

		const { width, height } = frame.getBoundingClientRect();
		const buttonWidth = 120;
		const buttonHeight = 48;
		const gap = 24;

		const x = width / 2 - buttonWidth - gap;
		const y = height / 2 - buttonHeight / 2;

		setYesPos({ x: Math.max(0, x), y: Math.max(0, y) });
	};

	const moveYesButton = () => {
		const frame = frameRef.current;
		if (!frame) return;

		const { width, height } = frame.getBoundingClientRect();
		const padding = 16;
		const buttonWidth = 120;
		const buttonHeight = 48;

		const maxX = Math.max(padding, width - buttonWidth - padding);
		const maxY = Math.max(padding, height - buttonHeight - padding);

		setYesPos({
			x: Math.random() * maxX,
			y: Math.random() * maxY,
		});
	};

	useEffect(() => {
		placeYesNextToNo();
		const handleResize = () => placeYesNextToNo();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		if (!videoActive) {
			video.pause();
			video.currentTime = 0;
			return;
		}

		const playPromise = video.play();
		if (playPromise !== undefined) {
			playPromise.catch(() => {
				/* Autoplay with sound may be blocked until user interacts. */
			});
		}
	}, [videoActive]);

	const handleNoClick = () => {
		setVideoActive(false);
		setShowPopup(true);
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white px-4">
			{/* Intro Screen */}
			{!entered && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black">
					<div className="flex flex-col items-center gap-8 text-center">
						<h1 className="text-4xl font-bold text-white sm:text-5xl">Enter The Web?</h1>
						<button
							type="button"
							onClick={handleEnter}
							className="mt-4 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-10 py-4 text-xl font-bold text-white shadow-lg shadow-cyan-500/40 transition hover:scale-105 hover:shadow-cyan-500/60"
						>
							Yes
						</button>
					</div>
				</div>
			)}

			<div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-16 shadow-2xl backdrop-blur">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(147,51,234,0.18),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(239,68,68,0.16),transparent_28%)]" aria-hidden />

				<div className="relative flex flex-col items-center gap-6 text-center">
					<p className="text-sm uppercase tracking-[0.4em] text-cyan-200/70">survay by redoyanul</p>
					<h1 className="text-5xl font-black tracking-tight sm:text-6xl">
						<span className="animate-pulse bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-300 bg-clip-text text-transparent drop-shadow">Porte Bos</span>
					</h1>
					<div className="w-full flex justify-center">
						<div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-black/40 shadow-xl">
							<video
								ref={videoRef}
								className="aspect-square w-full object-cover"
								src="/porte-bos.mp4"
								loop
								muted
								controls={false}
								playsInline
								preload="auto"
							/>
						</div>
					</div>
					<p className="text-lg text-slate-200/80 sm:text-xl">Tor syllabus sesh hoise?</p>

					<div
						ref={frameRef}
						className="relative mt-8 h-52 w-full"
						aria-label="choices"
					>
						<button
							type="button"
							onClick={moveYesButton}
							style={{ transform: `translate(${yesPos.x}px, ${yesPos.y}px)` }}
							className="pointer-events-auto absolute left-0 top-0 z-10 select-none rounded-full bg-gradient-to-r from-amber-400 to-pink-500 px-6 py-3 text-lg font-semibold text-black shadow-lg shadow-amber-400/40 transition-transform duration-150"
						>
							Yes
						</button>

						<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
							<button
								type="button"
								onClick={handleNoClick}
								className="pointer-events-auto rounded-full border border-white/30 bg-white/10 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-slate-900/50 transition hover:-translate-y-0.5 hover:border-cyan-200/70 hover:bg-white/20"
							>
								No
							</button>
						</div>
					</div>
				</div>

				{showPopup && (
					<div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
						<div className="rounded-2xl border border-white/20 bg-slate-900/80 px-8 py-6 text-center shadow-2xl">
							<p className="text-3xl font-bold text-cyan-100">Porte Bos</p>
							<button
								type="button"
								onClick={() => setShowPopup(false)}
								className="mt-4 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/20"
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
		</main>
	);
}
