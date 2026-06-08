import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectAvatar } from "@/components/shared/project-avatar";
import { PRODUCT_LINES } from "@/data/projects";
import { TEAM_MEMBERS, OPEN_ROLES, type TeamMember } from "@/data/team";
import { routes } from "@/config/routes";

const ACTIVE_MEMBERS = TEAM_MEMBERS.filter((member) => !member.alumni);
const ALUMNI_MEMBERS = TEAM_MEMBERS.filter((member) => member.alumni);

function ProductLineCard({
	product,
}: {
	product: (typeof PRODUCT_LINES)[number];
}) {
	const content = (
		<div className="h-48 rounded-lg border border-border bg-[#f7f7f7] flex flex-col justify-between gap-4 px-5 py-6 transition-all duration-300 shadow-sm hover:shadow-lg hover:border-foreground/20">
			<div className="flex items-center justify-between gap-3">
				<ProjectAvatar name={product.id} size={128} className="w-12 h-12" />
				<span className="rounded-md border border-border px-2 py-1 text-xs font-medium text-muted-foreground">
					{product.statusLabel}
				</span>
			</div>
			<div className="flex flex-col gap-2">
				<span className="text-subtitle leading-subtitle font-bold text-foreground tracking-tight">
					{product.title}
				</span>
				<span className="text-sm font-medium text-muted-foreground leading-snug">
					{product.summary}
				</span>
			</div>
			<span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
				{product.ctaLabel} {product.href ? <ArrowUpRight className="size-3.5" /> : null}
			</span>
		</div>
	);

	if (!product.href) {
		return <div className="group block">{content}</div>;
	}

	return (
		<a href={product.href} target="_blank" rel="noopener noreferrer" className="group block">
			{content}
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
			<section className="grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
				<div className="flex flex-col gap-4">
					<p className="text-body leading-body font-medium uppercase tracking-wide text-muted-foreground">
						(01) PRODUCTS
					</p>
					<h1 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground tablet:text-title-2 tablet:leading-title-2 laptop:text-title-1 laptop:leading-title-1">
						Applied AI research, shipped as products.
					</h1>
					<p className="text-body leading-body font-medium text-muted-foreground laptop:text-body-lg laptop:leading-body-lg mt-2 max-w-[360px]">
						Rustbox is live. BooleanStack and Zen are coming soon.
					</p>
				</div>

				<div className="grid grid-cols-1 phone:grid-cols-2 gap-4 tablet:justify-self-end tablet:max-w-xl">
					{PRODUCT_LINES.map((product) => (
						<ProductLineCard key={product.id} product={product} />
					))}
				</div>
			</section>

			<section className="grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
				<div className="order-2 tablet:order-1 grid grid-cols-1 gap-4">
					<div className="rounded-lg border border-border bg-[#f7f7f7] p-6 shadow-sm">
						<p className="text-body-lg leading-body-lg font-bold text-foreground">
							Research partnerships
						</p>
						<p className="mt-3 text-body leading-body font-medium text-muted-foreground">
							We partner when the work has a path to a real product or research system.
						</p>
						<Link
							href={routes.contact}
							className="mt-5 inline-flex text-sm font-medium text-foreground underline underline-offset-4"
						>
							Start a partnership conversation
						</Link>
					</div>
				</div>

				<div className="order-1 tablet:order-2 flex flex-col gap-4 tablet:text-right tablet:justify-self-end">
					<p className="text-body leading-body font-medium uppercase tracking-wide text-muted-foreground">
						(02) PARTNERSHIPS
					</p>
					<h2 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground tablet:text-title-2 tablet:leading-title-2">
						Selective research, product-grade outcomes.
					</h2>
					<p className="text-body leading-body font-medium text-muted-foreground laptop:text-body-lg laptop:leading-body-lg mt-2 tablet:ml-auto max-w-[320px]">
						No open-ended consulting menu. We work on execution, learning, and interface systems.
					</p>
				</div>
			</section>

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
								const label = role.isIntern ? `${role.title} (Intern)` : role.title;
								return (
									<Link key={role.emailSubject} href={`${routes.careers}?role=${encodeURIComponent(label)}`} className="group block">
										<div className="h-40 tablet:h-48 w-44 tablet:w-52 rounded-lg border border-dashed border-border bg-[#f7f7f7] flex flex-col items-center justify-center gap-3 p-5 transition-all duration-300 hover:border-foreground/40 hover:shadow-sm">
											<span className="text-2xl">+</span>
											<span className="text-sm font-bold text-foreground tracking-tight text-center">
												{role.title}
												{role.isIntern && <><br />(Intern)</>}
											</span>
											<span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">Apply</span>
										</div>
									</Link>
								);
							})}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
