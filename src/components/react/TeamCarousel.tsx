import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/react/ui/carousel";
import { TEAM_MEMBERS } from "@/lib/data/team";
import type { TeamMember } from "@/lib/types";

function TeamMemberCard({ member }: { member: TeamMember }) {
	return (
		<div
			className="relative w-[216px] h-[282px] overflow-hidden select-none"
			style={{
				backgroundImage:
					"linear-gradient(210.75deg, rgb(249, 249, 249) 45.489%, rgb(147, 147, 147) 99.431%)",
				isolation: "isolate",
			}}
		>
			<div className="absolute left-[-46px] w-[272px] h-[272px] top-[10px] pointer-events-none overflow-hidden mix-blend-multiply">
				<img
					src={member.image}
					alt={member.name}
					className="absolute inset-0 h-full w-full object-cover pointer-events-none"
					draggable={false}
				/>
			</div>

			<div className="relative z-10 w-full pt-[19px] flex items-center flex-col pointer-events-none">
				<h3 className="text-[16px] font-medium leading-[26px] text-black tracking-tight pointer-events-none">
					{member.name}
				</h3>
				<p className="text-[10px] font-normal leading-[26px] text-black mt-[-4px] pointer-events-none">
					{member.role}
				</p>
			</div>

			<div className="absolute right-[12px] bottom-[16px] flex flex-col text-right z-10 gap-0 pointer-events-none">
				{member.ex.map((item, i) => (
					<span
						key={i}
						className="text-[12px] font-normal leading-[18px] text-black pointer-events-none text-right"
					>
						{item}
					</span>
				))}
			</div>
		</div>
	);
}

export function TeamCarousel() {
	return (
		<div className="w-full">
			{/* DESKTOP GRID VIEW */}
			<div className="hidden tablet:block">
				<div className="flex flex-col items-center justify-center w-full">
					<div className="flex flex-wrap justify-center gap-1">
						{TEAM_MEMBERS.map((member, index) => (
							<TeamMemberCard key={index} member={member} />
						))}
					</div>
				</div>
			</div>

			{/* MOBILE CAROUSEL VIEW */}
			<div className="block tablet:hidden">
				<Carousel
					opts={{
						align: "start",
						dragFree: true,
						containScroll: "trimSnaps",
					}}
					className="w-full"
				>
					<CarouselContent className="ml-0 w-full h-full pt-4 pb-8">
						<CarouselItem
							className="pl-0 basis-auto h-full !min-w-[43px] w-[43px]"
							aria-hidden="true"
						/>
						{TEAM_MEMBERS.map((member, index) => (
							<CarouselItem
								key={index}
								className="pl-0 mr-[31px] basis-auto last:mr-0 h-full"
							>
								<TeamMemberCard member={member} />
							</CarouselItem>
						))}
						<CarouselItem
							className="pl-0 basis-auto h-full !min-w-[12px] w-[12px]"
							aria-hidden="true"
						/>
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
}

export default TeamCarousel;
