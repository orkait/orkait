import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectAvatar } from "@/components/shared/project-avatar";
import { OSS_PROJECTS, PROJECTS } from "@/data/projects";
import { TEAM_MEMBERS, type TeamMember } from "@/data/team";

const ACTIVE_MEMBERS = TEAM_MEMBERS.filter((m) => !m.alumni);
const ALUMNI_MEMBERS = TEAM_MEMBERS.filter((m) => m.alumni);

function ProjectCard({
	name,
	label,
	sublabel,
	href,
}: {
	name: string;
	label: string;
	sublabel: string;
	href: string;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group block"
		>
			<div className="aspect-square rounded-lg border border-border bg-[#f7f7f7] flex flex-col items-center justify-center gap-5 p-6 transition-all duration-300 hover:shadow-lg hover:border-foreground/20">
				<ProjectAvatar name={name} size={96} />
				<div className="flex flex-col items-center gap-2 text-center">
					<span className="text-subtitle leading-subtitle font-bold text-foreground tracking-tight">
						{label}
					</span>
					<span className="text-body leading-body font-medium text-muted-foreground">
						{sublabel}
					</span>
				</div>
				<span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
					View live <ArrowUpRight className="size-3.5" />
				</span>
			</div>
		</a>
	);
}

function OSSCard({
	name,
	label,
	description,
	language,
	href,
}: {
	name: string;
	label: string;
	description: string;
	language: string;
	href: string;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group block"
		>
			<div className="aspect-square rounded-lg border border-border bg-[#f7f7f7] flex flex-col items-center justify-center gap-4 p-6 transition-all duration-300 hover:shadow-lg hover:border-foreground/20">
				<ProjectAvatar name={name} size={96} />
				<div className="flex flex-col items-center gap-2 text-center">
					<span className="text-subtitle leading-subtitle font-bold text-foreground tracking-tight">
						{label}
					</span>
					<span className="text-xs leading-relaxed font-medium text-muted-foreground max-w-[85%]">
						{description.length > 90 ? `${description.slice(0, 90)}...` : description}
					</span>
				</div>
				<div className="flex items-center gap-3">
					<span className="text-xs font-mono text-muted-foreground">{language}</span>
					<span className="text-border">|</span>
					<span className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
						<Github className="size-3" /> Source
					</span>
				</div>
			</div>
		</a>
	);
}

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
	return (
		<article className="group w-40 relative overflow-hidden rounded-lg cursor-default transition-shadow duration-300 hover:shadow-lg">
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
							sublabel={project.services}
							href={project.href}
						/>
					))}
				</div>
			</section>

			{/* ── Section 2: Open Source — cards left, text right ── */}
			<section className="grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
				<div className="order-2 tablet:order-1 grid grid-cols-2 tablet:grid-cols-3 gap-4">
					{OSS_PROJECTS.map((project) => (
						<OSSCard
							key={project.id}
							name={project.id}
							label={project.title}
							description={project.description}
							language={project.language}
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
