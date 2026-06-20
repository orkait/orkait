import { ArrowUpRight, Github } from "lucide-react";
import { ProjectAvatar } from "@/components/react/ui/project-avatar";
import { OSS_PROJECTS, PRODUCT_LINES } from "@/lib/data/products";
import { TEAM_MEMBERS } from "@/lib/data/team";
import { OPEN_ROLES } from "@/lib/data/roles";
import type { TeamMember } from "@/lib/types";
import { routes } from "@/lib/data/nav";

const ACTIVE_MEMBERS = TEAM_MEMBERS.filter((member) => !member.alumni);
const ALUMNI_MEMBERS = TEAM_MEMBERS.filter((member) => member.alumni);

function ProductLineCard({ product }: { product: (typeof PRODUCT_LINES)[number] }) {
	const content = (
		<div className="aspect-square rounded-lg border border-border bg-[#f7f7f7] flex flex-col items-center justify-center gap-4 p-6 text-center transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:border-foreground/20">
			<ProjectAvatar name={product.id} size={96} className="size-20" />
			<div className="flex flex-col items-center gap-2">
				<span className="text-subtitle leading-subtitle font-bold text-foreground tracking-tight">
					{product.title}
				</span>
				<span className="max-w-[16rem] text-xs leading-relaxed font-medium text-muted-foreground">
					{product.surface}
				</span>
			</div>
			<span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
				{product.ctaLabel}{" "}
				{product.href ? <ArrowUpRight className="size-3.5" /> : null}
			</span>
		</div>
	);

	if (!product.href) {
		return (
			<div
				className="group block cursor-default"
				aria-label={`${product.title}: ${product.statusLabel}`}
			>
				{content}
			</div>
		);
	}

	return (
		<a
			href={product.href}
			target="_blank"
			rel="noopener noreferrer"
			className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
		>
			{content}
		</a>
	);
}

function OpenProjectCard({ project }: { project: (typeof OSS_PROJECTS)[number] }) {
	return (
		<a
			href={project.href}
			target="_blank"
			rel="noopener noreferrer"
			className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
		>
			<div className="aspect-square rounded-lg border border-border bg-[#f7f7f7] flex flex-col items-center justify-center gap-4 p-6 text-center transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:border-foreground/20">
				<ProjectAvatar name={project.id} size={96} className="size-20" />
				<span className="text-subtitle leading-subtitle font-bold text-foreground tracking-tight">
					{project.title}
				</span>
				<span className="max-w-[16rem] text-xs leading-relaxed font-medium text-muted-foreground">
					{project.description}
				</span>
				<div className="flex items-center gap-3">
					<span className="text-xs font-mono text-muted-foreground">
						{project.language}
					</span>
					<span className="text-border">|</span>
					<span className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
						<Github className="size-3" /> Source
					</span>
				</div>
			</div>
		</a>
	);
}

function TeamMemberCard({ member }: { member: TeamMember }) {
	return (
		<article className="group w-40 relative overflow-hidden rounded-lg cursor-default transition-shadow duration-300 shadow-sm hover:shadow-lg">
			<div className="relative aspect-[3/4]">
				<img
					src={member.image}
					alt={member.name}
					className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
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
				<img
					src={member.image}
					alt={member.name}
					className="absolute inset-0 h-full w-full object-cover grayscale"
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

export function ProjectsInteractive() {
	const productCards = PRODUCT_LINES.slice(0, 4);
	const openCards = OSS_PROJECTS.slice(0, 4);

	return (
		<div className="space-y-32 tablet:space-y-44">
			<section className="grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
				<div className="flex flex-col gap-4">
					<p className="text-body leading-body font-medium uppercase tracking-wide text-muted-foreground">
						(01) PROJECTS
					</p>
					<h1 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground tablet:text-title-2 tablet:leading-title-2 laptop:text-title-1 laptop:leading-title-1">
						Systems we&apos;ve shipped.
					</h1>
					<p className="text-body leading-body font-medium text-muted-foreground laptop:text-body-lg laptop:leading-body-lg mt-2 max-w-[360px]">
						Products built from real problems, running in production.
					</p>
				</div>

				<div className="grid grid-cols-1 mobile:grid-cols-2 gap-4 tablet:justify-self-end tablet:max-w-xl">
					{productCards.map((product) => (
						<ProductLineCard key={product.id} product={product} />
					))}
				</div>
			</section>

			<section className="grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
				<div className="order-2 tablet:order-1 grid grid-cols-1 mobile:grid-cols-2 gap-4 tablet:max-w-xl">
					{openCards.map((project) => (
						<OpenProjectCard key={project.id} project={project} />
					))}
				</div>

				<div className="order-1 tablet:order-2 flex flex-col gap-4 tablet:text-right tablet:justify-self-end">
					<p className="text-body leading-body font-medium uppercase tracking-wide text-muted-foreground">
						(02) BUILT IN THE OPEN
					</p>
					<h2 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground tablet:text-title-2 tablet:leading-title-2">
						Built in the open.
					</h2>
					<p className="text-body leading-body font-medium text-muted-foreground laptop:text-body-lg laptop:leading-body-lg mt-2 tablet:ml-auto max-w-[320px]">
						Tools and research infrastructure we can share publicly.
					</p>
				</div>
			</section>

			<section className="grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
				<div className="flex flex-col gap-4">
					<p className="text-body leading-body font-medium uppercase tracking-wide text-muted-foreground">
						(03) RESEARCH PARTNERSHIPS
					</p>
					<h2 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground tablet:text-title-2 tablet:leading-title-2">
						Selective research, product-grade outcomes.
					</h2>
					<p className="text-body leading-body font-medium text-muted-foreground laptop:text-body-lg laptop:leading-body-lg mt-2 max-w-[320px]">
						No open-ended consulting menu. We work on execution, learning, and
						interface systems.
					</p>
				</div>

				<div className="tablet:justify-self-end tablet:max-w-xl">
					<div className="rounded-lg border border-border bg-[#f7f7f7] p-6 shadow-sm">
						<p className="text-body-lg leading-body-lg font-bold text-foreground">
							Bring a hard systems problem.
						</p>
						<p className="mt-3 text-body leading-body font-medium text-muted-foreground">
							We partner when the work has a path to a real product or research
							system.
						</p>
						<a
							href={routes.contact}
							className="mt-5 inline-flex text-sm font-medium text-foreground underline underline-offset-4"
						>
							Start a partnership conversation
						</a>
					</div>
				</div>
			</section>

			<section className="grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
				<div className="flex flex-col gap-4">
					<p className="text-body font-medium uppercase tracking-[0.2em] text-muted-foreground">
						(04) TEAM
					</p>
					<h2 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground tablet:text-title-2 tablet:leading-title-2">
						The people building Orkait.
					</h2>
				</div>

				<div className="space-y-10">
					<div className="flex flex-wrap gap-3">
						{ACTIVE_MEMBERS.map((member) => (
							<TeamMemberCard key={member.name} member={member} />
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

					<div className="space-y-4">
						<div className="space-y-1">
							<p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
								OPEN ROLES
							</p>
							<p className="text-body-lg leading-body-lg font-bold text-foreground">
								We&apos;re hiring.
							</p>
						</div>
						<div className="flex flex-wrap gap-3">
							{OPEN_ROLES.map((role) => {
								const label = role.isIntern
									? `${role.title} (Intern)`
									: role.title;
								return (
									<a
										key={role.emailSubject}
										href={`${routes.careers}?role=${encodeURIComponent(label)}`}
										className="group block"
									>
										<div className="h-40 tablet:h-48 w-44 tablet:w-52 rounded-lg border border-dashed border-border bg-[#f7f7f7] flex flex-col items-center justify-center gap-3 p-5 transition-all duration-300 hover:border-foreground/40 hover:shadow-sm">
											<span className="text-2xl">+</span>
											<span className="text-sm font-bold text-foreground tracking-tight text-center">
												{role.title}
												{role.isIntern && (
													<>
														<br />
														(Intern)
													</>
												)}
											</span>
											<span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
												Apply
											</span>
										</div>
									</a>
								);
							})}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default ProjectsInteractive;
