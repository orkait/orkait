import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ProjectAvatar } from "@/components/shared/project-avatar";
import { OSS_PROJECTS, PROJECTS } from "@/data/projects";
import { TEAM_MEMBERS, type TeamMember } from "@/data/team";

const ACTIVE_MEMBERS = TEAM_MEMBERS.filter((m) => !m.alumni);
const ALUMNI_MEMBERS = TEAM_MEMBERS.filter((m) => m.alumni);

function ProjectCard({
	name,
	label,
	subtitle,
	href,
}: {
	name: string;
	label: string;
	subtitle: string;
	href: string;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group block"
		>
			<div className="h-40 tablet:h-56 rounded-lg border border-border bg-[#f7f7f7] flex flex-col items-center justify-center gap-3 tablet:gap-4 px-4 py-6 tablet:px-5 tablet:py-8 transition-all duration-300 shadow-sm hover:shadow-lg hover:border-foreground/20">
				<ProjectAvatar name={name} size={128} className="w-10 h-10 tablet:w-16 tablet:h-16 laptop:w-20 laptop:h-20" />
				<div className="flex flex-col items-center gap-1 tablet:gap-1.5 text-center">
					<span className="text-sm tablet:text-subtitle font-bold text-foreground tracking-tight leading-tight">
						{label}
					</span>
					<span className="hidden tablet:block text-xs font-medium text-muted-foreground leading-snug max-w-[90%]">
						{subtitle.length > 60 ? `${subtitle.slice(0, 60)}...` : subtitle}
					</span>
				</div>
				<span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
					View <ArrowUpRight className="size-3.5" />
				</span>
			</div>
		</a>
	);
}

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
	return (
		<article className="group w-40 relative overflow-hidden rounded-lg cursor-default transition-shadow duration-300 shadow-sm hover:shadow-lg">
			<div className="relative aspect-[3/4]">
				<Image
					src={member.image}
					alt={member.name}
					fill
					className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
					sizes="160px"
					priority={index < 4}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-3">
					<h3 className="text-xs font-medium text-white">{member.name}</h3>
					<p className="text-[10px] font-medium text-white/70">{member.role}</p>
				</div>
			</div>
		</article>
	);
}

function AlumniCard({ member }: { member: TeamMember }) {
	return (
		<article className="w-32 relative overflow-hidden rounded-lg opacity-60 hover:opacity-80 transition-opacity duration-300">
			<div className="relative aspect-[3/4]">
				<Image
					src={member.image}
					alt={member.name}
					fill
					className="object-cover grayscale"
					sizes="120px"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-2.5">
					<h3 className="text-[10px] font-medium text-white">{member.name}</h3>
					<p className="text-[9px] font-medium text-white/60">{member.role}</p>
				</div>
			</div>
		</article>
	);
}

export function ProjectsMasonryGrid() {
	return (
		<main className="bg-background px-4 pb-24 pt-16 tablet:px-8 laptop:px-12 base:px-16 phone:pt-20 tablet:pt-24 space-y-32 tablet:space-y-44">

			{/* ── Section 1: Projects — text left, cards right ── */}
			<section className="grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
				<div className="flex flex-col gap-4">
					<p className="text-body leading-body font-medium uppercase tracking-wide text-muted-foreground">
						(01) PROJECTS
					</p>
					<h1 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground tablet:text-title-2 tablet:leading-title-2 laptop:text-title-1 laptop:leading-title-1">
						Systems we&apos;ve shipped.
					</h1>
					<p className="text-body leading-body font-medium text-muted-foreground laptop:text-body-lg laptop:leading-body-lg mt-2 max-w-[340px]">
						Products built from real problems, running in production.
					</p>
				</div>

				<div className="grid grid-cols-2 gap-4 tablet:justify-self-end tablet:max-w-lg">
					{PROJECTS.map((project) => (
						<ProjectCard
							key={project.id}
							name={project.id}
							label={project.title}
							subtitle={project.services}
							href={project.href}
						/>
					))}
				</div>
			</section>

			{/* ── Section 2: Open Source — cards left, text right ── */}
			<section className="grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
				<div className="order-2 tablet:order-1 grid grid-cols-2 laptop:grid-cols-3 gap-4">
					{OSS_PROJECTS.map((project) => (
						<ProjectCard
							key={project.id}
							name={project.id}
							label={project.title}
							subtitle={project.description}
							href={project.href}
						/>
					))}
				</div>

				<div className="order-1 tablet:order-2 flex flex-col gap-4 tablet:text-right tablet:justify-self-end">
					<p className="text-body leading-body font-medium uppercase tracking-wide text-muted-foreground">
						(02) OPEN SOURCE
					</p>
					<h2 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground tablet:text-title-2 tablet:leading-title-2">
						Built in the open.
					</h2>
					<p className="text-body leading-body font-medium text-muted-foreground laptop:text-body-lg laptop:leading-body-lg mt-2 tablet:ml-auto max-w-[300px]">
						Tools we use internally, released publicly.
					</p>
				</div>
			</section>

			{/* ── Section 3: Team — text left, cards right ── */}
			<section className="grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
				<div className="flex flex-col gap-4">
					<p className="text-body font-medium uppercase tracking-[0.2em] text-muted-foreground">
						(03) TEAM
					</p>
					<h2 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground tablet:text-title-2 tablet:leading-title-2">
						The people building Orkait.
					</h2>
				</div>

				<div className="space-y-10">
					<div className="flex flex-wrap gap-3">
						{ACTIVE_MEMBERS.map((member, index) => (
							<TeamMemberCard key={member.name} member={member} index={index} />
						))}
					</div>

					{ALUMNI_MEMBERS.length > 0 ? (
						<div className="space-y-4">
							<div className="space-y-1">
								<p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
									ALUMNI
								</p>
								<p className="text-body-lg leading-body-lg font-bold text-foreground">
									People who helped shape Orkait.
								</p>
							</div>
							<div className="flex flex-wrap gap-3">
								{ALUMNI_MEMBERS.map((member) => (
									<AlumniCard key={member.name} member={member} />
								))}
							</div>
						</div>
					) : null}
				</div>
			</section>
		</main>
	);
}
