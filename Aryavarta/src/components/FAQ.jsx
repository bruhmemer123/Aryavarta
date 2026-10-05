import { useState } from "react";
import krishnaImg from "../assets/images/krishna.jpg";
import yudhishtiraImg from "../assets/images/yudhishtira.jpg";
import dronacharyaImg from "../assets/images/dronacharya.jpg";
import viduraImg from "../assets/images/vidura.jpg";
import sanjayaImg from "../assets/images/sanjaya.jpg";
import shakuniImg from "../assets/images/shakuni.jpg";

const FAQ_ITEMS = [
	{
		q: "Can we register on the day of the event?",
		a: "No. Once the conch of enrollment has sounded and seats are filled, the Sabha rolls are sealed. Complete registration beforehand.",
		speaker: "Yudhishtira",
		title: "Keeper of Dharma",
		avatar: yudhishtiraImg,
	},
	{
		q: "Will participants get a certificate?",
		a: "Yes. Every participant who enters the arena and completes their event will receive an official digital certificate of participation.",
		speaker: "Krishna",
		title: "Guide of Kurukshetra",
		avatar: krishnaImg,
	},
	{
		q: "How will event timing and venue be announced?",
		a: "Announcements are delivered through the official WhatsApp group 24 hours before the event. Joining the group is mandatory.",
		speaker: "Sanjaya",
		title: "The Divine Narrator",
		avatar: sanjayaImg,
	},
	{
		q: "What if a teammate cannot attend after registration?",
		a: "Inform the organizing council immediately. Replacements are allowed only if approved before the first day begins.",
		speaker: "Vidura",
		title: "Voice of Wisdom",
		avatar: viduraImg,
	},
	{
		q: "What behavior can lead to disqualification?",
		a: "Cheating, abusive conduct, and disrespect toward judges or participants violate Dharma and can result in disqualification.",
		speaker: "Dronacharya",
		title: "Acharya of Discipline",
		avatar: dronacharyaImg,
	},
	{
		q: "Can event rules change after registration?",
		a: "The council may refine rules for fairness and clarity. Final decisions from the organizing committee are binding for all teams.",
		speaker: "Shakuni",
		title: "Master of Strategy",
		avatar: shakuniImg,
	},
];

const SANSKRIT_NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

export default function AryavartaFAQ() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggle = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section
			className="min-h-screen text-[#f6e9c7] font-['Libre_Baskerville',serif] flex justify-center items-center px-4 py-14 bg-[radial-gradient(circle_at_50%_10%,rgba(255,183,76,0.13),transparent_58%),radial-gradient(circle_at_50%_85%,rgba(58,27,9,0.52),transparent_70%)]"
		>
			<div className="w-full max-w-[84rem] bg-[#130b07]/90 border border-[#f1b14a]/35 rounded-sm p-6 sm:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-md">
				<header className="text-center mb-6">
					<h2 className="font-cinzel text-3xl sm:text-4xl lg:text-[2.6rem] tracking-[4px] uppercase text-[#f1b14a] drop-shadow-[0_0_18px_rgba(241,177,74,0.35)] mb-2 font-bold">
						Sabha Ke Prashn
					</h2>
					<p className="font-cinzel text-xs sm:text-sm tracking-[5px] text-[#c8b58f]">
						DHARMA&nbsp;&nbsp;·&nbsp;&nbsp;NEETI&nbsp;&nbsp;·&nbsp;&nbsp;VIJAYA
					</p>

					<div className="flex items-center justify-center mt-4">
						<span className="h-px flex-1 max-w-35 bg-linear-to-r from-transparent to-[#f1b14a]/35" />
						<span className="mx-3.5 text-lg text-[#f1b14a]">🕉</span>
						<span className="h-px flex-1 max-w-35 bg-linear-to-l from-transparent to-[#f1b14a]/35" />
					</div>
				</header>

				<div className="font-cinzel text-[11px] sm:text-xs tracking-[3px] text-center text-[#b8924f] border-y border-[#f1b14a]/15 py-2 mb-4 uppercase">
					ARYAVARTA COUNCIL BULLETIN - FREQUENTLY ASKED QUESTIONS
				</div>

				<p className="text-center text-sm sm:text-base text-[#c8b58f] leading-relaxed max-w-[64rem] mx-auto mb-9 italic">
					Before stepping into the Dharmayudh arena of Aryavarta 5.0, seek
					guidance from the great minds of the epic. Tap any question to reveal
					the counsel.
				</p>

				<main className="flex flex-col gap-4">
					{FAQ_ITEMS.map((item, index) => {
						const isOpen = openIndex === index;

						return (
							<article
								key={index}
								className={`border rounded-sm transition-all duration-300 overflow-hidden ${
									isOpen
										? "border-[#f1b14a] bg-[#1a100b]/90 shadow-[0_4px_18px_rgba(0,0,0,0.6)]"
										: "border-[#f1b14a]/25 bg-[#0d0704]/65 hover:border-[#f1b14a] hover:shadow-[0_4px_18px_rgba(0,0,0,0.6)]"
								}`}
							>
								<button
									type="button"
									onClick={() => toggle(index)}
									aria-expanded={isOpen}
									className="w-full flex justify-between items-center px-5 py-4 text-left cursor-pointer"
								>
									<span className="flex items-center gap-3 sm:gap-4 pr-3">
										<span className="font-cinzel text-base font-bold text-[#f1b14a] min-w-7">
											{SANSKRIT_NUMERALS[index] || index + 1}
										</span>
										<span className="font-cinzel text-sm sm:text-base tracking-[0.8px] text-[#f6e9c7]">
											{item.q}
										</span>
									</span>
									<span className="text-[#f1b14a] text-sm shrink-0 transition-transform">
										{isOpen ? "✕" : "✦"}
									</span>
								</button>

								<div className="flex items-start gap-4 px-5 pb-5">
									<button
										type="button"
										onClick={() => toggle(index)}
										aria-label={`Consult ${item.speaker}`}
										className="p-0 border-0 bg-transparent cursor-pointer shrink-0"
									>
										<img
											src={item.avatar}
											alt={item.speaker}
											className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#f1b14a] bg-[#23150e] object-cover shadow-[0_0_10px_rgba(241,177,74,0.25)] hover:scale-105 hover:brightness-110 transition-all duration-200"
										/>
									</button>

									{!isOpen ? (
										<button
											type="button"
											onClick={() => toggle(index)}
											className="text-left font-cinzel text-xs tracking-[1.8px] text-[#b8924f] hover:text-[#f1b14a] pt-3.5 transition-colors cursor-pointer"
										>
											SEEK COUNSEL FROM {item.speaker.toUpperCase()} →
										</button>
									) : (
										<div className="flex-1">
											<div className="bg-[#1e120c] border border-[#f1b14a]/30 p-4 rounded-sm shadow-[inset_0_0_12px_rgba(0,0,0,0.8)]">
												<p className="text-sm sm:text-base leading-relaxed text-[#f6e9c7] mb-3">
													{item.a}
												</p>
												<div className="flex flex-col items-end border-t border-[#f1b14a]/15 pt-2">
													<span className="font-cinzel text-xs sm:text-sm font-semibold tracking-[1.5px] text-[#f1b14a]">
														- {item.speaker}
													</span>
													<span className="text-[11px] sm:text-xs text-[#c8b58f] italic">
														{item.title}
													</span>
												</div>
											</div>
										</div>
									)}
								</div>
							</article>
						);
					})}
				</main>

				<footer className="text-center mt-10">
					<div className="text-[#f1b14a] text-lg tracking-[8px] mb-1">ॐ</div>
					<p className="font-cinzel text-xs sm:text-sm tracking-[2px] text-[#b8924f]">
						#eXpressToInspire
					</p>
				</footer>
			</div>
		</section>
	);
}
